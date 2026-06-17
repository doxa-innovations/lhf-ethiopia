"use client";

import Link from "next/link";
import { Badge, Reveal, SafeImage } from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { useContent, type LocalizedContent } from "@/lib/i18n/useContent";

type Article = LocalizedContent["news"][number];

export function NewsPageClient() {
  const { t } = useT();
  const { news } = useContent();

  if (news.length === 0) return null;

  // Newest first
  const sorted = [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const sidebar = sorted.slice(1);

  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">{t("news.label")}</span>
            <h1 className="text-display">{t("news.title")}</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 680 }}>
              {t("news.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="news-layout">
            {/* FEATURED — large card on the left with photo, full excerpt, date */}
            <Reveal>
              <FeaturedArticleCard article={featured} />
            </Reveal>

            {/* SIDEBAR — stack of horizontal mini-cards */}
            <div className="news-sidebar">
              {sidebar.map((post, i) => (
                <Reveal key={post.slug} delay={0.05 + i * 0.06}>
                  <SidebarArticleCard article={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .news-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .news-sidebar {
            display: grid;
            gap: 18px;
          }
          @media (min-width: 900px) {
            .news-layout {
              grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
              gap: 36px;
              align-items: start;
            }
          }
        `}</style>
      </section>
    </>
  );
}

function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="news-feature-link"
      style={{ display: "block" }}
    >
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          className="photo-wrap"
          style={{ aspectRatio: "16 / 10", borderRadius: 20, overflow: "hidden" }}
        >
          <SafeImage
            src={article.image ?? ""}
            alt={article.title}
            fill
            sizes="(max-width: 900px) 100vw, 720px"
            fallbackLabel={article.title}
          />
        </div>
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
            <Badge tone="cream">{article.tag}</Badge>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgb(var(--ink-faint))",
              }}
            >
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(22px, 3.4vw, 32px)",
              fontWeight: 500,
              color: "rgb(var(--ink))",
              letterSpacing: "-0.012em",
              lineHeight: 1.16,
              overflowWrap: "anywhere",
            }}
          >
            {article.title}
          </h2>
          <p className="text-body" style={{ marginTop: 12, maxWidth: 640 }}>
            {article.excerpt}
          </p>
        </div>
      </article>
      <style>{`
        .news-feature-link .photo-wrap img { transition: transform 700ms var(--ease-out); }
        .news-feature-link:hover .photo-wrap img { transform: scale(1.04); }
      `}</style>
    </Link>
  );
}

function SidebarArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="news-side-link"
      style={{ display: "block" }}
    >
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "120px minmax(0, 1fr)",
          gap: 16,
          alignItems: "center",
        }}
        className="news-side-row"
      >
        <div
          className="photo-wrap"
          style={{ aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden" }}
        >
          <SafeImage
            src={article.image ?? ""}
            alt={article.title}
            fill
            sizes="120px"
            fallbackLabel={article.title}
          />
        </div>
        <div style={{ minWidth: 0 }}>
          <Badge tone="cream">{article.tag}</Badge>
          <h3
            className="font-display"
            style={{
              marginTop: 6,
              fontSize: 17,
              fontWeight: 500,
              color: "rgb(var(--ink))",
              lineHeight: 1.22,
              letterSpacing: "-0.005em",
              overflowWrap: "anywhere",
            }}
          >
            {article.title}
          </h3>
          <p
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "rgb(var(--ink-muted))",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </p>
        </div>
      </article>
      <style>{`
        .news-side-link .photo-wrap img { transition: transform 600ms var(--ease-out); }
        .news-side-link:hover .photo-wrap img { transform: scale(1.06); }
        .news-side-link:hover h3 { color: rgb(var(--brand)); }
        @media (max-width: 480px) {
          .news-side-row { grid-template-columns: 96px minmax(0, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </Link>
  );
}
