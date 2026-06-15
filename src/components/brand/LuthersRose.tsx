import type { CSSProperties } from "react";

/**
 * Luther's Rose — the historical Lutheran seal:
 *   White five-petalled rose, red heart at center, black cross on the heart,
 *   gold ring around the rose, blue sky (omitted in compact mode).
 *
 * Composed from primitive SVG shapes so it scales crisply at any size and
 * never depends on an external image.
 */
export function LuthersRose({
  size = 64,
  variant = "full",
  className,
  title = "Luther's Rose — the Lutheran seal",
  style,
}: {
  size?: number;
  variant?: "full" | "compact" | "mono-light" | "mono-dark";
  className?: string;
  title?: string;
  style?: CSSProperties;
}) {
  const isMono = variant === "mono-light" || variant === "mono-dark";
  const monoFg = variant === "mono-light" ? "#FFFFFF" : "#0E0E10";

  // Brand colors when in full mode, otherwise current/mono color.
  const goldRing = isMono ? "currentColor" : "#C49A38";
  const sky = isMono ? "transparent" : "#1E2A47";
  const rose = isMono ? monoFg : "#FFFFFF";
  const roseEdge = isMono ? "currentColor" : "#C9C2B0";
  const heart = isMono ? "currentColor" : "#9F1F2A";
  const cross = isMono ? monoFg : "#0E0E10";

  const showSky = variant === "full";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {showSky ? <circle cx="50" cy="50" r="49" fill={sky} /> : null}

      {/* Gold ring */}
      <circle
        cx="50"
        cy="50"
        r={showSky ? 44 : 47}
        fill="none"
        stroke={goldRing}
        strokeWidth={showSky ? 3 : 4}
      />

      {/* Five rose petals — circular arrangement, slightly elongated */}
      <g
        fill={rose}
        stroke={roseEdge}
        strokeWidth={variant === "compact" ? 1.2 : 1}
        strokeLinejoin="round"
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const cx = 50 + Math.cos(angle) * 22;
          const cy = 50 + Math.sin(angle) * 22;
          // Petal is an ellipse rotated to point outward from center.
          const rotateDeg = (i * 72 - 90) + 90;
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="13"
              ry="18"
              transform={`rotate(${rotateDeg} ${cx} ${cy})`}
            />
          );
        })}
      </g>

      {/* White center disc to clean petal overlap */}
      <circle cx="50" cy="50" r="17" fill={rose} stroke={roseEdge} strokeWidth="1" />

      {/* Red heart */}
      <path
        d="M50 62
           C 50 62, 36 53, 36 44
           C 36 39, 40 35, 44 35
           C 47 35, 49 37, 50 39
           C 51 37, 53 35, 56 35
           C 60 35, 64 39, 64 44
           C 64 53, 50 62, 50 62 Z"
        fill={heart}
      />

      {/* Black cross inside the heart */}
      <g fill={cross}>
        <rect x="48.5" y="38" width="3" height="14" rx="0.5" />
        <rect x="44" y="43.5" width="12" height="3" rx="0.5" />
      </g>
    </svg>
  );
}
