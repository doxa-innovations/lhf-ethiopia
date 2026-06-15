import type { Metadata } from "next";
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
import { GridBackdrop } from "@/components/marketing/GridBackdrop";
import { PHOTOS, STORIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Translators, pastors, teachers, and congregation members tell what these books mean in real life. Stories from LHF Ethiopia.",
};

const portraitFor = (slug: string) => {
  switch (slug) {
    case "pastor-tadesse":
      return PHOTOS.pastor;
    case "selam-teacher":
      return PHOTOS.teacher;
    case "abdi-translator":
      return PHOTOS.translator;
    case "almaz-deaconess":
      return PHOTOS.deaconess;
    case "yohannes-printer":
      return PHOTOS.printer;
    default:
      return PHOTOS.pastor;
  }
};

export default function StoriesPage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Stories</span>
            <h1 className="text-display">In their own words.</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 720 }}>
              Pastors, teachers, translators, deaconesses, and printers — the people whose
              hands these books pass through. Real congregations, real testimonies.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerChildren style={{ display: "grid", gap: 32 }}>
            {STORIES.map((story, idx) => {
              const reverse = idx % 2 === 1;
              return (
                <StaggerItem key={story.slug}>
                  <Card>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: reverse ? "1.4fr 1fr" : "1fr 1.4fr",
                        gap: 0,
                      }}
                      className="story-row"
                    >
                      <div
                        className="photo-wrap"
                        style={{
                          gridColumn: reverse ? 2 : 1,
                          gridRow: 1,
                          minHeight: 320,
                          borderRadius: 0,
                        }}
                      >
                        <SafeImage
                          src={portraitFor(story.slug)}
                          alt={`${story.name} portrait`}
                          fill
                          sizes="(max-width: 900px) 100vw, 500px"
                          fallbackLabel={story.role}
                        />
                      </div>
                      <CardBody
                        style={{
                          gridColumn: reverse ? 1 : 2,
                          gridRow: 1,
                          padding: "clamp(28px, 4vw, 48px)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Badge tone="cream">{story.language}</Badge>
                        <Quote
                          size={32}
                          style={{ color: "rgb(var(--brand))", marginTop: 18 }}
                        />
                        <p
                          style={{
                            marginTop: 12,
                            fontSize: "clamp(18px, 1.7vw, 22px)",
                            lineHeight: 1.5,
                            color: "rgb(var(--ink))",
                            fontWeight: 500,
                            letterSpacing: "-0.005em",
                          }}
                        >
                          &ldquo;{story.quote}&rdquo;
                        </p>
                        <div
                          style={{
                            marginTop: 24,
                            paddingTop: 18,
                            borderTop: "1px solid rgb(var(--border))",
                          }}
                        >
                          <strong
                            style={{
                              color: "rgb(var(--ink))",
                              fontSize: 16,
                            }}
                          >
                            {story.name}
                          </strong>
                          <div
                            style={{
                              color: "rgb(var(--ink-muted))",
                              fontSize: 14,
                              marginTop: 2,
                            }}
                          >
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
          @media (max-width: 900px) {
            .story-row {
              grid-template-columns: 1fr !important;
            }
            .story-row > .photo-wrap {
              grid-column: 1 !important;
              grid-row: 1 !important;
              min-height: 260px !important;
            }
            .story-row > .card-body {
              grid-column: 1 !important;
              grid-row: 2 !important;
            }
          }
        `}</style>
      </section>

      <section className="section section-ink">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="text-h1">Your story could be next.</h2>
            <p
              className="text-body-lg"
              style={{ marginTop: 14, maxWidth: 560, marginInline: "auto" }}
            >
              If your parish has received books from LHF Ethiopia — or is waiting for them —
              tell us. We&apos;d love to share what God is doing through you.
            </p>
          </Reveal>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button href="/contact" variant="primary">
              Share your story
            </Button>
            <Button
              href="/donate"
              variant="secondary"
              style={{
                background: "transparent",
                color: "white",
                borderColor: "rgba(255,255,255,0.32)",
              }}
            >
              Help more stories happen
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
