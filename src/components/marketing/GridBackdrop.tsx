import { cn } from "@/lib/utils";

/**
 * Faint blueprint-grid background. Lines are drawn with a tiled background
 * pattern (functional CSS technique, no decorative gradients).
 */
export function GridBackdrop({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const lineColor =
    tone === "dark" ? "rgba(255,255,255,0.05)" : "rgb(var(--border) / 0.6)";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px),
                            linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}
