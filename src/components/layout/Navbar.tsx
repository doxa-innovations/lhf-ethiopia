"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui";
import { LanguageSwitcher } from "@/components/providers/LanguageSwitcher";
import { useT } from "@/components/providers/LanguageProvider";
import { LhfMark } from "@/components/brand/LhfMark";

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
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="site-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(255, 255, 255, 0.78)",
        backdropFilter: "saturate(160%) blur(16px)",
        WebkitBackdropFilter: "saturate(160%) blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgb(var(--border))"
          : "1px solid transparent",
        transition: "background 240ms ease, border-color 240ms ease",
      }}
    >
      <div
        className="container-wide nav-shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? 60 : 68,
          gap: 12,
          transition: "height 240ms ease",
          minWidth: 0,
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
            minWidth: 0,
          }}
        >
          <motion.span
            aria-hidden
            initial={{ rotate: 0 }}
            whileHover={{ rotate: -5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "grid", placeItems: "center", flexShrink: 0 }}
          >
            <LhfMark size={32} />
          </motion.span>
          <span
            className="nav-wordmark"
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.04,
              minWidth: 0,
            }}
          >
            <span
              className="font-display nav-wordmark-main"
              style={{
                fontSize: 15.5,
                fontWeight: 600,
                letterSpacing: "0.005em",
                color: "rgb(var(--navy))",
                whiteSpace: "nowrap",
              }}
            >
              LHF Ethiopia
            </span>
            <span
              className="nav-wordmark-sub"
              style={{
                fontSize: 9.5,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgb(var(--ink-faint))",
                marginTop: 1,
                whiteSpace: "nowrap",
              }}
            >
              Lutheran Heritage Foundation
            </span>
          </span>
        </Link>

        <nav
          className="nav-desktop"
          style={{
            display: "none",
            alignItems: "center",
            gap: 0,
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
                  padding: "9px 11px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: active
                    ? "rgb(var(--ink))"
                    : "rgb(var(--ink-muted))",
                  borderRadius: 8,
                  transition: "color 180ms ease",
                  whiteSpace: "nowrap",
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
                      bottom: 3,
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
          style={{
            display: "none",
            gap: 8,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <LanguageSwitcher variant="light" />
          <Link
            href="/donate"
            className="btn btn-teal btn-sm"
            style={{ whiteSpace: "nowrap" }}
          >
            {t("nav.donate")}
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="nav-burger"
          style={{
            width: 40,
            height: 40,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            color: "rgb(var(--ink))",
            padding: 0,
            flexShrink: 0,
            borderRadius: 999,
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
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              borderTop: "1px solid rgb(var(--border))",
            }}
          >
            <nav
              className="container-wide"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "8px 16px 20px",
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
                      padding: "13px 4px",
                      fontWeight: 500,
                      fontSize: 16,
                      minHeight: 48,
                      display: "flex",
                      alignItems: "center",
                      color: active
                        ? "rgb(var(--brand))"
                        : "rgb(var(--ink))",
                      borderBottom: "1px solid rgb(var(--border) / 0.6)",
                    }}
                  >
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </Link>
                );
              })}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  paddingTop: 16,
                  marginTop: 6,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <LanguageSwitcher variant="light" />
                <Button href="/donate" variant="teal" size="sm">
                  {t("nav.donate")}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        .nav-wordmark-sub { display: none; }

        @media (min-width: 380px) {
          .nav-wordmark-sub { display: inline; }
        }

        /* Show full desktop nav from xl up, hide burger */
        @media (min-width: 1180px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: flex !important; }
          .nav-burger { display: none !important; }
        }
      `}</style>
    </header>
  );
}
