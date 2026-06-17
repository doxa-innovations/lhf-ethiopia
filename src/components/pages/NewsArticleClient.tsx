"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge, Reveal, SafeImage } from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { useContent } from "@/lib/i18n/useContent";

export function NewsArticleClient({ slug }: { slug: string }) {
  const { t } = useT();
  const { news } = useContent();
  const article = news.find((n) => n.slug === slug);
  if (!article) return null;

  const related = news.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "rgb(var(--brand))",
                marginBottom: 18,
              }}
            >
              <ArrowLeft size={14} /> {t("news.label")}
            </Link>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <Badge tone="cream">{article.tag}</Badge>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgb(var(--ink-faint))",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Calendar size={12} />
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-display" style={{ marginTop: 14, maxWidth: 880 }}>
              {article.title}
            </h1>
            <p
              className="text-body-lg"
              style={{ marginTop: 18, maxWidth: 760, color: "rgb(var(--ink-muted))" }}
            >
              {article.excerpt}
            </p>
          </Reveal>
        </div>
      </section>

      {article.image ? (
        <section style={{ paddingBlock: "0 0" }}>
          <div className="container">
            <Reveal>
              <div
                className="photo-wrap"
                style={{
                  aspectRatio: "16 / 8",
                  borderRadius: 20,
                  marginTop: -10,
                }}
              >
                <SafeImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  fallbackLabel={article.title}
                />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <article
            style={{
              maxWidth: 720,
              marginInline: "auto",
              display: "grid",
              gap: 18,
              fontSize: 16,
              lineHeight: 1.78,
              color: "rgb(var(--ink))",
            }}
          >
            {(article.body ?? article.excerpt ?? "")
              .split(/\n\n+/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} style={{ overflowWrap: "anywhere" }}>
                  {para}
                </p>
              ))}
          </article>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section section-soft">
          <div className="container">
            <div style={{ marginBottom: 18 }}>
              <span className="section-label">{t("common.sectionLatest")}</span>
              <h2 className="text-h2">{t("news.title")}</h2>
            </div>
            <div className="grid-3">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  style={{ display: "block" }}
                  className="news-card-link"
                >
                  <article
                    style={{
                      background: "rgb(var(--surface))",
                      border: "1px solid rgb(var(--border))",
                      borderRadius: 14,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      transition: "transform 240ms var(--ease-out), box-shadow 240ms var(--ease-out)",
                    }}
                  >
                    {post.image ? (
                      <div className="photo-wrap" style={{ aspectRatio: "16 / 10", borderRadius: 0 }}>
                        <SafeImage
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          fallbackLabel={post.title}
                        />
                      </div>
                    ) : null}
                    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                      <Badge tone="cream">{post.tag}</Badge>
                      <h3 className="text-h3" style={{ overflowWrap: "anywhere" }}>
                        {post.title}
                      </h3>
                      <p
                        className="text-body"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <style>{`
              .news-card-link:hover article {
                transform: translateY(-4px);
                box-shadow: 0 16px 36px rgba(18, 22, 32, 0.10);
              }
            `}</style>
          </div>
        </section>
      ) : null}
    </>
  );
}
