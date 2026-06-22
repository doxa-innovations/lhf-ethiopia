"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin error]", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "44px 36px",
        maxWidth: 640,
        fontFamily: "var(--font-inter, system-ui)",
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
        Something went wrong
      </span>
      <h1
        style={{
          fontFamily: "var(--font-garamond)",
          fontSize: 30,
          fontWeight: 500,
          color: "rgb(var(--ink, 18 22 32))",
          marginTop: 10,
        }}
      >
        The admin hit an error.
      </h1>
      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "rgb(var(--ink-muted, 88 96 110))",
          marginTop: 4,
        }}
      >
        Your unsaved edits in memory may have been lost.{" "}
        {error.digest ? (
          <>
            Reference: <code>{error.digest}</code>.{" "}
          </>
        ) : null}
        Try the action again, or sign out and back in if it keeps failing.
      </p>
      <pre
        style={{
          fontSize: 12,
          color: "rgb(var(--ink-faint, 138 145 158))",
          background: "white",
          padding: 14,
          borderRadius: 10,
          border: "1px solid rgb(var(--border, 226 222 215))",
          marginTop: 18,
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        {error.message}
      </pre>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: 18,
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
    </div>
  );
}
