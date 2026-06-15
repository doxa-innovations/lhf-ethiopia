"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui";
import { LanguageSwitcher } from "@/components/providers/LanguageSwitcher";
import { useT } from "@/components/providers/LanguageProvider";
import { LuthersRose } from "@/components/brand/LuthersRose";

const NAV_KEYS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/publications", labelKey: "nav.publications" },
  { href: "/podcast", labelKey: "nav.podcast" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/events", labelKey: "nav.events" },
  { href: "/stories", labelKey: "nav.stories" },
  { href: "/news", labelKey: "nav.news" },
  { href: "/contact", labelKey: "nav.contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useT();

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
        top: scrolled ? 12 : 18,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "top 240ms ease",
        pointerEvents: "none",
      }}
    >
      <div
        className="container-wide"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          pointerEvents: "none",
        }}
      >
        <div
          className="nav-pill"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "8px 8px 8px 18px",
            width: "100%",
            maxWidth: 1180,
            pointerEvents: "auto",
            transition: "padding 240ms ease, box-shadow 240ms ease",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "rgb(var(--ink))",
              flexShrink: 0,
            }}
          >
            <motion.span
              aria-hidden
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <LuthersRose size={34} variant="full" />
            </motion.span>
            <span
              className="nav-wordmark"
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.02,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: 15,
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
                  marginTop: 1,
                }}
              >
                Lutheran Heritage Foundation
              </span>
            </span>
          </Link>

          <nav
            className="nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_KEYS.map((link) => {
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
                    padding: "8px 11px",
                    fontSize: 13,
                    fontWeight: 500,
                    color: active
                      ? "rgb(var(--ink))"
                      : "rgb(var(--ink-muted))",
                    borderRadius: 999,
                    transition: "color 180ms ease",
                  }}
                >
                  {t(link.labelKey as Parameters<typeof t>[0])}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: "absolute",
                        left: 11,
                        right: 11,
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
            style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}
          >
            <LanguageSwitcher variant="light" />
            <Button href="/donate" variant="teal" size="sm">
              {t("nav.donate")}
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
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              pointerEvents: "auto",
              margin: "10px 12px 0",
              borderRadius: 18,
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              border: "1px solid rgb(var(--border))",
              boxShadow: "var(--shadow-pill)",
            }}
          >
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                padding: 8,
              }}
            >
              {NAV_KEYS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: "12px 14px",
                      fontWeight: 500,
                      fontSize: 15,
                      color: active
                        ? "rgb(var(--brand))"
                        : "rgb(var(--ink))",
                      borderRadius: 10,
                    }}
                  >
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </Link>
                );
              })}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: 8,
                  marginTop: 4,
                  borderTop: "1px solid rgb(var(--border))",
                  alignItems: "center",
                }}
              >
                <LanguageSwitcher variant="light" />
                <Button
                  href="/donate"
                  variant="teal"
                  size="sm"
                  style={{ marginLeft: "auto" }}
                >
                  {t("nav.donate")}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1180px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (max-width: 540px) {
          .nav-wordmark > span:last-child { display: none; }
        }
      `}</style>
    </header>
  );
}
