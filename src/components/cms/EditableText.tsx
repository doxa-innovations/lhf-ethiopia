"use client";

import type { CSSProperties } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor } from "./EditorProvider";
import { usePublishedElement } from "./PublishedElementsProvider";
import { useT } from "@/components/providers/LanguageProvider";

type Props = {
  elementId: string;
  defaultValue: string;
  multiline?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "li";
  placeholder?: string;
  maxLength?: number;
};

/**
 * Render a text node. In editor mode, the node is an <input> (or
 * auto-growing <textarea> when `multiline`) styled to look exactly like
 * the underlying heading/body — flat background, no border, focus ring
 * only on focus. On a public route (no <EditorProvider>), falls back to
 * a plain span that renders the value as-is.
 *
 * Pattern lifted from KLA Constructions
 * (`resources/js/Components/CmsComponent/*`).
 */
export function EditableText({
  elementId,
  defaultValue,
  multiline = false,
  className,
  style,
  as: As = "span",
  placeholder,
  maxLength,
}: Props) {
  const editor = useEditor();
  const { locale } = useT();
  const published = usePublishedElement(elementId, locale);

  if (!editor || editor.mode === "off") {
    return (
      <As className={className} style={style}>
        {published ?? defaultValue}
      </As>
    );
  }

  const value = editor.getValue(elementId, published ?? defaultValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    editor.setValue(elementId, e.target.value);

  // Inline single-line inputs use `field-sizing: content` so they grow to fit
  // their text — keeps headlines flowing inline instead of collapsing to a
  // 100% block. Multiline textareas keep width:100% because TextareaAutosize
  // already handles vertical sizing.
  const baseStyle: CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    font: "inherit",
    color: "inherit",
    letterSpacing: "inherit",
    textAlign: "inherit",
    boxSizing: "border-box",
    borderRadius: 4,
    transition: "box-shadow 140ms ease, background 140ms ease",
  };
  const textareaStyle: CSSProperties = {
    ...baseStyle,
    width: "100%",
    display: "block",
    ...style,
  };
  const inputStyle = {
    ...baseStyle,
    width: "auto",
    display: "inline-block",
    fieldSizing: "content",
    ...style,
  } as CSSProperties;

  const focusRingStyle = `
    .cms-edit-text:focus {
      box-shadow: 0 0 0 2px rgba(159, 31, 42, 0.32);
      background: rgba(247, 232, 232, 0.45) !important;
    }
    .cms-edit-text:hover:not(:focus) {
      box-shadow: 0 0 0 1px rgba(159, 31, 42, 0.18);
    }
  `;

  if (multiline) {
    // TextareaAutosize's Style type rejects unknown CSS keys (e.g. fieldSizing),
    // so spread through `as Record<string, unknown>`.
    return (
      <>
        <style>{focusRingStyle}</style>
        <TextareaAutosize
          data-element-id={elementId}
          className={`cms-edit-text ${className ?? ""}`}
          style={textareaStyle as never}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? defaultValue}
          maxLength={maxLength}
          minRows={1}
        />
      </>
    );
  }

  return (
    <>
      <style>{focusRingStyle}</style>
      <input
        type="text"
        data-element-id={elementId}
        className={`cms-edit-text ${className ?? ""}`}
        style={inputStyle}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? defaultValue}
        maxLength={maxLength}
      />
    </>
  );
}
