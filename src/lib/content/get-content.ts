import "server-only";
import { getLocalPayload } from "@/lib/payload";
import type { Locale } from "@/lib/i18n/dictionary";

/**
 * Fetches the full body-content payload for a given locale, mirroring the
 * shape of the previous `useContent()` client hook (which read from
 * src/content/<locale>.json). This runs at build time inside Server
 * Components; results are cached by Next.js's data cache + revalidated by
 * the per-collection afterChange hooks.
 */
export async function getContent(locale: Locale) {
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
    payload.find({
      collection: "news",
      locale,
      limit: 100,
      depth: 1,
      sort: "-publishedAt",
    }),
    payload.find({ collection: "values", locale, limit: 100, sort: "order" }),
    payload.find({ collection: "stories", locale, limit: 100, depth: 1 }),
    payload.find({ collection: "events", locale, limit: 100, sort: "date" }),
    payload.find({
      collection: "podcastEpisodes",
      locale,
      limit: 100,
      sort: "-date",
    }),
  ]);

  return {
    languages: languages.docs,
    publications: publications.docs,
    projects: projects.docs,
    news: news.docs,
    values: values.docs,
    stories: stories.docs,
    events: events.docs,
    podcastEpisodes: podcastEpisodes.docs,
  };
}

export type ServerContent = Awaited<ReturnType<typeof getContent>>;
