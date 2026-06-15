import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Right-to-left scrolling logo / label strip. Pure CSS (no motion deps).
 * Duplicates children so the loop seams correctly when -50% translation hits.
 */
export function MarqueeStrip({
  items,
  className,
  style,
}: {
  items: readonly string[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("marquee-mask", className)} style={style}>
      <div className="marquee-track">
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "rgb(var(--ink-faint))",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
