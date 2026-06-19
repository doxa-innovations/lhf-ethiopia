import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { revalidatePath } from "next/cache";

/**
 * Build a Payload afterChange/afterDelete hook that revalidates a set of
 * Next.js routes. Each route is revalidated for every locale via the
 * built-in `?locale=` query in our consumers — Next's revalidatePath flushes
 * the per-route cache, not per-locale, so this is sufficient.
 */
export function revalidateRoutes(routes: string[]): {
  afterChange: CollectionAfterChangeHook;
  afterDelete: CollectionAfterDeleteHook;
  globalAfterChange: GlobalAfterChangeHook;
} {
  const flush = (slug?: string | null) => {
    for (const route of routes) {
      const path = slug ? route.replace("[slug]", slug) : route;
      try {
        revalidatePath(path);
      } catch {
        // No-op if called outside Next request context (e.g. seed script).
      }
    }
  };

  return {
    afterChange: ({ doc }) => {
      flush((doc as { slug?: string }).slug);
      return doc;
    },
    afterDelete: ({ doc }) => {
      flush((doc as { slug?: string }).slug);
    },
    globalAfterChange: ({ doc }) => {
      flush(null);
      return doc;
    },
  };
}
