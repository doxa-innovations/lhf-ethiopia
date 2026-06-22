"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
import { SITE } from "@/lib/content";
import { useT } from "@/components/providers/LanguageProvider";
import { LhfMark } from "@/components/brand/LhfMark";
import { EditableText } from "@/components/cms/EditableText";

type LinkGroup = {
  labelKey: string;
  fallback: string;
  items: Array<{ href: string; labelKey: string }>;
};

/* Grouped navigation — modern footer convention: 3 short columns rather than
   one long vertical list. Each group's heading reads via t() so it stays in
   sync with the active locale. */
const LINK_GROUPS: LinkGroup[] = [
  {
    labelKey: "footer.groupMission",
    fallback: "Mission",
    items: [
      { href: "/about", labelKey: "nav.about" },
      { href: "/stories", labelKey: "nav.stories" },
      { href: "/news", labelKey: "nav.news" },
    ],
  },
  {
    labelKey: "footer.groupLibrary",
    fallback: "Library",
    items: [
      { href: "/publications", labelKey: "nav.publications" },
      { href: "/podcast", labelKey: "nav.podcast" },
      { href: "/events", labelKey: "nav.events" },
    ],
  },
  {
    labelKey: "footer.groupEngage",
    fallback: "Engage",
    items: [
      { href: "/projects", labelKey: "nav.projects" },
      { href: "/contact", labelKey: "nav.contact" },
      { href: "/donate", labelKey: "nav.donate" },
    ],
  },
];

export function Footer() {
  const { t } = useT();

  // Safe t() that falls back to a literal when the key isn't in the dict yet
  const tFb = (key: string, fb: string) => {
    const v = t(key as Parameters<typeof t>[0]);
    return v === key ? fb : v;
  };

  return (
    <footer
      style={{
        background: "rgb(var(--navy-strong))",
        color: "rgba(255,255,255,0.76)",
        paddingTop: 48,
        paddingBottom: 24,
        marginTop: 48,
      }}
    >
      <div className="container-wide">
        {/* TOP: brand + newsletter-style nudge */}
        <div className="footer-top">
          <div className="footer-brand">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 12,
                  padding: 8,
                  flexShrink: 0,
                }}
              >
                <LhfMark size={36} />
              </span>
              <span
                style={{ display: "flex", flexDirection: "column", lineHeight: 1.15, minWidth: 0 }}
              >
                <strong
                  className="font-display"
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "0.005em",
                  }}
                >
                  {SITE.name}
                </strong>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 3,
                  }}
                >
                  <EditableText
                    elementId="nav.orgFullName"
                    defaultValue={t("nav.orgFullName")}
                  />
                </span>
              </span>
            </div>
            <p
              style={{
                fontSize: 13.5,
                lineHeight: 1.65,
                maxWidth: 420,
              }}
            >
              {SITE.description}
            </p>
            <span className="brand-accent" style={{ marginTop: 14, display: "block" }} />
          </div>

          <div className="footer-cta">
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgb(var(--teal-soft))",
              }}
            >
              <EditableText
                elementId="footer.stayInTouch"
                defaultValue={tFb("footer.stayInTouch", "Stay in touch")}
              />
            </span>
            <p
              className="font-display"
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: 500,
                marginTop: 6,
                lineHeight: 1.3,
                maxWidth: 320,
              }}
            >
              <EditableText
                elementId="footer.stayInTouchBody"
                defaultValue={tFb(
                  "footer.stayInTouchBody",
                  "Quarterly updates from the translation desk and the print floor.",
                )}
                multiline
              />
            </p>
            <form
              action={`mailto:${SITE.email}`}
              method="post"
              encType="text/plain"
              style={{
                marginTop: 12,
                display: "flex",
                gap: 6,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                padding: 4,
                maxWidth: 360,
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder={tFb("footer.emailPlaceholder", "you@example.com")}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                  padding: "8px 10px",
                  fontSize: 14,
                  fontFamily: "inherit",
                  minWidth: 0,
                }}
              />
              <button
                type="submit"
                className="btn btn-sm"
                style={{
                  background: "rgb(var(--teal))",
                  color: "white",
                  borderColor: "rgb(var(--teal))",
                  padding: "6px 12px",
                  flexShrink: 0,
                }}
              >
                <Send size={13} />
                <EditableText
                  elementId="footer.subscribe"
                  defaultValue={tFb("footer.subscribe", "Subscribe")}
                />
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE: grouped links + office contact */}
        <div className="footer-grid">
          {LINK_GROUPS.map((group) => (
            <div key={group.labelKey}>
              <h4 className="footer-h">
                <EditableText
                  elementId={group.labelKey}
                  defaultValue={tFb(group.labelKey, group.fallback)}
                />
              </h4>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                  listStyle: "none",
                }}
              >
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{ fontSize: 13.5 }}
                    >
                      <EditableText
                        elementId={link.labelKey}
                        defaultValue={t(link.labelKey as Parameters<typeof t>[0])}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="footer-h">
              <EditableText
                elementId="footer.office"
                defaultValue={t("footer.office")}
              />
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
                <span style={{ overflowWrap: "anywhere" }}>{SITE.address}</span>
              </li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Phone size={15} style={{ flexShrink: 0 }} />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
              <li style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Mail size={15} style={{ flexShrink: 0 }} />
                <a href={`mailto:${SITE.email}`} style={{ overflowWrap: "anywhere" }}>
                  {SITE.email}
                </a>
              </li>
            </ul>

            <div style={{ marginTop: 18 }}>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <EditableText
                  elementId="footer.follow"
                  defaultValue={t("footer.follow")}
                />
              </span>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <a
                  href={SITE.social.facebook}
                  aria-label="Facebook"
                  style={socialIcon}
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={SITE.social.instagram}
                  aria-label="Instagram"
                  style={socialIcon}
                >
                  <Instagram size={15} />
                </a>
                <a
                  href={SITE.social.youtube}
                  aria-label="YouTube"
                  style={socialIcon}
                >
                  <Youtube size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE.longName}.{" "}
            <EditableText
              elementId="footer.rights"
              defaultValue={t("footer.rights")}
            />
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <EditableText
              elementId="common.free"
              defaultValue={t("common.free")}
            />
            <ArrowRight size={12} style={{ color: "rgb(var(--teal-soft))" }} />
          </span>
        </div>
      </div>

      <style>{`
        /* Mobile-first: everything stacks */
        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 28px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .footer-h {
          color: white;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .footer-link {
          color: rgba(255,255,255,0.76);
          transition: color 180ms ease;
          display: inline-block;
        }
        .footer-link:hover { color: white; }
        .footer-bottom {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.10);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.5);
        }
        @media (min-width: 480px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
        }
        @media (min-width: 768px) {
          .footer-top { grid-template-columns: 1.4fr 1fr; gap: 36px; align-items: start; }
          .footer-grid { grid-template-columns: 1fr 1fr 1fr 1.3fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
}

const socialIcon: React.CSSProperties = {
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: 10,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "white",
  transition: "background var(--duration-fast), border-color var(--duration-fast)",
};
