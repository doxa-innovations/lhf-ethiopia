import type { CSSProperties } from "react";

/**
 * Hero backdrop — pure inline SVG, no image load.
 *
 * Composition (back to front):
 *   1. 44px blueprint grid with a radial fade-out at the edges
 *   2. A simplified Ethiopia map outline drawn in faint crimson lines,
 *      with "congregation" dots scattered across its surface
 *   3. Luther's Rose drawn as a watermark in the lower-left corner
 *   4. A thin survey-line and a few accent dots on the open field
 *
 * The Ethiopia outline is a hand-traced 8-point approximation — it reads
 * as the country at a glance without claiming cartographic accuracy.
 */
export function HeroBackdrop({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <pattern
            id="lhf-grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 44 0 L 0 0 L 0 44"
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="1"
            />
          </pattern>

          {/* Luther's Rose — composed of primitives so it scales crisply.
              Colour washed to a soft monochrome for use as a watermark. */}
          <symbol id="luthers-rose" viewBox="0 0 100 100">
            <g
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            >
              {/* Gold ring */}
              <circle cx="50" cy="50" r="46" />
              {/* Five rose petals */}
              <g>
                <ellipse cx="50" cy="27" rx="11" ry="16" transform="rotate(0 50 27)" />
                <ellipse cx="72" cy="42" rx="11" ry="16" transform="rotate(72 72 42)" />
                <ellipse cx="63" cy="67" rx="11" ry="16" transform="rotate(144 63 67)" />
                <ellipse cx="37" cy="67" rx="11" ry="16" transform="rotate(216 37 67)" />
                <ellipse cx="28" cy="42" rx="11" ry="16" transform="rotate(288 28 42)" />
              </g>
              {/* Center disc */}
              <circle cx="50" cy="50" r="15" />
              {/* Heart */}
              <path d="M50 62 C 50 62, 37 53, 37 45 C 37 40, 41 36, 45 36 C 47 36, 49 38, 50 40 C 51 38, 53 36, 55 36 C 59 36, 63 40, 63 45 C 63 53, 50 62, 50 62 Z" />
              {/* Cross inside the heart */}
              <line x1="50" y1="38" x2="50" y2="52" />
              <line x1="44" y1="45" x2="56" y2="45" />
            </g>
          </symbol>

          <radialGradient id="grid-fade" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="0.65" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="1440" height="900" fill="url(#grid-fade)" />
          </mask>
        </defs>

        {/* Layer 1 — blueprint grid */}
        <rect width="1440" height="900" fill="url(#lhf-grid)" mask="url(#grid-mask)" />

        {/* Layer 2 — Ethiopia map outline (simplified, 13 anchor points).
            Anchored to the right side of the hero so the wordmark on the
            left has open space. */}
        <g transform="translate(820, 130)">
          <path
            d="
              M 60,40
              L 200,30
              L 320,80
              L 410,170
              L 470,260
              L 420,360
              L 320,430
              L 200,460
              L 90,420
              L 30,330
              L 0,220
              L 10,130
              Z
            "
            fill="rgba(159, 31, 42, 0.06)"
            stroke="rgba(196, 86, 92, 0.55)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Inner "highlands" line — a softer interior contour */}
          <path
            d="
              M 110,90
              L 250,80
              L 340,150
              L 380,240
              L 320,330
              L 220,380
              L 120,340
              L 70,240
              Z
            "
            fill="none"
            stroke="rgba(196, 86, 92, 0.28)"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
          {/* Congregation dots scattered across Ethiopia */}
          <g fill="rgba(102, 178, 178, 0.85)">
            <circle cx="210" cy="120" r="3" />
            <circle cx="290" cy="170" r="3" />
            <circle cx="170" cy="190" r="2.5" />
            <circle cx="250" cy="230" r="3.5" />
            <circle cx="340" cy="220" r="2.5" />
            <circle cx="200" cy="280" r="3" />
            <circle cx="290" cy="310" r="2.5" />
            <circle cx="120" cy="260" r="2.5" />
            <circle cx="370" cy="290" r="2" />
          </g>
          {/* Capital marker (Addis Ababa-ish) */}
          <g>
            <circle cx="240" cy="250" r="6" fill="rgba(255, 255, 255, 0.18)" />
            <circle cx="240" cy="250" r="3.5" fill="rgb(255, 255, 255)" />
          </g>
        </g>

        {/* Layer 3 — Luther's Rose watermark, lower-left */}
        <g transform="translate(80, 540)" opacity="0.55">
          <use href="#luthers-rose" width="220" height="220" />
        </g>
        {/* Small second rose, mid-right edge */}
        <g transform="translate(1280, 720)" opacity="0.32">
          <use href="#luthers-rose" width="120" height="120" />
        </g>

        {/* Layer 4 — survey baseline + a few accent dots in open field */}
        <line
          x1="0"
          y1="640"
          x2="1440"
          y2="580"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <g fill="rgba(196, 86, 92, 0.5)">
          <circle cx="320" cy="320" r="2.5" />
          <circle cx="480" cy="700" r="2" />
          <circle cx="640" cy="180" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
