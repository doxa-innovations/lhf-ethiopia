"use client";

import { Quote } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { PHOTOS, STORIES } from "@/lib/content";

const portraitFor = (slug: string) => {
  switch (slug) {
    case "pastor-tadesse": return PHOTOS.pastor;
    case "selam-teacher": return PHOTOS.teacher;
    case "abdi-translator": return PHOTOS.translator;
    case "almaz-deaconess": return PHOTOS.deaconess;
    case "yohannes-printer": return PHOTOS.printer;
    default: return PHOTOS.pastor;
  }
};

export function StoriesPageClient() {
  const { t } = useT();
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">{t("stories.label")}</span>
            <h1 className="text-display">{t("stories.title")}</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 720 }}>
              {t("stories.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerChildren style={{ display: "grid", gap: 28 }}>
            {STORIES.map((story, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <StaggerItem key={story.slug}>
                  <Card>
                    <div
                      className="story-row"
                      data-reverse={reverse ? "1" : "0"}
                      style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}
                    >
                      <div className="photo-wrap" style={{ gridColumn: 1, gridRow: 1, minHeight: 240, borderRadius: 0 }}>
                        <SafeImage
                          src={portraitFor(story.slug)}
                          alt={`${story.name} portrait`}
                          fill
                          sizes="(max-width: 900px) 100vw, 500px"
                          fallbackLabel={story.role}
                        />
                      </div>
                      <CardBody style={{ gridColumn: 1, gridRow: 2, padding: "clamp(20px, 4vw, 44px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Badge tone="cream">{story.language}</Badge>
                        <Quote size={28} style={{ color: "rgb(var(--brand))", marginTop: 16 }} />
                        <p className="font-display" style={{ marginTop: 10, fontSize: "clamp(17px, 1.6vw, 20px)", fontStyle: "italic", lineHeight: 1.5, color: "rgb(var(--ink))", fontWeight: 500 }}>
                          &ldquo;{story.quote}&rdquo;
                        </p>
                        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid rgb(var(--border))" }}>
                          <strong style={{ color: "rgb(var(--ink))", fontSize: 15 }}>{story.name}</strong>
                          <div style={{ color: "rgb(var(--ink-muted))", fontSize: 13, marginTop: 2 }}>
                            {story.role} · {story.congregation}
                          </div>
                        </div>
                      </CardBody>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .story-row { grid-template-columns: 1fr 1.4fr !important; }
            .story-row[data-reverse="1"] { grid-template-columns: 1.4fr 1fr !important; }
            .story-row > .photo-wrap { grid-row: 1 !important; min-height: 300px !important; }
            .story-row[data-reverse="0"] > .photo-wrap { grid-column: 1 !important; }
            .story-row[data-reverse="1"] > .photo-wrap { grid-column: 2 !important; }
            .story-row > .card-body { grid-row: 1 !important; }
            .story-row[data-reverse="0"] > .card-body { grid-column: 2 !important; }
            .story-row[data-reverse="1"] > .card-body { grid-column: 1 !important; }
          }
        `}</style>
      </section>

      <section className="section section-navy-deep">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="text-h1">{t("stories.ctaTitle")}</h2>
            <p className="text-body-lg" style={{ marginTop: 14, maxWidth: 560, marginInline: "auto" }}>
              {t("stories.ctaBody")}
            </p>
          </Reveal>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button href="/contact" variant="primary">{t("stories.shareCta")}</Button>
            <Button
              href="/donate"
              variant="secondary"
              style={{ background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.32)" }}
            >
              {t("stories.helpMoreCta")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
