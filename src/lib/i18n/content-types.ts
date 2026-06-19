/**
 * Shape of the localized content returned by useContent() and by the
 * server-side getContent(locale) helper.
 *
 * Kept as an explicit type (no longer derived from en.json) so the public
 * site can keep using `useContent()` after the JSON files are replaced by
 * the Payload-backed data source.
 */

export type Language = {
  code: string;
  name: string;
  native: string;
  region: string;
  speakers: string;
  status: string;
  statusLabel: string;
  titles: number;
};

export type Publication = {
  slug: string;
  title: string;
  language: string;
  native: string;
  audience: string;
  pages: number;
  status: string;
  statusLabel: string;
};

export type Project = {
  slug: string;
  title: string;
  region: string;
  need: string;
  raised: number;
  goal: number;
  impact: string;
};

export type NewsArticle = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  image?: string;
  body?: string;
};

export type ValueItem = {
  slug: string;
  title: string;
  body: string;
};

export type Story = {
  slug: string;
  name: string;
  role: string;
  congregation: string;
  language: string;
  quote: string;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  audience: string;
  summary: string;
  status: string;
  statusLabel: string;
};

export type PodcastEpisodeLocale = {
  slug: string;
  title: string;
  summary: string;
  language: string;
};

export type TitlesPerLanguage = { language: string; titles: number };

export type LocalizedContent = {
  languages: Language[];
  publications: Publication[];
  projects: Project[];
  news: NewsArticle[];
  values: ValueItem[];
  stories: Story[];
  events: EventItem[];
  podcastEpisodes: PodcastEpisodeLocale[];
  impactSeriesNames: string[];
  titlesPerLanguage: TitlesPerLanguage[];
};
