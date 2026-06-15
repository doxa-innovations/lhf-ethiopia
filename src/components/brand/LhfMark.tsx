import type { CSSProperties } from "react";

/**
 * Renders the official LHF Rose mark cropped from public/lhflogo.png.
 * The source PNG places the mark on the left of a wide canvas with empty
 * padding to the right; this component crops to just the mark using
 * background-image with `background-size: auto 100%` and
 * `background-position: left center`.
 */
export function LhfMark({
  size = 36,
  className,
  style,
  alt = "Lutheran Heritage Foundation",
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        backgroundImage: 'url("/lhflogo.png")',
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
