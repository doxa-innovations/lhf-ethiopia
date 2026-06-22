"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[editor error]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        fontFamily: "var(--font-inter, system-ui)",
      }}
    >
      <div
        style={{
          maxWidth: 540,
          background: "white",
          border: "1px solid rgb(var(--border, 226 222 215))",
          borderRadius: 16,
          padding: 28,
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgb(var(--brand, 159 31 42))",
          }}
        >
          Editor crashed
        </span>
        <h1
          style={{
            fontFamily: "var(--font-garamond)",
            fontSize: 26,
            fontWeight: 500,
            color: "rgb(var(--ink, 18 22 32))",
            marginTop: 8,
          }}
        >
          The editor for this page failed to render.
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "rgb(var(--ink-muted, 88 96 110))",
            marginTop: 6,
          }}
        >
          Reload the editor to retry, or jump back to the dashboard. The
          public site is unaffected.
        </p>
        <div
          style={{
            marginTop: 18,
            display: "inline-flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              background: "rgb(var(--brand, 159 31 42))",
              color: "white",
              border: "none",
              fontWeight: 600,
              fontSize: 13.5,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/admin"
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              background: "white",
              color: "rgb(var(--ink, 18 22 32))",
              border: "1.5px solid rgb(var(--border-strong, 200 194 184))",
              fontWeight: 600,
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
