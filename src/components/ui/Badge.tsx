import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "ink"
  | "navy"
  | "teal"
  | "gold"
  | "green"
  | "cream"
  | "outline"
  | "glass";

const tones: Record<Tone, string> = {
  brand: "",
  ink: "badge-ink",
  navy: "badge-navy",
  teal: "badge-teal",
  gold: "badge-gold",
  green: "badge-green",
  cream: "badge-cream",
  outline: "badge-outline",
  glass: "badge-glass",
};

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={cn("badge", tones[tone], className)}>{children}</span>;
}
