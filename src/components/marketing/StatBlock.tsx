"use client";

import { Counter } from "@/components/ui/Counter";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint?: string;
};

export function StatBlock({
  stats,
  tone = "dark",
}: {
  stats: Stat[];
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, minmax(0, 1fr))`,
        gap: 28,
      }}
      className="stat-block"
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div
            style={{
              fontSize: "clamp(34px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: isDark ? "white" : "rgb(var(--ink))",
            }}
          >
            <Counter
              to={s.value}
              prefix={s.prefix}
              suffix={s.suffix ?? ""}
            />
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isDark ? "rgb(var(--brand) / 1)" : "rgb(var(--brand))",
            }}
          >
            {s.label}
          </div>
          {s.hint ? (
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                color: isDark ? "rgba(255,255,255,0.6)" : "rgb(var(--ink-faint))",
              }}
            >
              {s.hint}
            </div>
          ) : null}
        </div>
      ))}
      <style>{`
        @media (max-width: 768px) {
          .stat-block { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
}
