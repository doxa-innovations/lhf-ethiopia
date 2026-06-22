"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { auth } from "@/lib/auth";
import { LOCALES, type Locale } from "@/lib/i18n/dictionary";

type Edit = { content: string; imageUrl?: string; locale: Locale };
type Payload = Record<string, Edit>;

const VALID_LOCALES = new Set<string>(LOCALES);
const VALID_PAGE = /^[a-z][a-z0-9-]{0,40}$/;
const MAX_CONTENT_LENGTH = 8000;

/**
 * Persists a batch of element edits to cms_elements. The key in the payload
 * map is "loc::elementId" (matches EditorProvider.getDirty's encoding) and
 * is only used to make keys unique — we read locale + elementId off the row
 * itself. With `publish: true`, the row's `is_published` flag is set and the
 * draft sibling (if any) is cleared. With `publish: false`, the row is
 * written as a draft (is_draft=1, is_published=0) — the public site keeps
 * showing the previously published row.
 *
 * Validates auth, pageName, every locale, content length, and rejects edits
 * with an empty content + no image. Errors before any DB write so a single
 * bad field can't half-corrupt a multi-element save.
 */
export async function saveCmsElements(
  payload: Payload,
  options: { publish: boolean; pageName: string },
): Promise<{ ok: boolean; error?: string; saved?: number }> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Not signed in" };
  const userId = Number((session.user as { id?: string | number }).id);
  const validUserId = Number.isFinite(userId) ? userId : null;

  if (!VALID_PAGE.test(options.pageName)) {
    return { ok: false, error: `Invalid page name "${options.pageName}"` };
  }

  // Resolve keys to (elementId, edit) tuples and validate upfront.
  const rows: Array<{ elementId: string; edit: Edit }> = [];
  for (const [key, edit] of Object.entries(payload)) {
    const sep = key.indexOf("::");
    const elementId = sep >= 0 ? key.slice(sep + 2) : key;
    if (!elementId) {
      return { ok: false, error: `Missing element id in key "${key}"` };
    }
    if (!VALID_LOCALES.has(edit.locale)) {
      return { ok: false, error: `Unknown locale "${edit.locale}"` };
    }
    if (
      typeof edit.content !== "string" ||
      edit.content.length > MAX_CONTENT_LENGTH
    ) {
      return {
        ok: false,
        error: `Content for "${elementId}" exceeds ${MAX_CONTENT_LENGTH} chars or is not a string`,
      };
    }
    const hasContent = edit.content.trim().length > 0;
    const hasImage = typeof edit.imageUrl === "string" && edit.imageUrl.length > 0;
    if (!hasContent && !hasImage) {
      return {
        ok: false,
        error: `"${elementId}" (${edit.locale}) would be saved empty — type some text or restore the original before saving.`,
      };
    }
    rows.push({ elementId, edit });
  }

  try {
    for (const { elementId, edit } of rows) {
      await upsertElement({
        elementId,
        locale: edit.locale,
        pageName: options.pageName,
        content: edit.content,
        imageUrl: edit.imageUrl,
        publish: options.publish,
        userId: validUserId,
      });
    }
    if (options.publish) {
      // Bust the layout fetch so the next request rebuilds PublishedElements.
      revalidatePath("/", "layout");
    }
    return { ok: true, saved: rows.length };
  } catch (err) {
    console.error("saveCmsElements failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

async function upsertElement(args: {
  elementId: string;
  locale: Locale;
  pageName: string;
  content: string;
  imageUrl?: string;
  publish: boolean;
  userId: number | null;
}) {
  const { elementId, locale, pageName, content, imageUrl, publish, userId } =
    args;

  if (publish) {
    // Clear any existing draft + previous published row, then write the new
    // published row. Simpler than a true upsert because cms_elements has no
    // composite unique constraint on (elementId, locale, isPublished).
    await db
      .delete(schema.cmsElements)
      .where(
        and(
          eq(schema.cmsElements.elementId, elementId),
          eq(schema.cmsElements.locale, locale),
        ),
      );
    await db.insert(schema.cmsElements).values({
      elementId,
      locale,
      pageName,
      content,
      imageUrl: imageUrl ?? null,
      isDraft: 0,
      isPublished: 1,
      updatedByUserId: userId,
    });
    return;
  }

  // Draft save — keep the existing published row intact, replace the draft.
  await db
    .delete(schema.cmsElements)
    .where(
      and(
        eq(schema.cmsElements.elementId, elementId),
        eq(schema.cmsElements.locale, locale),
        eq(schema.cmsElements.isDraft, 1),
      ),
    );
  await db.insert(schema.cmsElements).values({
    elementId,
    locale,
    pageName,
    content,
    imageUrl: imageUrl ?? null,
    isDraft: 1,
    isPublished: 0,
    updatedByUserId: userId,
  });
}
