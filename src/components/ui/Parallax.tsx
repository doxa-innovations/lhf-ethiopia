"use client";

import {
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Direction = "y" | "x";

export function Parallax({
  children,
  speed = 0.3,
  direction = "y",
  className,
  style,
}: {
  children: ReactNode;
  speed?: number;
  direction?: Direction;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const distance = (window.innerHeight || 800) * speed;
      const fromVars: gsap.TweenVars = {};
      const toVars: gsap.TweenVars = {
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      };

      if (direction === "y") {
        fromVars.y = -distance / 2;
        toVars.y = distance / 2;
      } else {
        fromVars.x = -distance / 2;
        toVars.x = distance / 2;
      }

      gsap.fromTo(el, fromVars, toVars);
    },
    { scope: ref, dependencies: [speed, direction] },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
