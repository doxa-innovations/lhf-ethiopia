"use client";

import { useState, type CSSProperties } from "react";
import { useEditor } from "./EditorProvider";

type Props = {
  elementId: string;
  defaultImageUrl?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Width/height hint for next/image-style layout, optional. */
  width?: number;
  height?: number;
};

/**
 * In editor mode: image with hover-upload affordance. Clicking it opens a
 * file picker; on choose, the file is POSTed to /api/admin/upload which
 * returns an R2 URL and writes the value back to the editor context.
 * In public mode: just renders an <img>.
 */
export function EditableImage({
  elementId,
  defaultImageUrl,
  alt,
  className,
  style,
  width,
  height,
}: Props) {
  const editor = useEditor();
  const [uploading, setUploading] = useState(false);

  const url = editor?.getImageUrl(elementId, defaultImageUrl) ?? defaultImageUrl;

  if (!editor || editor.mode === "off") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url || ""}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
      />
    );
  }

  const onPick = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("elementId", elementId);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("upload failed");
      const { url: newUrl } = (await res.json()) as { url: string };
      // Preserve the current text content of this element_id if any.
      editor.setValue(elementId, editor.getValue(elementId, ""), newUrl);
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        ...style,
      }}
      className={className}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url || ""}
        alt={alt}
        width={width}
        height={height}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: uploading
            ? "rgba(159, 31, 42, 0.72)"
            : "rgba(159, 31, 42, 0)",
          color: "white",
          display: "grid",
          placeItems: "center",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          transition: "background 160ms ease",
          borderRadius: "inherit",
        }}
        className="cms-edit-image-overlay"
      >
        {uploading ? "Uploading…" : "Replace photo"}
      </span>
      <style>{`
        label:hover .cms-edit-image-overlay {
          background: rgba(159, 31, 42, 0.55) !important;
        }
      `}</style>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />
    </label>
  );
}
