/**
 * LHF Ethiopia CMS schema — Postgres dialect.
 *
 * Used by BOTH dev (PGlite, WASM-based Postgres-compatible, no native deps)
 * and prod (real Postgres 16 in Docker on the VPS). One schema, two
 * runtimes — identical SQL.
 */
import {
  pgTable,
  serial,
  integer,
  text,
  primaryKey,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

/* ----- Users ----- */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("editor"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
});

/* ----- Media ----- */
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type"),
  width: integer("width"),
  height: integer("height"),
  altEn: text("alt_en"),
  altAm: text("alt_am"),
  altOm: text("alt_om"),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ----- CMS elements (page microcopy) ----- */
export const cmsElements = pgTable(
  "cms_elements",
  {
    id: serial("id").primaryKey(),
    elementId: text("element_id").notNull(),
    locale: text("locale").notNull(),
    pageName: text("page_name").notNull(),
    content: text("content"),
    imageUrl: text("image_url"),
    isDraft: integer("is_draft").notNull().default(0),
    isPublished: integer("is_published").notNull().default(0),
    updatedByUserId: integer("updated_by_user_id").references(() => users.id),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    elPageIdx: index("cms_element_page_idx").on(t.pageName, t.locale),
    elIdLocaleIdx: index("cms_element_id_locale_idx").on(t.elementId, t.locale),
  }),
);

/* ----- News ----- */
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  publishedAt: text("published_at").notNull(),
  tag: text("tag").notNull(),
  imageId: integer("image_id").references(() => media.id),
  imageUrl: text("image_url"),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsTranslations = pgTable(
  "news_translations",
  {
    newsId: integer("news_id")
      .notNull()
      .references(() => news.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    body: text("body"),
  },
  (t) => ({ pk: primaryKey({ columns: [t.newsId, t.locale] }) }),
);

/* ----- Projects ----- */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  regionCode: text("region_code").notNull(),
  raised: integer("raised").notNull().default(0),
  goal: integer("goal").notNull().default(1),
  imageId: integer("image_id").references(() => media.id),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projectsTranslations = pgTable(
  "projects_translations",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    regionDisplay: text("region_display").notNull(),
    need: text("need").notNull(),
    impact: text("impact").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.projectId, t.locale] }) }),
);

/* ----- Events ----- */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  eventPhase: text("event_phase").notNull(),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const eventsTranslations = pgTable(
  "events_translations",
  {
    eventId: integer("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    location: text("location").notNull(),
    audience: text("audience").notNull(),
    summary: text("summary").notNull(),
    statusLabel: text("status_label").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.eventId, t.locale] }) }),
);

/* ----- Publications ----- */
export const publications = pgTable("publications", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  pages: integer("pages").notNull().default(0),
  nativeTitle: text("native_title").notNull(),
  printStatus: text("print_status").notNull(),
  languageCode: text("language_code").notNull(),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const publicationsTranslations = pgTable(
  "publications_translations",
  {
    publicationId: integer("publication_id")
      .notNull()
      .references(() => publications.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    language: text("language").notNull(),
    audience: text("audience").notNull(),
    statusLabel: text("status_label").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.publicationId, t.locale] }) }),
);

/* ----- Values ----- */
export const values = pgTable("values", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const valuesTranslations = pgTable(
  "values_translations",
  {
    valueId: integer("value_id")
      .notNull()
      .references(() => values.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.valueId, t.locale] }) }),
);

/* ----- Stories ----- */
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  languageCode: text("language_code").notNull(),
  imageId: integer("image_id").references(() => media.id),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const storiesTranslations = pgTable(
  "stories_translations",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    congregation: text("congregation").notNull(),
    quote: text("quote").notNull(),
    languageDisplay: text("language_display").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.storyId, t.locale] }) }),
);

/* ----- Podcast episodes ----- */
export const podcastEpisodes = pgTable("podcast_episodes", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  number: integer("number").notNull().default(0),
  youtubeId: text("youtube_id").notNull(),
  date: text("date").notNull(),
  durationMin: integer("duration_min").notNull().default(0),
  topicKey: text("topic_key").notNull(),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const podcastEpisodesTranslations = pgTable(
  "podcast_episodes_translations",
  {
    episodeId: integer("episode_id")
      .notNull()
      .references(() => podcastEpisodes.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    languageDisplay: text("language_display").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.episodeId, t.locale] }) }),
);

/* ----- Languages ----- */
export const languages = pgTable("languages", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  nativeName: text("native_name").notNull(),
  titlesPublished: integer("titles_published").notNull().default(0),
  statusCode: text("status_code").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isDraft: integer("is_draft").notNull().default(0),
  isPublished: integer("is_published").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const languagesTranslations = pgTable(
  "languages_translations",
  {
    languageId: integer("language_id")
      .notNull()
      .references(() => languages.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    displayName: text("display_name").notNull(),
    region: text("region").notNull(),
    speakers: text("speakers").notNull(),
    statusLabel: text("status_label").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.languageId, t.locale] }) }),
);

/* ----- Site settings (singleton row at id=1) ----- */
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  socialFacebook: text("social_facebook"),
  socialInstagram: text("social_instagram"),
  socialYoutube: text("social_youtube"),
  socialSpotify: text("social_spotify"),
  socialApplePodcasts: text("social_apple_podcasts"),
  socialTelegram: text("social_telegram"),
  featuredYoutubeId: text("featured_youtube_id"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettingsTranslations = pgTable(
  "site_settings_translations",
  {
    siteSettingsId: integer("site_settings_id")
      .notNull()
      .references(() => siteSettings.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    tagline: text("tagline").notNull(),
    siteDescription: text("site_description").notNull(),
  },
  (t) => ({ pk: primaryKey({ columns: [t.siteSettingsId, t.locale] }) }),
);
