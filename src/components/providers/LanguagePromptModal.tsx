"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Languages } from "lucide-react";
import { useT } from "./LanguageProvider";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n/dictionary";

export function LanguagePromptModal() {
  const { promptOpen, closePrompt, locale, setLocale, t, detectedLocale } = useT();

  return (
    <AnimatePresence>
      {promptOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(8, 12, 22, 0.45)",
            backdropFilter: "blur(6px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
          onClick={closePrompt}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 16,
              maxWidth: 440,
              width: "100%",
              padding: 28,
              boxShadow: "0 24px 60px -12px rgba(8, 12, 22, 0.35)",
              border: "1px solid rgb(var(--border))",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lang-modal-title"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span
                aria-hidden
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgb(var(--brand-muted))",
                  color: "rgb(var(--brand))",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Languages size={18} />
              </span>
              <h2
                id="lang-modal-title"
                className="font-display"
                style={{ fontSize: 22, fontWeight: 500, color: "rgb(var(--ink))", lineHeight: 1.15 }}
              >
                {t("languageModal.title")}
              </h2>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgb(var(--ink-muted))",
                lineHeight: 1.55,
              }}
            >
              {t("languageModal.hint")}
            </p>

            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              {LOCALES.map((l) => {
                const meta = LOCALE_LABELS[l];
                const active = locale === l;
                const isDetected = detectedLocale === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: `1.5px solid ${active ? "rgb(var(--brand))" : "rgb(var(--border))"}`,
                      background: active ? "rgb(var(--brand-muted))" : "white",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 160ms ease",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: active ? "rgb(var(--brand))" : "rgb(var(--surface-2))",
                          color: active ? "white" : "rgb(var(--ink))",
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {meta.short}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column" }}>
                        <span
                          className="font-display"
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: "rgb(var(--ink))",
                            lineHeight: 1.1,
                          }}
                        >
                          {meta.native}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            color: "rgb(var(--ink-faint))",
                            marginTop: 2,
                          }}
                        >
                          {meta.english}
                          {isDetected ? " · detected" : ""}
                        </span>
                      </span>
                    </span>
                    {active ? (
                      <Check size={18} style={{ color: "rgb(var(--brand))" }} />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "rgb(var(--ink-faint))" }}>
                {t("languageModal.subtitle")}
              </span>
              <button
                type="button"
                onClick={closePrompt}
                className="btn btn-primary btn-sm"
              >
                {t("languageModal.saveBtn")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
