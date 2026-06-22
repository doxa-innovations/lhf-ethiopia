"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { auth } from "@/lib/auth";
import type { Locale } from "@/lib/i18n/dictionary";

type Edit = { content: string; imageUrl?: string; locale: Locale };
type Payload = Record<string, Edit>;

/**
 * Persists a batch of element edits to cms_elements. The key in the payload
 * map is "loc::elementId" (matches EditorProvider.getDirty's encoding) and
 * is only used to make keys unique — we read locale + elementId off the row
 * itself. With `publish: true`, the row's `is_published` flag is set and the
 * draft sibling (if any) is cleared. With `publish: false`, the row is
 * written as a draft (is_draft=1, is_published=0) — the public site keeps
 * showing the previously published row.
 */
export async function saveCmsElements(
  payload: Payload,
  options: { publish: boolean; pageName: string },
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Not signed in" };
  const userId = Number((session.user as { id?: string | number }).id);
  const validUserId = Number.isFinite(userId) ? userId : null;

  try {
    for (const edit of Object.values(payload)) {
      const elementId = parseElementId(edit, payload);
      if (!elementId) continue;
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
    // Revalidate the public path so the next request rebuilds from DB.
    if (options.publish) {
      revalidatePath("/", "layout");
    }
    return { ok: true };
  } catch (err) {
    console.error("saveCmsElements failed", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/* The dirty-map key is `${locale}::${elementId}`. We just split on the first
 * "::" pair to recover the element id; the locale comes off the edit row. */
function parseElementId(edit: Edit, payload: Payload): string | null {
  for (const [key, e] of Object.entries(payload)) {
    if (e === edit) {
      const sep = key.indexOf("::");
      return sep >= 0 ? key.slice(sep + 2) : key;
    }
  }
  return null;
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
  const { elementId, locale, pageName, content, imageUrl, publish, userId } = args;

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
