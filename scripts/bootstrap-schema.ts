/**
 * Schema bootstrap — applies CREATE TABLE IF NOT EXISTS for every table.
 * Idempotent. Uses the same db client as the rest of the app, so dev hits
 * PGlite and prod hits real Postgres without any branching here.
 */
import "dotenv/config";
import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
  )`,
  `CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT,
    width INTEGER,
    height INTEGER,
    alt_en TEXT, alt_am TEXT, alt_om TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS cms_elements (
    id SERIAL PRIMARY KEY,
    element_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    page_name TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 0,
    updated_by_user_id INTEGER REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE INDEX IF NOT EXISTS cms_element_page_idx ON cms_elements (page_name, locale)`,
  `CREATE INDEX IF NOT EXISTS cms_element_id_locale_idx ON cms_elements (element_id, locale)`,
  `CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    published_at TEXT NOT NULL,
    tag TEXT NOT NULL,
    image_id INTEGER REFERENCES media(id),
    image_url TEXT,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS news_translations (
    news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    body TEXT,
    PRIMARY KEY (news_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    region_code TEXT NOT NULL,
    raised INTEGER NOT NULL DEFAULT 0,
    goal INTEGER NOT NULL DEFAULT 1,
    image_id INTEGER REFERENCES media(id),
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS projects_translations (
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    region_display TEXT NOT NULL,
    need TEXT NOT NULL,
    impact TEXT NOT NULL,
    PRIMARY KEY (project_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    date TEXT NOT NULL,
    event_phase TEXT NOT NULL,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS events_translations (
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    audience TEXT NOT NULL,
    summary TEXT NOT NULL,
    status_label TEXT NOT NULL,
    PRIMARY KEY (event_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    pages INTEGER NOT NULL DEFAULT 0,
    native_title TEXT NOT NULL,
    print_status TEXT NOT NULL,
    language_code TEXT NOT NULL,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS publications_translations (
    publication_id INTEGER NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    language TEXT NOT NULL,
    audience TEXT NOT NULL,
    status_label TEXT NOT NULL,
    PRIMARY KEY (publication_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS values (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS values_translations (
    value_id INTEGER NOT NULL REFERENCES values(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    PRIMARY KEY (value_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    language_code TEXT NOT NULL,
    image_id INTEGER REFERENCES media(id),
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS stories_translations (
    story_id INTEGER NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    congregation TEXT NOT NULL,
    quote TEXT NOT NULL,
    language_display TEXT NOT NULL,
    PRIMARY KEY (story_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS podcast_episodes (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    number INTEGER NOT NULL DEFAULT 0,
    youtube_id TEXT NOT NULL,
    date TEXT NOT NULL,
    duration_min INTEGER NOT NULL DEFAULT 0,
    topic_key TEXT NOT NULL,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS podcast_episodes_translations (
    episode_id INTEGER NOT NULL REFERENCES podcast_episodes(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    language_display TEXT NOT NULL,
    PRIMARY KEY (episode_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS languages (
    id SERIAL PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    native_name TEXT NOT NULL,
    titles_published INTEGER NOT NULL DEFAULT 0,
    status_code TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_draft INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS languages_translations (
    language_id INTEGER NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    display_name TEXT NOT NULL,
    region TEXT NOT NULL,
    speakers TEXT NOT NULL,
    status_label TEXT NOT NULL,
    PRIMARY KEY (language_id, locale)
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    email TEXT, phone TEXT, address TEXT,
    social_facebook TEXT, social_instagram TEXT, social_youtube TEXT,
    social_spotify TEXT, social_apple_podcasts TEXT, social_telegram TEXT,
    featured_youtube_id TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings_translations (
    site_settings_id INTEGER NOT NULL REFERENCES site_settings(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    tagline TEXT NOT NULL,
    site_description TEXT NOT NULL,
    PRIMARY KEY (site_settings_id, locale)
  )`,
];

async function main() {
  console.log(`Bootstrapping schema…`);
  let i = 0;
  for (const stmt of STATEMENTS) {
    await db.execute(sql.raw(stmt));
    i++;
  }
  console.log(`✓ ${i} statements executed — schema is ready.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ bootstrap failed:");
  console.error(err);
  process.exit(1);
});
