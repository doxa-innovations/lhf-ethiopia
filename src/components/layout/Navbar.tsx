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
      className="site-nav"
      style={{
        position: "fixed",
        top: scrolled ? 10 : 14,
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
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <div
          className="nav-pill"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            padding: "6px 6px 6px 14px",
            width: "100%",
            maxWidth: 1180,
            pointerEvents: "auto",
            transition: "padding 240ms ease",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              color: "rgb(var(--ink))",
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <motion.span
              aria-hidden
              initial={{ rotate: 0 }}
              whileHover={{ rotate: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "grid", placeItems: "center", flexShrink: 0 }}
            >
              <LuthersRose size={30} variant="full" />
            </motion.span>
            <span
              className="nav-wordmark"
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.02,
                minWidth: 0,
              }}
            >
              <span
                className="font-display nav-wordmark-main"
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
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
                  letterSpacing: "0.14em",
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
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <LanguageSwitcher variant="light" />
            <Link
              href="/donate"
              className="btn btn-teal btn-sm nav-donate"
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
                      padding: "14px 14px",
                      fontWeight: 500,
                      fontSize: 16,
                      minHeight: 48,
                      display: "flex",
                      alignItems: "center",
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
                  padding: 10,
                  marginTop: 4,
                  borderTop: "1px solid rgb(var(--border))",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <LanguageSwitcher variant="light" />
                <Button
                  href="/donate"
                  variant="teal"
                  size="sm"
                >
                  {t("nav.donate")}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <style>{`
        /* Mobile-first: hide wordmark subtitle on the smallest screens */
        .nav-wordmark-sub { display: none; }

        @media (min-width: 380px) {
          .nav-wordmark-sub { display: inline; }
        }

        /* Show desktop nav from xl up; hide burger */
        @media (min-width: 1180px) {
          .nav-desktop { display: flex !important; }
          .nav-cta { display: flex !important; }
          .nav-burger { display: none !important; }
        }

        /* Hide language switcher on the tightest phones; burger still works */
        @media (max-width: 1179px) {
          .nav-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
}
