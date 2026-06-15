"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition:
          "background 240ms ease, border-color 240ms ease, box-shadow 240ms ease",
        background: scrolled
          ? "rgba(255, 255, 255, 0.78)"
          : "rgba(255, 255, 255, 0.45)",
        backdropFilter: "saturate(160%) blur(18px)",
        WebkitBackdropFilter: "saturate(160%) blur(18px)",
        borderBottom: `1px solid ${scrolled ? "rgb(var(--border))" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 0 rgb(var(--border))" : "none",
      }}
    >
      <div
        className="container-wide"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 56 : 64,
          gap: 12,
          transition: "height 240ms ease",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "rgb(var(--ink))",
          }}
        >
          <motion.span
            aria-hidden
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "rgb(var(--brand))",
              color: "white",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontSize: 12,
              boxShadow: "var(--shadow-brand)",
              fontFamily: "var(--font-display)",
            }}
          >
            LHF
          </motion.span>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.02,
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: "rgb(var(--navy))",
              }}
            >
              LHF Ethiopia
            </span>
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgb(var(--ink-faint))",
                marginTop: 2,
              }}
            >
              Lutheran Heritage Foundation
            </span>
          </span>
        </Link>

        <nav
          className="nav-desktop"
          style={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  padding: "8px 12px",
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: active ? "rgb(var(--ink))" : "rgb(var(--ink-muted))",
                  borderRadius: 6,
                  transition: "color 180ms ease",
                }}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      left: 12,
                      right: 12,
                      bottom: 2,
                      height: 1.5,
                      borderRadius: 999,
                      background: "rgb(var(--brand))",
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div
          className="nav-cta"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          <Button href="/donate" variant="teal" size="sm">
            Donate
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="nav-burger"
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "rgb(var(--ink))",
            padding: 6,
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: "hidden",
              borderTop: "1px solid rgb(var(--border))",
              background: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            <nav
              className="container-wide"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                padding: "10px 16px 20px",
              }}
            >
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: "12px 8px",
                      fontWeight: 500,
                      fontSize: 15,
                      color: active
                        ? "rgb(var(--brand))"
                        : "rgb(var(--ink))",
                      borderBottom: "1px solid rgb(var(--border) / 0.6)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                href="/donate"
                variant="teal"
                style={{ marginTop: 14 }}
              >
                Donate to {SITE.name}
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1100px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
