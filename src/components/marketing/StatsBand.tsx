"use client";

import { BookOpen, Globe2, Headphones, Users } from "lucide-react";
import { useT } from "@/components/providers/LanguageProvider";
import { CountUp, Parallax } from "@/components/ui";

/* ============================================================
   StatsBand — horizontal navy panel with a subtle dot texture,
   divided into icon-circle stat cells. Pure SVG texture, no
   image load.
   ============================================================ */
export function StatsBand() {
  const { t } = useT();

  const STATS: Array<{
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
  }> = [
    {
      icon: <Globe2 size={20} />,
      value: 6,
      suffix: "+",
      label: t("home.statLanguages"),
    },
    {
      icon: <BookOpen size={20} />,
      value: 42300,
      suffix: "+",
      label: t("home.statBooks"),
    },
    {
      icon: <Users size={20} />,
      value: 180,
      suffix: "+",
      label: t("home.statCongregations"),
    },
    {
      icon: <Headphones size={20} />,
      value: 14,
      suffix: "",
      label: t("home.statEpisodes"),
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        background: "rgb(var(--navy-strong))",
        color: "white",
        paddingTop: 36,
        paddingBottom: 36,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Texture: SVG dot grid, masked to fade at edges, drifting on scroll */}
      <Parallax speed={0.18} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <svg
          aria-hidden
          viewBox="0 0 1200 240"
          preserveAspectRatio="xMidYMid slice"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <pattern id="dotgrid" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.10)" />
            </pattern>
            <radialGradient id="dotfade" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="dotmask">
              <rect width="1200" height="240" fill="url(#dotfade)" />
            </mask>
          </defs>
          <rect width="1200" height="240" fill="url(#dotgrid)" mask="url(#dotmask)" />
        </svg>
      </Parallax>

      <div
        className="container-wide"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="stats-band-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="stats-band-cell"
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "none",
              }}
            >
              <div className="stats-band-cell-inner">
                <span aria-hidden className="stats-band-icon">
                  <span aria-hidden className="stats-band-icon-ring" />
                  <span className="stats-band-icon-glyph">{s.icon}</span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <span
                    className="font-display stats-band-value"
                    style={{
                      fontSize: "clamp(28px, 4vw, 40px)",
                      fontWeight: 500,
                      color: "white",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    <CountUp value={s.value} suffix={s.suffix} />
                  </span>
                  <span
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-band-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }
        .stats-band-cell {
          padding: 14px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }
        .stats-band-cell:nth-child(2n) { border-right: none !important; }
        .stats-band-cell:nth-last-child(-n+2) { border-bottom: none; }
        .stats-band-cell-inner {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }
        .stats-band-icon {
          position: relative;
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        .stats-band-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .stats-band-icon-glyph {
          position: relative;
          color: rgb(var(--teal-soft));
          display: grid;
          place-items: center;
        }

        @media (min-width: 768px) {
          .stats-band-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .stats-band-cell {
            padding: 8px 22px;
            border-right: 1px solid rgba(255,255,255,0.10);
            border-bottom: none;
          }
          .stats-band-cell:last-child { border-right: none; }
          .stats-band-icon { width: 56px; height: 56px; }
        }
      `}</style>
    </section>
  );
}
