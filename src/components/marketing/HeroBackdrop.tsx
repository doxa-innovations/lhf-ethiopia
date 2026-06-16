import type { CSSProperties } from "react";

/**
 * Aesthetic geometric backdrop for the hero — pure SVG, no image load.
 *
 * Composition (back to front):
 *   1. Subtle blueprint grid lines (44px)
 *   2. Concentric "contour" rings radiating from upper-right (Addis Ababa
 *      figuratively at the centre, the Gospel rippling outward)
 *   3. A faint Ethiopian-cross watermark in the lower-left corner
 *   4. Small distribution dots scattered across, lit on the brand accent
 *
 * Sits inside a section with a solid navy background; the backdrop only
 * draws the geometry on top.
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
          {/* Square blueprint grid */}
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

          {/* Inset for the cross — anchor in lower-left */}
          <symbol id="ethiopian-cross" viewBox="0 0 100 100">
            {/*
              Stylised Ethiopian Orthodox cross — interlaced bars suggesting
              the lattice form. Rendered as outline only so it reads as a
              traditional motif without dominating the composition.
            */}
            <g
              fill="none"
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="1.4"
              strokeLinejoin="miter"
            >
              <rect x="48" y="14" width="4" height="72" />
              <rect x="14" y="48" width="72" height="4" />
              <rect x="36" y="26" width="28" height="48" />
              <rect x="26" y="36" width="48" height="28" />
              <line x1="22" y1="22" x2="78" y2="78" />
              <line x1="78" y1="22" x2="22" y2="78" />
              <circle cx="50" cy="50" r="6" />
              <circle cx="50" cy="50" r="12" />
            </g>
          </symbol>
        </defs>

        {/* Mask the grid so it fades to the edges (no hard square boundary) */}
        <mask id="grid-mask">
          <radialGradient id="grid-fade" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="75%" stopColor="white" stopOpacity="0.65" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="1440" height="900" fill="url(#grid-fade)" />
        </mask>

        <rect width="1440" height="900" fill="url(#lhf-grid)" mask="url(#grid-mask)" />

        {/* Concentric contour rings — anchored upper-right
             Suggests the Gospel rippling outward. Drawn as thin strokes
             only — no fills, no gradient shading. */}
        <g
          fill="none"
          stroke="rgba(196, 86, 92, 0.18)"
          strokeWidth="1.2"
        >
          <circle cx="1180" cy="180" r="100" />
          <circle cx="1180" cy="180" r="170" />
          <circle cx="1180" cy="180" r="260" />
          <circle cx="1180" cy="180" r="360" />
          <circle cx="1180" cy="180" r="470" />
          <circle cx="1180" cy="180" r="590" />
          <circle cx="1180" cy="180" r="720" />
        </g>

        {/* Small accent ring layer in teal — fewer rings, more spaced */}
        <g
          fill="none"
          stroke="rgba(102, 178, 178, 0.16)"
          strokeWidth="0.8"
        >
          <circle cx="1180" cy="180" r="220" />
          <circle cx="1180" cy="180" r="420" />
          <circle cx="1180" cy="180" r="650" />
        </g>

        {/* Distribution dots — scattered "congregations" across the field.
             Coords are hand-placed to feel like a real map, not a grid. */}
        <g fill="rgba(196, 86, 92, 0.55)">
          <circle cx="220" cy="280" r="3" />
          <circle cx="360" cy="540" r="2.5" />
          <circle cx="540" cy="320" r="3.5" />
          <circle cx="640" cy="700" r="2.5" />
          <circle cx="820" cy="240" r="3" />
          <circle cx="980" cy="620" r="2.5" />
          <circle cx="180" cy="720" r="3" />
          <circle cx="1080" cy="430" r="2.5" />
          <circle cx="460" cy="780" r="2" />
          <circle cx="760" cy="500" r="2" />
        </g>

        {/* A few brighter accent dots */}
        <g fill="rgba(102, 178, 178, 0.7)">
          <circle cx="420" cy="420" r="2.5" />
          <circle cx="900" cy="380" r="2.5" />
          <circle cx="280" cy="500" r="2" />
        </g>

        {/* Ethiopian cross watermark — lower left */}
        <use
          href="#ethiopian-cross"
          x="60"
          y="540"
          width="220"
          height="220"
        />

        {/* A second, smaller cross watermark upper-left */}
        <use
          href="#ethiopian-cross"
          x="1180"
          y="640"
          width="160"
          height="160"
          opacity="0.55"
        />

        {/* Thin guide line crossing the field — like a survey baseline */}
        <line
          x1="0"
          y1="600"
          x2="1440"
          y2="540"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <line
          x1="0"
          y1="640"
          x2="1440"
          y2="580"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      </svg>
    </div>
  );
}
