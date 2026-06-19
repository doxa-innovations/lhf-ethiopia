/* Inline seed logic — same shape as scripts/seed-from-json.ts but runs
 * under the Next.js runtime so we don't fight tsx/Node 24 ESM module
 * resolution. Returns the run log so the API caller can verify what
 * happened. */
import { getLocalPayload } from "@/lib/payload";
import en from "@/content/en.json";
import am from "@/content/am.json";
import om from "@/content/om.json";
import { PODCAST_EPISODES } from "@/lib/content";

type Locale = "en" | "am" | "om";
const LOCALIZED = { en, am, om } as const;

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

function regionCodeFor(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("sidam")) return "sidama";
  if (l.includes("tigray") || l.includes("ትግራይ")) return "tigray";
  if (l.includes("oromiy") || l.includes("oromiya") || l.includes("oromia"))
    return "oromia";
  if (l.includes("somal") || l.includes("ሶማ")) return "somali";
  if (l.includes("amhar")) return "amhara";
  if (
    l.includes("addis") ||
    l.includes("finfinnee") ||
    l.includes("አዲስ")
  )
    return "addis-ababa";
  if (l.includes("south") || l.includes("ደቡብ") || l.includes("kibba"))
    return "south";
  return "other";
}

export async function runSeed(): Promise<string[]> {
  const log: string[] = [];
  const push = (s: string) => {
    console.log(s);
    log.push(s);
  };

  const payload = await getLocalPayload();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const upsertByField = async (
    collection: any,
    field: string,
    value: string,
    data: any,
    locale: Locale = "en",
  ): Promise<string | number> => {
    const existing = await payload.find({
      collection,
      where: { [field]: { equals: value } } as any,
      limit: 1,
      locale,
    });
    if (existing.docs[0]) {
      const id = existing.docs[0].id;
      await payload.update({ collection, id, data, locale });
      return id;
    }
    const created = await payload.create({ collection, data, locale });
    return created.id;
  };
  const upsertBySlug = (
    collection: any,
    slug: string,
    data: any,
    locale: Locale = "en",
  ) => upsertByField(collection, "slug", slug, data, locale);

  push("→ Languages");
  for (let i = 0; i < en.languages.length; i++) {
    const base = en.languages[i];
    const id = await upsertByField(
      "languages",
      "code",
      base.code,
      {
        code: base.code,
        nativeName: base.native,
        titlesPublished: base.titles,
        statusCode: base.status,
        displayName: base.name,
        region: base.region,
        speakers: base.speakers,
        statusLabel: base.statusLabel,
      },
      "en",
    );
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.code}`);
  }

  push("→ Publications");
  const langDocs = await payload.find({ collection: "languages", limit: 100 });
  const langByName: Record<string, string | number> = {};
  const langByCode: Record<string, string | number> = {};
  for (const l of langDocs.docs) {
    langByName[(l as any).displayName?.toLowerCase?.() ?? ""] = l.id;
    langByCode[(l as any).code ?? ""] = l.id;
  }
  for (let i = 0; i < en.publications.length; i++) {
    const base = en.publications[i];
    const langId =
      langByName[base.language.toLowerCase()] ||
      langByCode[
        base.language.toLowerCase().startsWith("am")
          ? "am"
          : base.language.toLowerCase().startsWith("af")
            ? "om"
            : base.language.toLowerCase().startsWith("tig")
              ? "ti"
              : base.language.toLowerCase().startsWith("som")
                ? "so"
                : "am"
      ];
    const id = await upsertBySlug(
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
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ Projects");
  for (let i = 0; i < en.projects.length; i++) {
    const base = en.projects[i];
    const id = await upsertBySlug(
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
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ News");
  for (let i = 0; i < en.news.length; i++) {
    const base = en.news[i];
    const id = await upsertBySlug(
      "news",
      base.slug,
      {
        slug: base.slug,
        publishedAt: base.date,
        tag: base.tag,
        title: base.title,
        excerpt: base.excerpt,
        body: textToLexical(base.body),
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ Values");
  for (let i = 0; i < en.values.length; i++) {
    const base = en.values[i];
    const id = await upsertBySlug(
      "values",
      base.slug,
      { slug: base.slug, order: i, title: base.title, body: base.body },
      "en",
    );
    for (const loc of ["am", "om"] as const) {
      const localized = LOCALIZED[loc].values[i];
      await payload.update({
        collection: "values",
        id,
        data: { title: localized.title, body: localized.body },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ Stories");
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
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ Events");
  for (let i = 0; i < en.events.length; i++) {
    const base = en.events[i];
    const id = await upsertBySlug(
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
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ PodcastEpisodes");
  const baseBySlug: Record<string, (typeof PODCAST_EPISODES)[number]> = {};
  for (const e of PODCAST_EPISODES) baseBySlug[e.slug] = e;
  for (let i = 0; i < en.podcastEpisodes.length; i++) {
    const epLocale = en.podcastEpisodes[i];
    const base = baseBySlug[epLocale.slug];
    if (!base) {
      push(`  ⚠ no base for ${epLocale.slug}`);
      continue;
    }
    const topicKey = base.topic.replace(/\s+/g, "");
    const id = await upsertBySlug(
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
      },
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
        },
        locale: loc,
      });
    }
    push(`  ✓ ${base.slug}`);
  }

  push("→ SiteSettings");
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
        "LHF Ethiopia translates, prints, and distributes Bible-based, Christ-centered Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaamu Afoo, and Wolayttattuwaa — free of charge.",
    },
    locale: "en",
  });
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      tagline: "ወንጌል፣ በኢትዮጵያ የእያንዳንዱ ልብ ቋንቋ።",
      siteDescription:
        "LHF ኢትዮጵያ የሉተራን መጻሕፍትን በአማርኛ፣ በአፋን ኦሮሞ፣ በትግርኛ፣ በሶማልኛ፣ በሲዳምኛና በወላይትኛ ይተረጉማል፣ ያትማል፣ ያሰራጫል — ያለ ክፍያ።",
    },
    locale: "am",
  });
  await payload.updateGlobal({
    slug: "siteSettings",
    data: {
      tagline: "Wangeela, afaan onnee hunda keessatti kan Itoophiyaa.",
      siteDescription:
        "LHF Itoophiyaan kitaabota Luuteraanaa Amaariffa, Afaan Oromoo, Tigriiffa, Soomaaliffaa, Sidaamu Afoo fi Wolayttatuwaan hiikna, maxxansina, raabsina — tola.",
    },
    locale: "om",
  });
  push("  ✓ siteSettings");

  push("✓ Seed complete.");
  return log;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
