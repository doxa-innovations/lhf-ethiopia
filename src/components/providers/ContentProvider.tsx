"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { LocalizedContent } from "@/lib/i18n/content-types";
import type { Locale } from "@/lib/i18n/dictionary";

type AllLocales = Record<Locale, LocalizedContent>;

const Ctx = createContext<AllLocales | null>(null);

/**
 * Wraps the app with the content fetched server-side for every locale.
 * The root layout (Server Component) calls `getAllLocalesContent()` and
 * passes the result here once — `useContent()` then reads from this
 * context based on the active locale.
 */
export function ContentProvider({
  value,
  children,
}: {
  value: AllLocales;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAllLocalesContent(): AllLocales | null {
  return useContext(Ctx);
}
