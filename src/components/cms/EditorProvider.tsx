"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/i18n/dictionary";

/* ----- Types ----- */
export type EditMode = "off" | "page" | "doc";

type ElementEdit = { content: string; imageUrl?: string };

type EditorCtx = {
  mode: EditMode;
  /** Page key like "home", "about" — relevant when mode === "page". */
  pageName: string | null;
  /** Collection + id when mode === "doc". */
  collection: string | null;
  docId: number | string | null;
  /** Active locale shown in the editor. */
  locale: Locale;
  setLocale: (l: Locale) => void;

  /** Read the current value (draft if dirty, else server-provided default). */
  getValue: (elementId: string, defaultValue: string) => string;
  /** Update a value (marks dirty). */
  setValue: (elementId: string, value: string, imageUrl?: string) => void;
  /** Read image URL if any. */
  getImageUrl: (elementId: string, defaultImageUrl?: string) => string | undefined;

  /** Has the form been changed since the last save / since mount? */
  isDirty: boolean;
  /** Per-locale dirty count so toolbars can hint where unsaved edits sit. */
  dirtyByLocale: Record<Locale, number>;
  /** Returns the diff for submission: only elements that were touched. */
  getDirty: () => Record<string, ElementEdit & { locale: Locale }>;
  /** Clear dirty after a successful save. */
  markClean: () => void;
  /** Throw away in-memory changes. */
  discard: () => void;
};

const Ctx = createContext<EditorCtx | null>(null);

/* ----- Provider ----- */
export function EditorProvider({
  mode,
  pageName = null,
  collection = null,
  docId = null,
  initialLocale = "en",
  children,
}: {
  mode: EditMode;
  pageName?: string | null;
  collection?: string | null;
  docId?: number | string | null;
  initialLocale?: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  // Per-locale edits map. Switching locale shows that locale's edits.
  const edits = useRef<Record<Locale, Record<string, ElementEdit>>>({
    en: {},
    am: {},
    om: {},
  });
  // Force re-render when edits update — we don't want to put the whole
  // edits map in state because that would cause every keystroke to
  // re-render every <EditableText>.
  const [tick, setTick] = useState(0);
  const bump = useCallback(() => setTick((t) => t + 1), []);

  const getValue = useCallback(
    (elementId: string, defaultValue: string) => {
      const e = edits.current[locale][elementId];
      return e?.content ?? defaultValue;
    },
    [locale],
  );
  const getImageUrl = useCallback(
    (elementId: string, defaultImageUrl?: string) => {
      const e = edits.current[locale][elementId];
      return e?.imageUrl ?? defaultImageUrl;
    },
    [locale],
  );
  const setValue = useCallback(
    (elementId: string, value: string, imageUrl?: string) => {
      const existing = edits.current[locale][elementId];
      edits.current[locale][elementId] = {
        content: value,
        imageUrl: imageUrl ?? existing?.imageUrl,
      };
      bump();
    },
    [locale, bump],
  );

  const dirtyByLocale = useMemo<Record<Locale, number>>(
    () => ({
      en: Object.keys(edits.current.en).length,
      am: Object.keys(edits.current.am).length,
      om: Object.keys(edits.current.om).length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tick],
  );
  const isDirty =
    dirtyByLocale.en + dirtyByLocale.am + dirtyByLocale.om > 0;

  const getDirty = useCallback(() => {
    const out: Record<string, ElementEdit & { locale: Locale }> = {};
    for (const loc of ["en", "am", "om"] as const) {
      for (const [k, v] of Object.entries(edits.current[loc])) {
        out[`${loc}::${k}`] = { ...v, locale: loc };
      }
    }
    return out;
  }, []);

  const markClean = useCallback(() => {
    edits.current = { en: {}, am: {}, om: {} };
    bump();
  }, [bump]);
  /**
   * Reset all in-memory edits. Callers that need a confirmation prompt
   * should call `useConfirm()` before invoking `discard()` — the prompt
   * was lifted out so the provider stays free of UI dependencies.
   */
  const discard = useCallback(() => {
    markClean();
  }, [markClean]);

  // Warn before tab close if dirty.
  useEffect(() => {
    if (!isDirty || mode === "off") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, mode]);

  // Add data-editing on <html> so a global CSS rule can show a hover
  // outline on every <EditableText> input — gives editors a visual hint
  // of what's clickable without affecting the public site.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mode === "off") return;
    document.documentElement.setAttribute("data-editing", "true");
    return () => {
      document.documentElement.removeAttribute("data-editing");
    };
  }, [mode]);

  const value: EditorCtx = {
    mode,
    pageName,
    collection,
    docId,
    locale,
    setLocale,
    getValue,
    setValue,
    getImageUrl,
    isDirty,
    dirtyByLocale,
    getDirty,
    markClean,
    discard,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ----- Hook ----- */
export function useEditor(): EditorCtx | null {
  return useContext(Ctx);
}
