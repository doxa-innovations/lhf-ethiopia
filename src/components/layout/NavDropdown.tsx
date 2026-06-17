"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/components/providers/LanguageProvider";

type Item = {
  href: string;
  labelKey: string;
  descKey: string;
};

export function NavDropdown({
  labelKey,
  fallbackHref,
  items,
}: {
  labelKey: string;
  fallbackHref: string;
  items: readonly Item[];
}) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Active when any child route matches
  const active = items.some(
    (i) => pathname === i.href || pathname?.startsWith(i.href.split("#")[0]),
  );

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Close on route change
  useEffect(() => setOpen(false), [pathname]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      style={{ position: "relative" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          position: "relative",
          padding: "9px 11px",
          fontSize: 13,
          fontWeight: 500,
          color: active ? "rgb(var(--ink))" : "rgb(var(--ink-muted))",
          borderRadius: 8,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          transition: "color 180ms ease",
        }}
      >
        {t(labelKey as Parameters<typeof t>[0])}
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
        />
        {active ? (
          <span
            style={{
              position: "absolute",
              left: 11,
              right: 18,
              bottom: 3,
              height: 1.5,
              borderRadius: 999,
              background: "rgb(var(--brand))",
            }}
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              minWidth: 280,
              background: "white",
              borderRadius: 14,
              border: "1px solid rgb(var(--border))",
              boxShadow: "0 16px 40px -10px rgba(8, 12, 22, 0.22)",
              padding: 8,
              zIndex: 60,
            }}
          >
            {items.map((item) => {
              const itemActive =
                pathname === item.href ||
                pathname === item.href.split("#")[0];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: itemActive
                      ? "rgb(var(--brand-muted))"
                      : "transparent",
                    transition: "background 140ms ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: itemActive ? "rgb(var(--brand))" : "rgb(var(--ink))",
                    }}
                  >
                    {t(item.labelKey as Parameters<typeof t>[0])}
                  </span>
                  <span
                    style={{
                      fontSize: 12.5,
                      color: "rgb(var(--ink-faint))",
                      lineHeight: 1.4,
                    }}
                  >
                    {t(item.descKey as Parameters<typeof t>[0])}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
