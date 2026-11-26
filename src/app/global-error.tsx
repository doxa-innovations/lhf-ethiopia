"use client";

import { captureException } from "@doxa-innovations/watch/next/client";
import { useEffect } from "react";

// Replaces the root layout when it fails itself, so it renders its own <html> and <body>.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => captureException(error), [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            padding: "0 16px",
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Something went wrong</h1>
            <p style={{ marginTop: 12 }}>Please try again in a moment.</p>
            <button
              type="button"
              onClick={reset}
              style={{ marginTop: 24, padding: "8px 16px", cursor: "pointer" }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
