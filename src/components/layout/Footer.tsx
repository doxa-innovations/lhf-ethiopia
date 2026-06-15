"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SITE } from "@/lib/content";
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
  { href: "/donate", labelKey: "nav.donate" },
] as const;

export function Footer() {
  const { t } = useT();
  return (
    <footer
      style={{
        background: "rgb(var(--navy-strong))",
        color: "rgba(255,255,255,0.76)",
        paddingTop: 56,
        paddingBottom: 28,
        marginTop: 56,
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1.1fr",
            gap: 36,
          }}
          className="footer-grid"
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <LuthersRose size={42} variant="full" />

              <strong
                className="font-display"
                style={{
                  color: "white",
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                {SITE.longName}
              </strong>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65 }}>{SITE.description}</p>
            <div className="flag-stripe" style={{ marginTop: 16 }}>
              <span /> <span /> <span />
            </div>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("footer.explore")}
            </h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                listStyle: "none",
              }}
            >
              {NAV_KEYS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: 13.5 }}>
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("footer.office")}
            </h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                listStyle: "none",
                fontSize: 13.5,
              }}
            >
              <li style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPin size={15} style={{ marginTop: 3, flexShrink: 0 }} />
                {SITE.address}
              </li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Phone size={15} />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Mail size={15} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t("footer.follow")}
            </h4>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <a href={SITE.social.facebook} aria-label="Facebook" style={socialIcon}>
                <Facebook size={16} />
              </a>
              <a href={SITE.social.instagram} aria-label="Instagram" style={socialIcon}>
                <Instagram size={16} />
              </a>
              <a href={SITE.social.youtube} aria-label="YouTube" style={socialIcon}>
                <Youtube size={16} />
              </a>
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.58)" }}>
              {SITE.parent}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.10)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            fontSize: 12.5,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {SITE.longName}. {t("footer.rights")}
          </span>
          <span>{t("common.free")}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

const socialIcon: React.CSSProperties = {
  width: 34,
  height: 34,
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  background: "rgba(255,255,255,0.08)",
  color: "white",
  transition: "background var(--duration-fast)",
};
