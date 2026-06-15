"use client";

import NextImage, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "onError"> & {
  /** Label rendered in the gradient fallback when the remote image fails. */
  fallbackLabel?: string;
  wrapClassName?: string;
};

/**
 * next/image wrapper that degrades to a brand-tinted gradient placeholder if
 * the remote URL errors. Keeps the layout shipping even when a stock URL is
 * later swapped, removed, or rate-limited.
 */
export function SafeImage({
  fallbackLabel,
  wrapClassName,
  className,
  alt,
  ...rest
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn("photo-wrap", wrapClassName)}
        style={{
          display: "grid",
          placeItems: "center",
          color: "rgb(var(--brand-strong))",
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
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
