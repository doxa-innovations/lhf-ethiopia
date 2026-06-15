"use client";

import {
  Badge,
  Card,
  CardBody,
  Reveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { NEWS } from "@/lib/content";

export function NewsPageClient() {
  const { t } = useT();
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
          <StaggerChildren style={{ display: "grid", gap: 18 }}>
            {NEWS.map((post) => (
              <StaggerItem key={post.slug}>
                <Card>
                  <CardBody>
                    <div className="news-row" style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 22, alignItems: "flex-start" }}>
                      <div>
                        <Badge tone="cream">{post.tag}</Badge>
                        <div style={{ marginTop: 12, fontSize: 12, color: "rgb(var(--ink-faint))", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-h2">{post.title}</h2>
                        <p className="text-body" style={{ marginTop: 10 }}>{post.excerpt}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        <style>{`@media (max-width: 720px) { .news-row { grid-template-columns: 1fr !important; gap: 12px !important; } }`}</style>
      </section>
    </>
  );
}
