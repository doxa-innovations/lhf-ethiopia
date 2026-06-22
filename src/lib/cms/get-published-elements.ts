import "server-only";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { withDbRetry } from "@/lib/db-retry";
import type { Locale } from "@/lib/i18n/dictionary";

export type PublishedElements = Record<Locale, Record<string, string>>;

/**
 * Fetch every published cms_elements row, grouped by locale. The map is
 * small (~750 rows × 3 locales after seed) so the layout-level fetch is
 * cheap and lets every client component look up its elementId without a
 * round-trip.
 */
export async function getPublishedElements(): Promise<PublishedElements> {
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
}
