/**
 * One-time seed script: takes the per-locale JSON files in src/content/
 * plus the stable base data in src/lib/content.ts and populates the
 * Payload collections via the Local API.
 *
 * Usage:
 *   npm run seed
 *
 * Idempotent on slug — if a doc with the same slug already exists, the
 * script updates it in place across all locales rather than duplicating.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import en from "../src/content/en.json" with { type: "json" };
import am from "../src/content/am.json" with { type: "json" };
import om from "../src/content/om.json" with { type: "json" };
import { PODCAST_EPISODES } from "../src/lib/content";
import type { Payload } from "payload";

type Locale = "en" | "am" | "om";
const LOCALES: Locale[] = ["en", "am", "om"];
const LOCALIZED = { en, am, om } as const;

/** Convert a plain text body (paragraph-separated by \n\n) into a minimal
 *  Lexical JSON document the lexicalEditor() can render. */
function textToLexical(text: string) {
  const paragraphs = (text || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs.map((p) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            format: 0,
            text: p,
            style: "",
            mode: "normal",
            detail: 0,
            version: 1,
          },
        ],
      })),
    },
  };
}

async function upsertBySlug<T extends { slug: string }>(
  payload: Payload,
  collection: string,
  slug: string,
  data: T,
  locale: Locale = "en",
): Promise<string | number> {
  const existing = await payload.find({
    collection: collection as Parameters<Payload["find"]>[0]["collection"],
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  });

  if (existing.docs[0]) {
    const id = existing.docs[0].id;
    await payload.update({
      collection: collection as Parameters<Payload["update"]>[0]["collection"],
      id,
      data: data as never,
      locale,
    });
    return id;
  }

  const created = await payload.create({
    collection: collection as Parameters<Payload["create"]>[0]["collection"],
    data: data as never,
    locale,
  });
  return created.id;
}

/* Region label → enum code mapping for Projects. */
function regionCodeFor(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("sidam")) return "sidama";
  if (l.includes("tigray") || l.includes("ትግራይ")) return "tigray";
  if (l.includes("oromiy") || l.includes("oromiya") || l.includes("oromia")) return "oromia";
  if (l.includes("somal") || l.includes("ሶማ")) return "somali";
  if (l.includes("amhar")) return "amhara";
  if (l.includes("addis") || l.includes("finfinnee") || l.includes("አዲስ")) return "addis-ababa";
  if (l.includes("south") || l.includes("ደቡብ") || l.includes("kibba")) return "south";
  return "other";
}

async function seedLanguages(payload: Payload) {
  console.log("\n→ Seeding Languages");
  for (let i = 0; i < en.languages.length; i++) {
    const base = en.languages[i];
    const data = {
      code: base.code,
      nativeName: base.native,
      titlesPublished: base.titles,
      statusCode: base.status,
      displayName: base.name,
      region: base.region,
      speakers: base.speakers,
      statusLabel: base.statusLabel,
      slug: base.code,
    };
    // First create in en with all stable + en localized.
    const id = await upsertBySlug(payload, "languages", base.code, data, "en");
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].languages[i];
      await payload.update({
        collection: "languages",
        id,
        data: {
          displayName: localized.name,
          region: localized.region,
          speakers: localized.speakers,
          statusLabel: localized.statusLabel,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.code}`);
  }
}

async function seedPublications(payload: Payload) {
  console.log("\n→ Seeding Publications");
  // Resolve languageCode relation by language code derived from nativeTitle.
  const langDocs = await payload.find({ collection: "languages", limit: 100 });
  const langByName: Record<string, string | number> = {};
  for (const l of langDocs.docs) {
    langByName[(l as { displayName?: string }).displayName?.toLowerCase() ?? ""] = l.id;
  }
  // Also map by code for fallback.
  const langByCode: Record<string, string | number> = {};
  for (const l of langDocs.docs) langByCode[(l as { code?: string }).code ?? ""] = l.id;

  for (let i = 0; i < en.publications.length; i++) {
    const base = en.publications[i];
    // Match language by English display name → fall back to code by language string.
    const langId =
      langByName[base.language.toLowerCase()] ||
      langByCode[
        base.language.toLowerCase().startsWith("am") ? "am"
        : base.language.toLowerCase().startsWith("af") ? "om"
        : base.language.toLowerCase().startsWith("tig") ? "ti"
        : base.language.toLowerCase().startsWith("som") ? "so"
        : "am"
      ];

    const id = await upsertBySlug(
      payload,
      "publications",
      base.slug,
      {
        slug: base.slug,
        languageCode: langId,
        pages: base.pages,
        nativeTitle: base.native,
        printStatus: base.status,
        title: base.title,
        language: base.language,
        audience: base.audience,
        statusLabel: base.statusLabel,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].publications[i];
      await payload.update({
        collection: "publications",
        id,
        data: {
          title: localized.title,
          language: localized.language,
          audience: localized.audience,
          statusLabel: localized.statusLabel,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedProjects(payload: Payload) {
  console.log("\n→ Seeding Projects");
  for (let i = 0; i < en.projects.length; i++) {
    const base = en.projects[i];
    const id = await upsertBySlug(
      payload,
      "projects",
      base.slug,
      {
        slug: base.slug,
        regionCode: regionCodeFor(base.region),
        raised: base.raised,
        goal: base.goal,
        title: base.title,
        regionDisplay: base.region,
        need: base.need,
        impact: base.impact,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].projects[i];
      await payload.update({
        collection: "projects",
        id,
        data: {
          title: localized.title,
          regionDisplay: localized.region,
          need: localized.need,
          impact: localized.impact,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedNews(payload: Payload) {
  console.log("\n→ Seeding News");
  for (let i = 0; i < en.news.length; i++) {
    const base = en.news[i];
    const id = await upsertBySlug(
      payload,
      "news",
      base.slug,
      {
        slug: base.slug,
        publishedAt: base.date,
        tag: base.tag,
        title: base.title,
        excerpt: base.excerpt,
        body: textToLexical(base.body),
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].news[i];
      await payload.update({
        collection: "news",
        id,
        data: {
          title: localized.title,
          excerpt: localized.excerpt,
          body: textToLexical(localized.body),
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedValues(payload: Payload) {
  console.log("\n→ Seeding Values");
  for (let i = 0; i < en.values.length; i++) {
    const base = en.values[i];
    const id = await upsertBySlug(
      payload,
      "values",
      base.slug,
      {
        slug: base.slug,
        order: i,
        title: base.title,
        body: base.body,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].values[i];
      await payload.update({
        collection: "values",
        id,
        data: { title: localized.title, body: localized.body } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedStories(payload: Payload) {
  console.log("\n→ Seeding Stories");
  for (let i = 0; i < en.stories.length; i++) {
    const base = en.stories[i];
    const langCodeMap: Record<string, string> = {
      Amharic: "am",
      "Afaan Oromoo": "om",
      Tigrinya: "ti",
      Somali: "so",
      "Sidaamu Afoo": "sid",
      Wolayttattuwaa: "wal",
      Multilingual: "multi",
    };
    const id = await upsertBySlug(
      payload,
      "stories",
      base.slug,
      {
        slug: base.slug,
        languageCode: langCodeMap[base.language] || "multi",
        name: base.name,
        role: base.role,
        congregation: base.congregation,
        quote: base.quote,
        languageDisplay: base.language,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].stories[i];
      await payload.update({
        collection: "stories",
        id,
        data: {
          name: localized.name,
          role: localized.role,
          congregation: localized.congregation,
          quote: localized.quote,
          languageDisplay: localized.language,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedEvents(payload: Payload) {
  console.log("\n→ Seeding Events");
  for (let i = 0; i < en.events.length; i++) {
    const base = en.events[i];
    const id = await upsertBySlug(
      payload,
      "events",
      base.slug,
      {
        slug: base.slug,
        date: base.date,
        eventPhase: base.status,
        title: base.title,
        location: base.location,
        audience: base.audience,
        summary: base.summary,
        statusLabel: base.statusLabel,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].events[i];
      await payload.update({
        collection: "events",
        id,
        data: {
          title: localized.title,
          location: localized.location,
          audience: localized.audience,
          summary: localized.summary,
          statusLabel: localized.statusLabel,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedPodcastEpisodes(payload: Payload) {
  console.log("\n→ Seeding Podcast Episodes");
  const baseBySlug: Record<string, (typeof PODCAST_EPISODES)[number]> = {};
  for (const e of PODCAST_EPISODES) baseBySlug[e.slug] = e;

  for (let i = 0; i < en.podcastEpisodes.length; i++) {
    const epLocale = en.podcastEpisodes[i];
    const base = baseBySlug[epLocale.slug];
    if (!base) {
      console.log(`  ⚠ no base data for ${epLocale.slug}, skipping`);
      continue;
    }
    const topicKey = base.topic.replace(/\s+/g, ""); // "Bible Study" → "BibleStudy"
    const id = await upsertBySlug(
      payload,
      "podcastEpisodes",
      base.slug,
      {
        slug: base.slug,
        number: base.number,
        youtubeId: base.youtubeId,
        date: base.date,
        durationMin: base.durationMin,
        topicKey,
        title: epLocale.title,
        summary: epLocale.summary,
        languageDisplay: epLocale.language,
      } as never,
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].podcastEpisodes[i];
      await payload.update({
        collection: "podcastEpisodes",
        id,
        data: {
          title: localized.title,
          summary: localized.summary,
          languageDisplay: localized.language,
        } as never,
        locale: loc,
      });
    }
    console.log(`  ✓ ${base.slug}`);
  }
}

async function seedSiteSettings(payload: Payload) {
  console.log("\n→ Seeding SiteSettings global");
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      email: "Info@lhfethiopia.org",
      phone: "+251 911 000 000",
      address: "Bole Sub-City, Addis Ababa, Ethiopia",
      social: {
        facebook: "https://facebook.com/lhfmissions",
        instagram: "https://instagram.com/lhfbooks",
        youtube: "https://youtube.com/@scripturealonepodcast6447",
      },
      featuredYoutubeId: "znymBLaMsYY",
      tagline: "The Gospel, in every heart language of Ethiopia.",
      siteDescription:
        "LHF Ethiopia translates, prints, and distributes Bible-based, Christ-centered Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaamu Afoo, and Wolayttattuwaa — free of charge — and reaches new audiences through podcasting, events, and digital outreach.",
    } as never,
    locale: "en",
  });
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      tagline: "ወንጌል፣ በኢትዮጵያ የእያንዳንዱ ልብ ቋንቋ።",
      siteDescription:
        "LHF ኢትዮጵያ በመጽሐፍ ቅዱስ ላይ የተመሰረቱ የሉተራን መጻሕፍትን በአማርኛ፣ በአፋን ኦሮሞ፣ በትግርኛ፣ በሶማልኛ፣ በሲዳምኛና በወላይትኛ ይተረጉማል፣ ያትማል፣ ያሰራጫል — ያለ ክፍያ — እንዲሁም ፖድካስት፣ ዝግጅቶችና የዲጂታል ሥርጭት ይሰራል።",
    } as never,
    locale: "am",
  });
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      tagline: "Wangeela, afaan onnee hunda keessatti kan Itoophiyaa.",
      siteDescription:
        "LHF Itoophiyaan kitaabota Luuteraanaa Macaafa Qulqulluu irratti hundaa'an Amaariffa, Afaan Oromoo, Tigriiffa, Soomaaliffa, Sidaamu Afoo fi Wolayttatuwaan hiikna, maxxansina, raabsina — tola — akkasumas podkaastii, sagantaa fi tamsaasa dijitaalaatiin gahuummaa haaraa argachuu.",
    } as never,
    locale: "om",
  });
  console.log("  ✓ siteSettings");
}

async function main() {
  console.log("Connecting to Payload…");
  const payload = await getPayload({ config });

  // Order matters: languages first (publications relate to them).
  await seedLanguages(payload);
  await seedPublications(payload);
  await seedProjects(payload);
  await seedNews(payload);
  await seedValues(payload);
  await seedStories(payload);
  await seedEvents(payload);
  await seedPodcastEpisodes(payload);
  await seedSiteSettings(payload);

  console.log("\n✓ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n✗ Seed failed:");
  console.error(err);
  process.exit(1);
});
