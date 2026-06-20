/**
 * /admin — dashboard. Welcome card + counts per collection.
 * Counts come directly from Drizzle (fast, no Payload boot).
 */
import Link from "next/link";
import { db, schema } from "@/lib/db";
import { sql } from "drizzle-orm";

async function getCounts() {
  const t = schema;
  const [n, p, e, pubs, vals, ss, ep, langs, cms] = await Promise.all([
    db.select({ c: sql<number>`count(*)` }).from(t.news),
    db.select({ c: sql<number>`count(*)` }).from(t.projects),
    db.select({ c: sql<number>`count(*)` }).from(t.events),
    db.select({ c: sql<number>`count(*)` }).from(t.publications),
    db.select({ c: sql<number>`count(*)` }).from(t.values),
    db.select({ c: sql<number>`count(*)` }).from(t.stories),
    db.select({ c: sql<number>`count(*)` }).from(t.podcastEpisodes),
    db.select({ c: sql<number>`count(*)` }).from(t.languages),
    db.select({ c: sql<number>`count(*)` }).from(t.cmsElements),
  ]);
  return {
    news: Number(n[0]?.c ?? 0),
    projects: Number(p[0]?.c ?? 0),
    events: Number(e[0]?.c ?? 0),
    publications: Number(pubs[0]?.c ?? 0),
    values: Number(vals[0]?.c ?? 0),
    stories: Number(ss[0]?.c ?? 0),
    podcastEpisodes: Number(ep[0]?.c ?? 0),
    languages: Number(langs[0]?.c ?? 0),
    cmsElements: Number(cms[0]?.c ?? 0),
  };
}

function StatCard({
  label,
  value,
  href,
  tag,
}: {
  label: string;
  value: number;
  href: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        background: "white",
        border: "1px solid rgb(var(--border, 226 222 215))",
        borderRadius: 14,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        color: "inherit",
        boxShadow: "0 1px 2px rgba(18, 22, 32, 0.03), 0 4px 14px rgba(18, 22, 32, 0.04)",
        transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-garamond, 'EB Garamond', serif)",
          fontSize: 38,
          fontWeight: 500,
          color: "rgb(var(--ink, 18 22 32))",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: "rgb(var(--ink-muted, 88 96 110))",
          marginTop: 6,
        }}
      >
        {label}
      </div>
      {tag ? (
        <div
          style={{
            marginTop: 8,
            fontSize: 11.5,
            color: "rgb(var(--brand, 159 31 42))",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {tag} →
        </div>
      ) : null}
    </Link>
  );
}

export default async function AdminDashboard() {
  const c = await getCounts();

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #fbfaf6 0%, #f4f0e8 100%)",
          border: "1px solid rgb(var(--border, 226 222 215))",
          borderRadius: 18,
          padding: "28px 30px",
          marginBottom: 26,
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "rgb(var(--ink, 18 22 32))",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              display: "inline-block",
              backgroundImage: 'url("/lhflogo.png")',
              backgroundSize: "auto 100%",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              filter: "invert(1) brightness(1.2)",
            }}
          />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(var(--brand, 159 31 42))",
              marginBottom: 6,
            }}
          >
            Welcome back
          </div>
          <h1
            style={{
              fontFamily: "var(--font-garamond, 'EB Garamond', serif)",
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 500,
              color: "rgb(var(--ink, 18 22 32))",
              margin: 0,
              letterSpacing: "-0.014em",
              lineHeight: 1.15,
            }}
          >
            Pick a page on the left, edit it in place.
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "rgb(var(--ink-muted, 88 96 110))",
              marginTop: 8,
              maxWidth: 640,
            }}
          >
            Every word + image on the public site can be changed here.
            Use the locale switcher on each edit page to flip between
            English, አማርኛ, and Afaan Oromoo.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 14,
        }}
      >
        <StatCard
          label="UI strings"
          value={c.cmsElements}
          href="/admin/edit/home"
          tag="Pages"
        />
        <StatCard label="News articles" value={c.news} href="/admin/edit/news" tag="Editorial" />
        <StatCard label="Projects" value={c.projects} href="/admin/edit/projects" tag="Engage" />
        <StatCard label="Events" value={c.events} href="/admin/edit/events" tag="Engage" />
        <StatCard label="Publications" value={c.publications} href="/admin/edit/publications" tag="Library" />
        <StatCard label="Stories" value={c.stories} href="/admin/edit/stories" tag="Editorial" />
        <StatCard label="Podcast episodes" value={c.podcastEpisodes} href="/admin/edit/podcast-episodes" tag="Library" />
        <StatCard label="Languages" value={c.languages} href="/admin/edit/languages" tag="Library" />
      </div>
    </div>
  );
}
