"use client";

import { useTransition } from "react";
import { useEditor } from "./EditorProvider";
import type { Locale } from "@/lib/i18n/dictionary";

const LOCALES: Array<{ code: Locale; short: string; name: string }> = [
  { code: "en", short: "EN", name: "English" },
  { code: "am", short: "አማ", name: "አማርኛ" },
  { code: "om", short: "OM", name: "Afaan Oromoo" },
];

type SaveAction = (
  payload: Record<string, { content: string; imageUrl?: string; locale: Locale }>,
  options: { publish: boolean },
) => Promise<{ ok: boolean; error?: string }>;

export function EditorToolbar({ saveAction }: { saveAction: SaveAction }) {
  const editor = useEditor();
  const [pending, start] = useTransition();
  if (!editor || editor.mode === "off") return null;

  const run = (publish: boolean) =>
    start(async () => {
      const payload = editor.getDirty();
      const res = await saveAction(payload, { publish });
      if (res.ok) {
        editor.markClean();
        if (publish) alert("Published. Public site updates within ~30 s.");
      } else {
        alert("Save failed: " + (res.error ?? "unknown error"));
      }
    });

  return (
    <div
      role="region"
      aria-label="Editor toolbar"
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 50,
        background: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "saturate(160%) blur(12px)",
        WebkitBackdropFilter: "saturate(160%) blur(12px)",
        borderTop: "1px solid rgb(var(--border, 226 222 215))",
        padding: "14px 22px",
        display: "flex",
        gap: 14,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Locale pill switcher */}
      <div
        role="radiogroup"
        aria-label="Locale"
        style={{
          display: "inline-flex",
          gap: 4,
          padding: 3,
          background: "rgb(var(--surface-2, 244 240 234))",
          borderRadius: 999,
          border: "1px solid rgb(var(--border, 226 222 215))",
        }}
      >
        {LOCALES.map((l) => {
          const active = editor.locale === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => editor.setLocale(l.code)}
              aria-pressed={active}
              title={l.name}
              style={{
                minHeight: 32,
                padding: "0 12px",
                borderRadius: 999,
                background: active
                  ? "rgb(var(--brand, 159 31 42))"
                  : "transparent",
                color: active ? "white" : "rgb(var(--ink-muted, 88 96 110))",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 12.5,
                letterSpacing: "0.02em",
                fontFamily: "inherit",
                transition: "background 160ms ease, color 160ms ease",
              }}
            >
              {l.short}
            </button>
          );
        })}
      </div>

      <div
        style={{
          fontSize: 12.5,
          color: editor.isDirty
            ? "rgb(var(--brand, 159 31 42))"
            : "rgb(var(--ink-faint, 138 145 158))",
          fontWeight: 600,
          marginLeft: 4,
        }}
      >
        {editor.isDirty ? "Unsaved changes" : "Saved"}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={editor.discard}
          disabled={pending || !editor.isDirty}
          style={btn("secondary", pending || !editor.isDirty)}
        >
          Discard
        </button>
        <button
          type="button"
          onClick={() => run(false)}
          disabled={pending || !editor.isDirty}
          style={btn("secondary", pending || !editor.isDirty)}
        >
          {pending ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => run(true)}
          disabled={pending}
          style={btn("primary", pending)}
        >
          {pending ? "Publishing…" : "Publish"}
        </button>
      </div>
    </div>
  );
}

function btn(variant: "primary" | "secondary", disabled?: boolean): React.CSSProperties {
  const isPrimary = variant === "primary";
  return {
    minHeight: 36,
    padding: "8px 18px",
    borderRadius: 10,
    border: isPrimary
      ? "1.5px solid rgb(var(--brand, 159 31 42))"
      : "1.5px solid rgb(var(--border-strong, 200 194 184))",
    background: isPrimary ? "rgb(var(--brand, 159 31 42))" : "white",
    color: isPrimary ? "white" : "rgb(var(--ink, 18 22 32))",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "inherit",
    transition: "transform 140ms ease, background 140ms ease",
  };
}
