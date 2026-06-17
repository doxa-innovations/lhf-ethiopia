"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onError" | "src"> & {
  /** Remote URL. If empty/missing, render the fallback placeholder. */
  src?: ImageProps["src"] | "";
  /** Label rendered in the gradient fallback when the remote image fails. */
  fallbackLabel?: string;
  wrapClassName?: string;
};

/**
 * next/image wrapper that degrades to a brand-tinted placeholder when:
 *  - `src` is missing or empty (next/image throws on empty string), OR
 *  - the remote URL errors at fetch time.
 * Keeps the layout shipping even when a stock URL is later swapped or removed.
 */
export function SafeImage({
  fallbackLabel,
  wrapClassName,
  className,
  alt,
  src,
  ...rest
}: Props) {
  const [errored, setErrored] = useState(false);
  // Treat empty string and falsy src the same as an errored image.
  const hasSrc = typeof src === "string" ? src.length > 0 : Boolean(src);

  if (!hasSrc || errored) {
    return (
      <div
        className={cn("photo-wrap", wrapClassName)}
        style={{
          display: "grid",
          placeItems: "center",
          color: "rgb(var(--brand-strong))",
          background:
            "linear-gradient(135deg, rgb(var(--brand-muted)) 0%, rgb(var(--surface-2)) 100%)",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textAlign: "center",
          padding: 16,
          ...((rest as { style?: React.CSSProperties }).style ?? {}),
        }}
        aria-label={alt}
      >
        {fallbackLabel ?? "Photo"}
      </div>
    );
  }

  return (
    <NextImage
      alt={alt}
      className={className}
      src={src as ImageProps["src"]}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
