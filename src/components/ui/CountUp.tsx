"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: CSSProperties;
  formatter?: (n: number) => string;
};

const defaultFormatter = (n: number, decimals: number) => {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
};

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
  className,
  style,
  formatter,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${formatter ? formatter(value) : defaultFormatter(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = finalText;
      return;
    }

    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        if (!el.isConnected) return;
        const formatted = formatter ? formatter(obj.n) : defaultFormatter(obj.n, decimals);
        el.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, prefix, suffix, duration, decimals]);

  return (
    <span ref={ref} className={className} style={style}>
      {finalText}
    </span>
  );
}
