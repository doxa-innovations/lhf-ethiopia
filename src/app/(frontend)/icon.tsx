import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#9F1F2A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* gold ring */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="#C49A38" strokeWidth="3" />
          {/* petals */}
          <g fill="#FFFFFF" stroke="#C9C2B0" strokeWidth="1">
            <ellipse cx="50" cy="28" rx="13" ry="18" transform="rotate(0 50 28)" />
            <ellipse cx="71" cy="43" rx="13" ry="18" transform="rotate(72 71 43)" />
            <ellipse cx="63" cy="68" rx="13" ry="18" transform="rotate(144 63 68)" />
            <ellipse cx="37" cy="68" rx="13" ry="18" transform="rotate(216 37 68)" />
            <ellipse cx="29" cy="43" rx="13" ry="18" transform="rotate(288 29 43)" />
          </g>
          {/* center disc */}
          <circle cx="50" cy="50" r="17" fill="#FFFFFF" stroke="#C9C2B0" strokeWidth="1" />
          {/* heart */}
          <path
            d="M50 62 C 50 62, 36 53, 36 44 C 36 39, 40 35, 44 35 C 47 35, 49 37, 50 39 C 51 37, 53 35, 56 35 C 60 35, 64 39, 64 44 C 64 53, 50 62, 50 62 Z"
            fill="#9F1F2A"
          />
          {/* cross */}
          <rect x="48.5" y="38" width="3" height="14" fill="#0E0E10" />
          <rect x="44" y="43.5" width="12" height="3" fill="#0E0E10" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
