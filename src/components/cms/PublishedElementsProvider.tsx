"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PublishedElements } from "@/lib/cms/get-published-elements";
import type { Locale } from "@/lib/i18n/dictionary";

const Ctx = createContext<PublishedElements | null>(null);

export function PublishedElementsProvider({
  value,
  children,
}: {
  value: PublishedElements;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * Returns the published content for an element id at the active locale, or
 * `null` if no published row exists. Callers fall back to their compiled-in
 * default (typically the `t()` value seeded from dictionary.ts).
 */
export function usePublishedElement(
  elementId: string,
  locale: Locale,
): string | null {
  const map = useContext(Ctx);
  if (!map) return null;
  return map[locale]?.[elementId] ?? null;
}
