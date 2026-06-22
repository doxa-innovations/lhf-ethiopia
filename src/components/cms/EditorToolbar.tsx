"use client";

import { useEffect, useTransition } from "react";
import { useEditor } from "./EditorProvider";
import { useToast } from "./Toast";
import { useConfirm } from "./ConfirmDialog";
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
  const toast = useToast();
  const confirm = useConfirm();
  const [pending, start] = useTransition();

  const run = (publish: boolean) => {
    if (!editor) return;
    start(async () => {
      const payload = editor.getDirty();
      if (Object.keys(payload).length === 0) {
        toast.push("Nothing to save.");
        return;
      }
      const res = await saveAction(payload, { publish });
      if (res.ok) {
        editor.markClean();
        toast.success(
          publish
            ? "Published. Public site updates on the next visit."
            : "Draft saved.",
        );
      } else {
        toast.error("Save failed: " + (res.error ?? "unknown error"));
      }
    });
  };

  const onDiscard = async () => {
    if (!editor) return;
    if (!editor.isDirty) return;
    const ok = await confirm({
      title: "Discard unsaved changes?",
      body: "All edits on this page across every locale will be reverted.",
      confirmLabel: "Discard",
      cancelLabel: "Keep editing",
      destructive: true,
    });
    if (ok) {
      editor.discard();
      toast.push("Changes discarded.");
    }
  };

  // Cmd/Ctrl+S → Save draft; Cmd/Ctrl+Shift+S → Publish; Esc blurs.
  useEffect(() => {
    if (!editor || editor.mode === "off") return;
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "s") {
        e.preventDefault();
        run(e.shiftKey);
      } else if (e.key === "Escape") {
        const active = document.activeElement as HTMLElement | null;
        if (active?.classList.contains("cms-edit-text")) active.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.mode, editor?.isDirty]);

  if (!editor || editor.mode === "off") return null;

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
          const localeDirty = editor.dirtyByLocale[l.code] > 0;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => editor.setLocale(l.code)}
              aria-pressed={active}
              title={
                localeDirty
                  ? `${l.name} — ${editor.dirtyByLocale[l.code]} unsaved`
                  : l.name
              }
              style={{
                position: "relative",
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
              {localeDirty ? (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: active
                      ? "white"
                      : "rgb(var(--brand, 159 31 42))",
                  }}
                />
              ) : null}
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

      <div
        style={{
          fontSize: 11.5,
          color: "rgb(var(--ink-faint, 138 145 158))",
          fontWeight: 500,
          display: "none",
        }}
        className="cms-toolbar-hint"
      >
        ⌘S draft · ⌘⇧S publish · Esc blur
      </div>
      <style>{`
        @media (min-width: 960px) { .cms-toolbar-hint { display: inline !important; } }
      `}</style>

      <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={onDiscard}
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
          title="Save without publishing — public site unchanged (⌘S)"
        >
          {pending ? "Saving…" : "Save draft"}
        </button>
        <button
          type="button"
          onClick={() => run(true)}
          disabled={pending}
          style={btn("primary", pending)}
          title="Publish — visible on the public site (⌘⇧S)"
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
