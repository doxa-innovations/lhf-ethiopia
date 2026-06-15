"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionary, LOCALES, type Locale, type TKey } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "lhf-ethiopia.locale";
const PROMPTED_KEY = "lhf-ethiopia.locale-prompted";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TKey) => string;
  promptOpen: boolean;
  closePrompt: () => void;
  detectedLocale: Locale;
};

const LanguageContext = createContext<Ctx | null>(null);

const detectFromNavigator = (): Locale => {
  if (typeof navigator === "undefined") return "en";
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const raw of langs) {
    const code = raw.toLowerCase();
    if (code.startsWith("am")) return "am";
    if (code.startsWith("om") || code.startsWith("orm")) return "om";
    if (code.startsWith("en")) return "en";
  }
  return "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Render English first to keep SSR + first paint deterministic; rehydrate
  // from localStorage once mounted.
  const [locale, setLocaleState] = useState<Locale>("en");
  const [promptOpen, setPromptOpen] = useState(false);
  const [detectedLocale, setDetectedLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined"
      ? localStorage.getItem(STORAGE_KEY)
      : null) as Locale | null;
    const prompted = typeof localStorage !== "undefined"
      ? localStorage.getItem(PROMPTED_KEY) === "1"
      : false;

    if (stored && (LOCALES as readonly string[]).includes(stored)) {
      setLocaleState(stored);
    } else {
      const guess = detectFromNavigator();
      setDetectedLocale(guess);
      setLocaleState(guess);
      if (!prompted) {
        // open the first-visit chooser slightly after paint
        setTimeout(() => setPromptOpen(true), 800);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
      localStorage.setItem(PROMPTED_KEY, "1");
    }
  }, []);

  const closePrompt = useCallback(() => {
    setPromptOpen(false);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(PROMPTED_KEY, "1");
    }
  }, []);

  const t = useCallback(
    (key: TKey) => {
      const [section, leaf] = key.split(".") as [keyof typeof dictionary.en, string];
      const active = dictionary[locale][section] as Record<string, string>;
      const fallback = dictionary.en[section] as Record<string, string>;
      return active[leaf] ?? fallback[leaf] ?? key;
    },
    [locale],
  );

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, t, promptOpen, closePrompt, detectedLocale }),
    [locale, setLocale, t, promptOpen, closePrompt, detectedLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Server fallback or unwrapped tree: return English from the dictionary.
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: (key: TKey) => {
        const [section, leaf] = key.split(".") as [
          keyof typeof dictionary.en,
          string,
        ];
        const fallback = dictionary.en[section] as Record<string, string>;
        return fallback[leaf] ?? key;
      },
      promptOpen: false,
      closePrompt: () => {},
      detectedLocale: "en" as Locale,
    };
  }
  return ctx;
}
