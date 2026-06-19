"use client";

import { useT } from "@/components/providers/LanguageProvider";
import { useAllLocalesContent } from "@/components/providers/ContentProvider";
import type { LocalizedContent } from "@/lib/i18n/content-types";

/**
 * Reads the body content for the currently active locale.
 *
 * Backed by the `<ContentProvider>` mounted in the root layout, which
 * fetches all three locales from Payload's Local API at build / request
 * time via `getAllLocalesContent()`. Falls back to en when the provider
 * hasn't mounted yet (e.g. test contexts).
 */
export function useContent(): LocalizedContent {
  const { locale } = useT();
  const all = useAllLocalesContent();
  if (!all) return EMPTY;
  return all[locale] ?? all.en;
}

export type { LocalizedContent };

const EMPTY: LocalizedContent = {
  languages: [],
  publications: [],
  projects: [],
  news: [],
  values: [],
  stories: [],
  events: [],
  podcastEpisodes: [],
  impactSeriesNames: [],
  titlesPerLanguage: [],
};
