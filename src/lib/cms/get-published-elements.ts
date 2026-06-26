import "server-only";
import type { Locale } from "@/lib/i18n/dictionary";

export type PublishedElements = Record<Locale, Record<string, string>>;

const EMPTY: PublishedElements = { en: {}, am: {}, om: {} };

/**
 * Fetch every published cms_elements row, grouped by locale. The map is
 * small (~750 rows × 3 locales after seed) so the layout-level fetch is
 * cheap and lets every client component look up its elementId without a
 * round-trip.
 *
 * When DATABASE_URL is unset (frontend-only deploy, before the CMS is
 * wired up to a prod Postgres), this returns an empty map so the public
 * site renders the `defaultValue` baked into every <EditableText>.
 */
export async function getPublishedElements(): Promise<PublishedElements> {
  if (!process.env.DATABASE_URL) return EMPTY;

  // Lazy-load so the bundle doesn't pull pg into a deploy that has no DB.
  const [{ eq }, { db, schema }, { withDbRetry }] = await Promise.all([
    import("drizzle-orm"),
    import("@/lib/db"),
    import("@/lib/db-retry"),
  ]);

  try {
    const rows = await withDbRetry(() =>
      db
        .select({
          elementId: schema.cmsElements.elementId,
          locale: schema.cmsElements.locale,
          content: schema.cmsElements.content,
        })
        .from(schema.cmsElements)
        .where(eq(schema.cmsElements.isPublished, 1)),
    );

    const out: PublishedElements = { en: {}, am: {}, om: {} };
    for (const r of rows) {
      const loc = r.locale as Locale;
      if (!out[loc]) continue;
      if (r.content != null) out[loc][r.elementId] = r.content;
    }
    return out;
  } catch (err) {
    // A misconfigured DATABASE_URL or unreachable Postgres should not 500
    // the public homepage. Log and fall back to baked-in defaults.
    console.warn(
      "[cms] getPublishedElements failed, falling back to defaults:",
      err instanceof Error ? err.message : err,
    );
    return EMPTY;
  }
}
