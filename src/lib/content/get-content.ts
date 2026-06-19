import "server-only";
import { getLocalPayload } from "@/lib/payload";
import type { Locale } from "@/lib/i18n/dictionary";
import type { LocalizedContent } from "@/lib/i18n/content-types";

/* -------------------------------------------------------------------- */
/* Payload doc → public LocalizedContent shape adapters.                */
/* Keeps the same field names the existing PageClients expect so we     */
/* don't need to touch every consumer when the data source moves from   */
/* JSON imports to Payload.                                             */
/* -------------------------------------------------------------------- */

/** Lexical rich text → paragraph-separated plain text (existing news consumers). */
function lexicalToText(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  const root = (value as { root?: { children?: unknown[] } }).root;
  if (!root?.children) return "";
  const out: string[] = [];
  for (const node of root.children as Array<{
    type?: string;
    children?: Array<{ text?: string }>;
  }>) {
    if (node.type === "paragraph") {
      const text = (node.children ?? [])
        .map((c) => c.text ?? "")
        .join("");
      if (text.trim()) out.push(text);
    }
  }
  return out.join("\n\n");
}

type MediaDoc = { url?: string; alt?: string } | string | number | null | undefined;
function mediaUrl(rel: MediaDoc): string {
  if (!rel) return "";
  if (typeof rel === "string") return rel;
  if (typeof rel === "number") return "";
  return rel.url ?? "";
}

async function fetchLocale(locale: Locale): Promise<LocalizedContent> {
  const payload = await getLocalPayload();

  const [
    languages,
    publications,
    projects,
    news,
    values,
    stories,
    events,
    podcastEpisodes,
  ] = await Promise.all([
    payload.find({ collection: "languages", locale, limit: 100, depth: 1 }),
    payload.find({ collection: "publications", locale, limit: 200, depth: 1 }),
    payload.find({ collection: "projects", locale, limit: 100, depth: 1 }),
    payload.find({ collection: "news", locale, limit: 100, sort: "-publishedAt" }),
    payload.find({ collection: "values", locale, limit: 100, sort: "order" }),
    payload.find({ collection: "stories", locale, limit: 100, depth: 1 }),
    payload.find({ collection: "events", locale, limit: 100, sort: "date" }),
    payload.find({ collection: "podcastEpisodes", locale, limit: 100, sort: "-date" }),
  ]);

  return {
    languages: languages.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        code: String(x.code ?? ""),
        name: String(x.displayName ?? ""),
        native: String(x.nativeName ?? ""),
        region: String(x.region ?? ""),
        speakers: String(x.speakers ?? ""),
        status: String(x.statusCode ?? "Published"),
        statusLabel: String(x.statusLabel ?? ""),
        titles: Number(x.titlesPublished ?? 0),
      };
    }),
    publications: publications.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        title: String(x.title ?? ""),
        language: String(x.language ?? ""),
        native: String(x.nativeTitle ?? ""),
        audience: String(x.audience ?? ""),
        pages: Number(x.pages ?? 0),
        status: String(x.printStatus ?? "In print"),
        statusLabel: String(x.statusLabel ?? ""),
      };
    }),
    projects: projects.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        title: String(x.title ?? ""),
        region: String(x.regionDisplay ?? ""),
        need: String(x.need ?? ""),
        raised: Number(x.raised ?? 0),
        goal: Number(x.goal ?? 1),
        impact: String(x.impact ?? ""),
      };
    }),
    news: news.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        date: String(x.publishedAt ?? "").slice(0, 10),
        title: String(x.title ?? ""),
        excerpt: String(x.excerpt ?? ""),
        tag: String(x.tag ?? ""),
        image: mediaUrl(x.image as MediaDoc),
        body: lexicalToText(x.body),
      };
    }),
    values: values.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        title: String(x.title ?? ""),
        body: String(x.body ?? ""),
      };
    }),
    stories: stories.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        name: String(x.name ?? ""),
        role: String(x.role ?? ""),
        congregation: String(x.congregation ?? ""),
        language: String(x.languageDisplay ?? ""),
        quote: String(x.quote ?? ""),
      };
    }),
    events: events.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        title: String(x.title ?? ""),
        date: String(x.date ?? "").slice(0, 10),
        location: String(x.location ?? ""),
        audience: String(x.audience ?? ""),
        summary: String(x.summary ?? ""),
        status: String(x.eventPhase ?? "Upcoming"),
        statusLabel: String(x.statusLabel ?? ""),
      };
    }),
    podcastEpisodes: podcastEpisodes.docs.map((d) => {
      const x = d as unknown as Record<string, unknown>;
      return {
        slug: String(x.slug ?? ""),
        title: String(x.title ?? ""),
        summary: String(x.summary ?? ""),
        language: String(x.languageDisplay ?? ""),
      };
    }),
    impactSeriesNames: ["Amharic", "Afaan Oromoo", "Tigrinya", "Other heart languages"],
    titlesPerLanguage: [],
  };
}

/** Fetch the body content for one locale. */
export async function getContent(locale: Locale): Promise<LocalizedContent> {
  return fetchLocale(locale);
}

/** Fetch all three locales in parallel — used by the root layout so the
 *  client-side ContentProvider can serve every PageClient without a
 *  per-route round-trip. */
export async function getAllLocalesContent(): Promise<
  Record<Locale, LocalizedContent>
> {
  const [en, am, om] = await Promise.all([
    fetchLocale("en"),
    fetchLocale("am"),
    fetchLocale("om"),
  ]);
  return { en, am, om };
}

export type ServerContent = LocalizedContent;
