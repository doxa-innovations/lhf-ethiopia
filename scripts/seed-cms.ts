/**
 * One-time seed: takes the existing JSON content + dictionary.ts + the
 * stable PODCAST_EPISODES base from src/lib/content.ts and writes them
 * into the new Drizzle/PGlite schema.
 *
 * Idempotent: re-runs replace existing rows by slug (or by element_id +
 * locale) rather than duplicating.
 *
 * Usage:
 *   npm run seed
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq, and } from "drizzle-orm";
import { db, schema } from "../src/lib/db";
import en from "../src/content/en.json" with { type: "json" };
import am from "../src/content/am.json" with { type: "json" };
import om from "../src/content/om.json" with { type: "json" };
import { PODCAST_EPISODES, SITE } from "../src/lib/content";
import { dictionary } from "../src/lib/i18n/dictionary";

type Locale = "en" | "am" | "om";
const LOCALES: Locale[] = ["en", "am", "om"];
const LOCALIZED = { en, am, om } as const;

async function seedUsers() {
  console.log("\n→ Users");
  const adminEmail = "admin@lhfethiopia.org";
  const adminPassword = "ChangeMe!2026";
  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, adminEmail))
    .limit(1);
  if (existing[0]) {
    console.log("  · admin already exists, skipping");
    return;
  }
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await db.insert(schema.users).values({
    email: adminEmail,
    passwordHash,
    name: "LHF Admin",
    role: "admin",
  });
  console.log(`  ✓ admin user created: ${adminEmail}  /  ${adminPassword}`);
  console.log(`  ⚠ change this password on first login`);
}

async function seedLanguages() {
  console.log("\n→ Languages");
  for (let i = 0; i < en.languages.length; i++) {
    const base = en.languages[i];
    const existing = await db
      .select()
      .from(schema.languages)
      .where(eq(schema.languages.code, base.code))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.languages)
        .set({
          nativeName: base.native,
          titlesPublished: base.titles,
          statusCode: base.status,
          sortOrder: i,
          isPublished: 1,
        })
        .where(eq(schema.languages.id, id));
    } else {
      const r = await db
        .insert(schema.languages)
        .values({
          code: base.code,
          nativeName: base.native,
          titlesPublished: base.titles,
          statusCode: base.status,
          sortOrder: i,
          isPublished: 1,
        })
        .returning({ id: schema.languages.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].languages[i];
      await db
        .delete(schema.languagesTranslations)
        .where(
          and(
            eq(schema.languagesTranslations.languageId, id),
            eq(schema.languagesTranslations.locale, loc),
          ),
        );
      await db.insert(schema.languagesTranslations).values({
        languageId: id,
        locale: loc,
        displayName: l.name,
        region: l.region,
        speakers: l.speakers,
        statusLabel: l.statusLabel,
      });
    }
    console.log(`  ✓ ${base.code}`);
  }
}

async function seedNews() {
  console.log("\n→ News");
  for (let i = 0; i < en.news.length; i++) {
    const base = en.news[i];
    const existing = await db
      .select()
      .from(schema.news)
      .where(eq(schema.news.slug, base.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.news)
        .set({
          publishedAt: base.date,
          tag: base.tag,
          imageUrl: base.image,
          isPublished: 1,
        })
        .where(eq(schema.news.id, id));
    } else {
      const r = await db
        .insert(schema.news)
        .values({
          slug: base.slug,
          publishedAt: base.date,
          tag: base.tag,
          imageUrl: base.image,
          isPublished: 1,
        })
        .returning({ id: schema.news.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].news[i];
      await db
        .delete(schema.newsTranslations)
        .where(
          and(
            eq(schema.newsTranslations.newsId, id),
            eq(schema.newsTranslations.locale, loc),
          ),
        );
      await db.insert(schema.newsTranslations).values({
        newsId: id,
        locale: loc,
        title: l.title,
        excerpt: l.excerpt,
        body: l.body,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedProjects() {
  console.log("\n→ Projects");
  const regionCodeFor = (label: string): string => {
    const l = label.toLowerCase();
    if (l.includes("sidam")) return "sidama";
    if (l.includes("tigray") || l.includes("ትግራይ")) return "tigray";
    if (l.includes("oromia") || l.includes("oromiy")) return "oromia";
    if (l.includes("somal")) return "somali";
    if (l.includes("addis") || l.includes("finfinnee")) return "addis-ababa";
    return "other";
  };
  for (let i = 0; i < en.projects.length; i++) {
    const base = en.projects[i];
    const existing = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.slug, base.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.projects)
        .set({
          regionCode: regionCodeFor(base.region),
          raised: base.raised,
          goal: base.goal,
          isPublished: 1,
        })
        .where(eq(schema.projects.id, id));
    } else {
      const r = await db
        .insert(schema.projects)
        .values({
          slug: base.slug,
          regionCode: regionCodeFor(base.region),
          raised: base.raised,
          goal: base.goal,
          isPublished: 1,
        })
        .returning({ id: schema.projects.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].projects[i];
      await db
        .delete(schema.projectsTranslations)
        .where(
          and(
            eq(schema.projectsTranslations.projectId, id),
            eq(schema.projectsTranslations.locale, loc),
          ),
        );
      await db.insert(schema.projectsTranslations).values({
        projectId: id,
        locale: loc,
        title: l.title,
        regionDisplay: l.region,
        need: l.need,
        impact: l.impact,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedEvents() {
  console.log("\n→ Events");
  for (let i = 0; i < en.events.length; i++) {
    const base = en.events[i];
    const existing = await db
      .select()
      .from(schema.events)
      .where(eq(schema.events.slug, base.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.events)
        .set({ date: base.date, eventPhase: base.status, isPublished: 1 })
        .where(eq(schema.events.id, id));
    } else {
      const r = await db
        .insert(schema.events)
        .values({
          slug: base.slug,
          date: base.date,
          eventPhase: base.status,
          isPublished: 1,
        })
        .returning({ id: schema.events.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].events[i];
      await db
        .delete(schema.eventsTranslations)
        .where(
          and(
            eq(schema.eventsTranslations.eventId, id),
            eq(schema.eventsTranslations.locale, loc),
          ),
        );
      await db.insert(schema.eventsTranslations).values({
        eventId: id,
        locale: loc,
        title: l.title,
        location: l.location,
        audience: l.audience,
        summary: l.summary,
        statusLabel: l.statusLabel,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedPublications() {
  console.log("\n→ Publications");
  for (let i = 0; i < en.publications.length; i++) {
    const base = en.publications[i];
    const existing = await db
      .select()
      .from(schema.publications)
      .where(eq(schema.publications.slug, base.slug))
      .limit(1);
    let id: number;
    // Best-effort language code mapping (use 'multi' if unknown)
    const langCode =
      base.language === "Amharic"
        ? "am"
        : base.language === "Afaan Oromoo"
          ? "om"
          : base.language === "Tigrinya"
            ? "ti"
            : base.language === "Somali"
              ? "so"
              : "multi";
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.publications)
        .set({
          pages: base.pages,
          nativeTitle: base.native,
          printStatus: base.status,
          languageCode: langCode,
          isPublished: 1,
        })
        .where(eq(schema.publications.id, id));
    } else {
      const r = await db
        .insert(schema.publications)
        .values({
          slug: base.slug,
          pages: base.pages,
          nativeTitle: base.native,
          printStatus: base.status,
          languageCode: langCode,
          isPublished: 1,
        })
        .returning({ id: schema.publications.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].publications[i];
      await db
        .delete(schema.publicationsTranslations)
        .where(
          and(
            eq(schema.publicationsTranslations.publicationId, id),
            eq(schema.publicationsTranslations.locale, loc),
          ),
        );
      await db.insert(schema.publicationsTranslations).values({
        publicationId: id,
        locale: loc,
        title: l.title,
        language: l.language,
        audience: l.audience,
        statusLabel: l.statusLabel,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedValues() {
  console.log("\n→ Values");
  for (let i = 0; i < en.values.length; i++) {
    const base = en.values[i];
    const existing = await db
      .select()
      .from(schema.values)
      .where(eq(schema.values.slug, base.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.values)
        .set({ sortOrder: i, isPublished: 1 })
        .where(eq(schema.values.id, id));
    } else {
      const r = await db
        .insert(schema.values)
        .values({ slug: base.slug, sortOrder: i, isPublished: 1 })
        .returning({ id: schema.values.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].values[i];
      await db
        .delete(schema.valuesTranslations)
        .where(
          and(
            eq(schema.valuesTranslations.valueId, id),
            eq(schema.valuesTranslations.locale, loc),
          ),
        );
      await db.insert(schema.valuesTranslations).values({
        valueId: id,
        locale: loc,
        title: l.title,
        body: l.body,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedStories() {
  console.log("\n→ Stories");
  const langCodeMap: Record<string, string> = {
    Amharic: "am",
    "Afaan Oromoo": "om",
    Tigrinya: "ti",
    Somali: "so",
    "Sidaamu Afoo": "sid",
    Wolayttattuwaa: "wal",
    Multilingual: "multi",
  };
  for (let i = 0; i < en.stories.length; i++) {
    const base = en.stories[i];
    const existing = await db
      .select()
      .from(schema.stories)
      .where(eq(schema.stories.slug, base.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.stories)
        .set({
          languageCode: langCodeMap[base.language] || "multi",
          isPublished: 1,
        })
        .where(eq(schema.stories.id, id));
    } else {
      const r = await db
        .insert(schema.stories)
        .values({
          slug: base.slug,
          languageCode: langCodeMap[base.language] || "multi",
          isPublished: 1,
        })
        .returning({ id: schema.stories.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].stories[i];
      await db
        .delete(schema.storiesTranslations)
        .where(
          and(
            eq(schema.storiesTranslations.storyId, id),
            eq(schema.storiesTranslations.locale, loc),
          ),
        );
      await db.insert(schema.storiesTranslations).values({
        storyId: id,
        locale: loc,
        name: l.name,
        role: l.role,
        congregation: l.congregation,
        quote: l.quote,
        languageDisplay: l.language,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedPodcastEpisodes() {
  console.log("\n→ Podcast episodes");
  const baseBySlug: Record<string, (typeof PODCAST_EPISODES)[number]> = {};
  for (const e of PODCAST_EPISODES) baseBySlug[e.slug] = e;
  for (let i = 0; i < en.podcastEpisodes.length; i++) {
    const enRow = en.podcastEpisodes[i];
    const base = baseBySlug[enRow.slug];
    if (!base) {
      console.log(`  ⚠ no base for ${enRow.slug}`);
      continue;
    }
    const topicKey = base.topic.replace(/\s+/g, "");
    const existing = await db
      .select()
      .from(schema.podcastEpisodes)
      .where(eq(schema.podcastEpisodes.slug, enRow.slug))
      .limit(1);
    let id: number;
    if (existing[0]) {
      id = existing[0].id;
      await db
        .update(schema.podcastEpisodes)
        .set({
          number: base.number,
          youtubeId: base.youtubeId,
          date: base.date,
          durationMin: base.durationMin,
          topicKey,
          isPublished: 1,
        })
        .where(eq(schema.podcastEpisodes.id, id));
    } else {
      const r = await db
        .insert(schema.podcastEpisodes)
        .values({
          slug: enRow.slug,
          number: base.number,
          youtubeId: base.youtubeId,
          date: base.date,
          durationMin: base.durationMin,
          topicKey,
          isPublished: 1,
        })
        .returning({ id: schema.podcastEpisodes.id });
      id = r[0].id;
    }
    for (const loc of LOCALES) {
      const l = LOCALIZED[loc].podcastEpisodes[i];
      await db
        .delete(schema.podcastEpisodesTranslations)
        .where(
          and(
            eq(schema.podcastEpisodesTranslations.episodeId, id),
            eq(schema.podcastEpisodesTranslations.locale, loc),
          ),
        );
      await db.insert(schema.podcastEpisodesTranslations).values({
        episodeId: id,
        locale: loc,
        title: l.title,
        summary: l.summary,
        languageDisplay: l.language,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedDictionary() {
  console.log("\n→ Dictionary → cms_elements (page microcopy)");
  let count = 0;
  for (const loc of LOCALES) {
    const dict = (dictionary as unknown as Record<Locale, Record<string, Record<string, string>>>)[loc];
    if (!dict) continue;
    for (const [pageName, entries] of Object.entries(dict)) {
      for (const [key, value] of Object.entries(entries)) {
        const elementId = `${pageName}.${key}`;
        await db
          .delete(schema.cmsElements)
          .where(
            and(
              eq(schema.cmsElements.elementId, elementId),
              eq(schema.cmsElements.locale, loc),
              eq(schema.cmsElements.isPublished, 1),
            ),
          );
        await db.insert(schema.cmsElements).values({
          elementId,
          locale: loc,
          pageName,
          content: String(value),
          isPublished: 1,
        });
        count++;
      }
    }
  }
  console.log(`  ✓ ${count} elements seeded`);
}

async function seedSiteSettings() {
  console.log("\n→ Site settings");
  const existing = await db.select().from(schema.siteSettings).limit(1);
  let id: number;
  if (existing[0]) {
    id = existing[0].id;
    await db
      .update(schema.siteSettings)
      .set({
        email: SITE.email,
        phone: SITE.phone,
        address: SITE.address,
        socialFacebook: SITE.social.facebook,
        socialInstagram: SITE.social.instagram,
        socialYoutube: SITE.social.youtube,
        socialSpotify: SITE.social.spotify,
        socialApplePodcasts: SITE.social.applePodcasts,
        featuredYoutubeId: "znymBLaMsYY",
      })
      .where(eq(schema.siteSettings.id, id));
  } else {
    const r = await db
      .insert(schema.siteSettings)
      .values({
        email: SITE.email,
        phone: SITE.phone,
        address: SITE.address,
        socialFacebook: SITE.social.facebook,
        socialInstagram: SITE.social.instagram,
        socialYoutube: SITE.social.youtube,
        socialSpotify: SITE.social.spotify,
        socialApplePodcasts: SITE.social.applePodcasts,
        featuredYoutubeId: "znymBLaMsYY",
      })
      .returning({ id: schema.siteSettings.id });
    id = r[0].id;
  }
  const TRANSLATIONS = {
    en: {
      tagline: "The Gospel, in every heart language of Ethiopia.",
      siteDescription: SITE.description,
    },
    am: {
      tagline: "ወንጌል፣ በኢትዮጵያ የእያንዳንዱ ልብ ቋንቋ።",
      siteDescription: SITE.description,
    },
    om: {
      tagline: "Wangeela, afaan onnee hunda keessatti kan Itoophiyaa.",
      siteDescription: SITE.description,
    },
  } as const;
  for (const loc of LOCALES) {
    await db
      .delete(schema.siteSettingsTranslations)
      .where(
        and(
          eq(schema.siteSettingsTranslations.siteSettingsId, id),
          eq(schema.siteSettingsTranslations.locale, loc),
        ),
      );
    await db.insert(schema.siteSettingsTranslations).values({
      siteSettingsId: id,
      locale: loc,
      tagline: TRANSLATIONS[loc].tagline,
      siteDescription: TRANSLATIONS[loc].siteDescription,
    });
  }
  console.log("  ✓ siteSettings");
}

async function main() {
  await seedUsers();
  await seedLanguages();
  await seedPublications();
  await seedProjects();
  await seedEvents();
  await seedNews();
  await seedValues();
  await seedStories();
  await seedPodcastEpisodes();
  await seedDictionary();
  await seedSiteSettings();
  console.log("\n✓ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
