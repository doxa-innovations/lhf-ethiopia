import "server-only";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Locale } from "@/lib/i18n/dictionary";
import type { LocalizedContent } from "@/lib/i18n/content-types";

/* -------------------------------------------------------------------- */
/* Drizzle row → public LocalizedContent shape adapters.                */
/* Each collection joins entity ⨯ entity_translations on the requested  */
/* locale; rows without a matching translation fall back to the English */
/* translation so the page never silently drops a card.                 */
/* -------------------------------------------------------------------- */

async function fetchLocale(locale: Locale): Promise<LocalizedContent> {
  const [
    langRows,
    pubRows,
    projRows,
    newsRows,
    valueRows,
    storyRows,
    eventRows,
    episodeRows,
  ] = await Promise.all([
    db
      .select({
        code: schema.languages.code,
        nativeName: schema.languages.nativeName,
        titlesPublished: schema.languages.titlesPublished,
        statusCode: schema.languages.statusCode,
        sortOrder: schema.languages.sortOrder,
        displayName: schema.languagesTranslations.displayName,
        region: schema.languagesTranslations.region,
        speakers: schema.languagesTranslations.speakers,
        statusLabel: schema.languagesTranslations.statusLabel,
      })
      .from(schema.languages)
      .leftJoin(
        schema.languagesTranslations,
        and(
          eq(schema.languagesTranslations.languageId, schema.languages.id),
          eq(schema.languagesTranslations.locale, locale),
        ),
      )
      .where(eq(schema.languages.isPublished, 1)),
    db
      .select({
        slug: schema.publications.slug,
        nativeTitle: schema.publications.nativeTitle,
        pages: schema.publications.pages,
        printStatus: schema.publications.printStatus,
        title: schema.publicationsTranslations.title,
        language: schema.publicationsTranslations.language,
        audience: schema.publicationsTranslations.audience,
        statusLabel: schema.publicationsTranslations.statusLabel,
      })
      .from(schema.publications)
      .leftJoin(
        schema.publicationsTranslations,
        and(
          eq(schema.publicationsTranslations.publicationId, schema.publications.id),
          eq(schema.publicationsTranslations.locale, locale),
        ),
      )
      .where(eq(schema.publications.isPublished, 1)),
    db
      .select({
        slug: schema.projects.slug,
        raised: schema.projects.raised,
        goal: schema.projects.goal,
        title: schema.projectsTranslations.title,
        regionDisplay: schema.projectsTranslations.regionDisplay,
        need: schema.projectsTranslations.need,
        impact: schema.projectsTranslations.impact,
      })
      .from(schema.projects)
      .leftJoin(
        schema.projectsTranslations,
        and(
          eq(schema.projectsTranslations.projectId, schema.projects.id),
          eq(schema.projectsTranslations.locale, locale),
        ),
      )
      .where(eq(schema.projects.isPublished, 1)),
    db
      .select({
        slug: schema.news.slug,
        publishedAt: schema.news.publishedAt,
        tag: schema.news.tag,
        imageUrl: schema.news.imageUrl,
        title: schema.newsTranslations.title,
        excerpt: schema.newsTranslations.excerpt,
        body: schema.newsTranslations.body,
      })
      .from(schema.news)
      .leftJoin(
        schema.newsTranslations,
        and(
          eq(schema.newsTranslations.newsId, schema.news.id),
          eq(schema.newsTranslations.locale, locale),
        ),
      )
      .where(eq(schema.news.isPublished, 1)),
    db
      .select({
        slug: schema.values.slug,
        sortOrder: schema.values.sortOrder,
        title: schema.valuesTranslations.title,
        body: schema.valuesTranslations.body,
      })
      .from(schema.values)
      .leftJoin(
        schema.valuesTranslations,
        and(
          eq(schema.valuesTranslations.valueId, schema.values.id),
          eq(schema.valuesTranslations.locale, locale),
        ),
      )
      .where(eq(schema.values.isPublished, 1)),
    db
      .select({
        slug: schema.stories.slug,
        name: schema.storiesTranslations.name,
        role: schema.storiesTranslations.role,
        congregation: schema.storiesTranslations.congregation,
        quote: schema.storiesTranslations.quote,
        languageDisplay: schema.storiesTranslations.languageDisplay,
      })
      .from(schema.stories)
      .leftJoin(
        schema.storiesTranslations,
        and(
          eq(schema.storiesTranslations.storyId, schema.stories.id),
          eq(schema.storiesTranslations.locale, locale),
        ),
      )
      .where(eq(schema.stories.isPublished, 1)),
    db
      .select({
        slug: schema.events.slug,
        date: schema.events.date,
        eventPhase: schema.events.eventPhase,
        title: schema.eventsTranslations.title,
        location: schema.eventsTranslations.location,
        audience: schema.eventsTranslations.audience,
        summary: schema.eventsTranslations.summary,
        statusLabel: schema.eventsTranslations.statusLabel,
      })
      .from(schema.events)
      .leftJoin(
        schema.eventsTranslations,
        and(
          eq(schema.eventsTranslations.eventId, schema.events.id),
          eq(schema.eventsTranslations.locale, locale),
        ),
      )
      .where(eq(schema.events.isPublished, 1)),
    db
      .select({
        slug: schema.podcastEpisodes.slug,
        title: schema.podcastEpisodesTranslations.title,
        summary: schema.podcastEpisodesTranslations.summary,
        languageDisplay: schema.podcastEpisodesTranslations.languageDisplay,
      })
      .from(schema.podcastEpisodes)
      .leftJoin(
        schema.podcastEpisodesTranslations,
        and(
          eq(schema.podcastEpisodesTranslations.episodeId, schema.podcastEpisodes.id),
          eq(schema.podcastEpisodesTranslations.locale, locale),
        ),
      )
      .where(eq(schema.podcastEpisodes.isPublished, 1)),
  ]);

  return {
    languages: langRows
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((r) => ({
        code: r.code,
        name: r.displayName ?? "",
        native: r.nativeName,
        region: r.region ?? "",
        speakers: r.speakers ?? "",
        status: r.statusCode,
        statusLabel: r.statusLabel ?? "",
        titles: r.titlesPublished,
      })),
    publications: pubRows.map((r) => ({
      slug: r.slug,
      title: r.title ?? "",
      language: r.language ?? "",
      native: r.nativeTitle,
      audience: r.audience ?? "",
      pages: r.pages,
      status: r.printStatus,
      statusLabel: r.statusLabel ?? "",
    })),
    projects: projRows.map((r) => ({
      slug: r.slug,
      title: r.title ?? "",
      region: r.regionDisplay ?? "",
      need: r.need ?? "",
      raised: r.raised,
      goal: r.goal,
      impact: r.impact ?? "",
    })),
    news: newsRows
      .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
      .map((r) => ({
        slug: r.slug,
        date: String(r.publishedAt).slice(0, 10),
        title: r.title ?? "",
        excerpt: r.excerpt ?? "",
        tag: r.tag,
        image: r.imageUrl ?? undefined,
        body: r.body ?? undefined,
      })),
    values: valueRows
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((r) => ({
        slug: r.slug,
        title: r.title ?? "",
        body: r.body ?? "",
      })),
    stories: storyRows.map((r) => ({
      slug: r.slug,
      name: r.name ?? "",
      role: r.role ?? "",
      congregation: r.congregation ?? "",
      language: r.languageDisplay ?? "",
      quote: r.quote ?? "",
    })),
    events: eventRows
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((r) => ({
        slug: r.slug,
        title: r.title ?? "",
        date: String(r.date).slice(0, 10),
        location: r.location ?? "",
        audience: r.audience ?? "",
        summary: r.summary ?? "",
        status: r.eventPhase,
        statusLabel: r.statusLabel ?? "",
      })),
    podcastEpisodes: episodeRows.map((r) => ({
      slug: r.slug,
      title: r.title ?? "",
      summary: r.summary ?? "",
      language: r.languageDisplay ?? "",
    })),
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
