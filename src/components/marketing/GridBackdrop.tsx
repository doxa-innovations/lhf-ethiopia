import { cn } from "@/lib/utils";

/**
 * Faint blueprint grid + soft brand spotlight behind heroes and section bands.
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
  const spotColor =
    tone === "dark"
      ? "rgba(200, 49, 42, 0.20)"
      : "rgb(var(--brand) / 0.08)";

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
          opacity: 0.7,
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px),
                            linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${spotColor}, transparent 70%)`,
        }}
      />
    </div>
  );
}
