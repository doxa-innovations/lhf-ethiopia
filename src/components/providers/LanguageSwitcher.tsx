"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "./LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/dictionary";

export function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const isDark = variant === "dark";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          borderRadius: 999,
          background: isDark ? "rgba(255,255,255,0.08)" : "rgb(var(--surface-2))",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgb(var(--border))"}`,
          color: isDark ? "white" : "rgb(var(--ink))",
          fontSize: 12.5,
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 180ms ease, border-color 180ms ease",
        }}
      >
        <Globe size={13} />
        <span>{LOCALE_LABELS[locale].short}</span>
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
          }}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: 200,
              background: "white",
              borderRadius: 12,
              border: "1px solid rgb(var(--border))",
              boxShadow: "0 12px 32px -8px rgba(8, 12, 22, 0.18)",
              padding: 6,
              zIndex: 60,
            }}
          >
            {LOCALES.map((l) => {
              const meta = LOCALE_LABELS[l];
              const active = locale === l;
              return (
                <button
                  key={l}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: active ? "rgb(var(--brand-muted))" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 140ms ease",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      aria-hidden
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background: active ? "rgb(var(--brand))" : "rgb(var(--surface-2))",
                        color: active ? "white" : "rgb(var(--ink))",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 11,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {meta.short}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                      <span
                        className="font-display"
                        style={{
                          fontSize: 14,
                          color: "rgb(var(--ink))",
                          fontWeight: 500,
                        }}
                      >
                        {meta.native}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgb(var(--ink-faint))",
                          marginTop: 1,
                        }}
                      >
                        {meta.english}
                      </span>
                    </span>
                  </span>
                  {active ? (
                    <Check size={14} style={{ color: "rgb(var(--brand))" }} />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
