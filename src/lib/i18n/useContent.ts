"use client";

import { useT } from "@/components/providers/LanguageProvider";
import en from "@/content/en.json";
import am from "@/content/am.json";
import om from "@/content/om.json";

export type LocalizedContent = typeof en;

const TABLE: Record<string, LocalizedContent> = { en, am, om };

export function useContent(): LocalizedContent {
  const { locale } = useT();
  return TABLE[locale] ?? en;
}
