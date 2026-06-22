"use server";

import { saveCmsElements } from "@/lib/cms/save-elements";
import type { Locale } from "@/lib/i18n/dictionary";

export async function savePodcast(
  payload: Record<
    string,
    { content: string; imageUrl?: string; locale: Locale }
  >,
  options: { publish: boolean },
) {
  return saveCmsElements(payload, { ...options, pageName: "podcast" });
}
