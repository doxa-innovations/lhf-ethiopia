"use client";

import type { CSSProperties } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useEditor } from "./EditorProvider";

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

  if (!editor || editor.mode === "off") {
    return (
      <As className={className} style={style}>
        {defaultValue}
      </As>
    );
  }

  const value = editor.getValue(elementId, defaultValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    editor.setValue(elementId, e.target.value);

  const sharedStyle: CSSProperties = {
    background: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    font: "inherit",
    color: "inherit",
    letterSpacing: "inherit",
    textAlign: "inherit",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: 4,
    transition: "box-shadow 140ms ease, background 140ms ease",
    ...style,
  };

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
    return (
      <>
        <style>{focusRingStyle}</style>
        <TextareaAutosize
          data-element-id={elementId}
          className={`cms-edit-text ${className ?? ""}`}
          style={sharedStyle}
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
        style={sharedStyle}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? defaultValue}
        maxLength={maxLength}
      />
    </>
  );
}
