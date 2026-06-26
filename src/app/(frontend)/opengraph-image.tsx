import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "LHF Ethiopia — The Gospel, in every heart language of Ethiopia.";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #9F1F2A 0%, #7F1821 55%, #5C0F18 100%)",
          color: "#F8F6F2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Luther's Rose */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#C49A38" strokeWidth="3" />
            <g fill="#FFFFFF" stroke="#C9C2B0" strokeWidth="1">
              <ellipse cx="50" cy="28" rx="13" ry="18" transform="rotate(0 50 28)" />
              <ellipse cx="71" cy="43" rx="13" ry="18" transform="rotate(72 71 43)" />
              <ellipse cx="63" cy="68" rx="13" ry="18" transform="rotate(144 63 68)" />
              <ellipse cx="37" cy="68" rx="13" ry="18" transform="rotate(216 37 68)" />
              <ellipse cx="29" cy="43" rx="13" ry="18" transform="rotate(288 29 43)" />
            </g>
            <circle cx="50" cy="50" r="17" fill="#FFFFFF" stroke="#C9C2B0" strokeWidth="1" />
            <path
              d="M50 62 C 50 62, 36 53, 36 44 C 36 39, 40 35, 44 35 C 47 35, 49 37, 50 39 C 51 37, 53 35, 56 35 C 60 35, 64 39, 64 44 C 64 53, 50 62, 50 62 Z"
              fill="#9F1F2A"
            />
            <rect x="48.5" y="38" width="3" height="14" fill="#0E0E10" />
            <rect x="44" y="43.5" width="12" height="3" fill="#0E0E10" />
          </svg>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: -0.5,
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span>Lutheran Heritage Foundation</span>
            <span style={{ color: "#E6C76B", fontStyle: "italic" }}>Ethiopia</span>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            The Gospel, in every heart language of Ethiopia.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(248, 246, 242, 0.78)",
              fontFamily: "sans-serif",
              letterSpacing: 0.2,
            }}
          >
            Amharic · Afaan Oromoo · Tigrinya · Somali · Sidaamu Afoo · Wolayttattuwaa
          </div>
        </div>

        {/* Footer band */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "rgba(248, 246, 242, 0.7)",
            letterSpacing: 0.4,
          }}
        >
          <span>lhfethiopia.org</span>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 36, height: 8, background: "#0F8A4C" }} />
            <span style={{ width: 36, height: 8, background: "#E6A817" }} />
            <span style={{ width: 36, height: 8, background: "#9F1F2A", border: "1px solid rgba(248, 246, 242, 0.4)" }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
