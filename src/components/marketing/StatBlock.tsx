type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint?: string;
};

const formatNumber = (n: number) =>
  n.toLocaleString("en-US");

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
            className="font-display"
            style={{
              fontSize: "clamp(28px, 3.2vw, 40px)",
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.018em",
              color: isDark ? "white" : "rgb(var(--ink))",
            }}
          >
            {s.prefix ?? ""}
            {formatNumber(s.value)}
            {s.suffix ?? ""}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: isDark ? "rgb(var(--teal-soft))" : "rgb(var(--brand))",
            }}
          >
            {s.label}
          </div>
          {s.hint ? (
            <div
              style={{
                marginTop: 4,
                fontSize: 12.5,
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
