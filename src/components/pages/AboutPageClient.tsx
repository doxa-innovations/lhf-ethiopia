"use client";

import {
  Button,
  Card,
  CardBody,
  CountUp,
  Parallax,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { useContent } from "@/lib/i18n/useContent";
import { PHOTOS } from "@/lib/content";
import { ValuesAccordion } from "@/components/ui/ValuesAccordion";
import { EditableText } from "@/components/cms/EditableText";

export function AboutPageClient() {
  const { t } = useT();
  const { values } = useContent();
  const STATS = [
    { labelKey: "about.statBooksLabel", value: 42300, suffix: "+", label: t("about.statBooksLabel") },
    { labelKey: "about.statCongregationsLabel", value: 180, suffix: "", label: t("about.statCongregationsLabel") },
    { labelKey: "about.statProjectsLabel", value: 12, suffix: "", label: t("about.statProjectsLabel") },
    { labelKey: "about.statLangsLabel", value: 6, suffix: "", label: t("about.statLangsLabel") },
    { labelKey: "about.statReviewersLabel", value: 34, suffix: "", label: t("about.statReviewersLabel") },
  ];
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">
              <EditableText elementId="about.label" defaultValue={t("about.label")} />
            </span>
            <h1 className="text-display">
              <EditableText elementId="about.title" defaultValue={t("about.title")} />
            </h1>
            <p className="text-body-lg" style={{ marginTop: 18, maxWidth: 760 }}>
              <EditableText elementId="about.intro" defaultValue={t("about.intro")} multiline />
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Reveal direction="right">
              <Parallax speed={0.18}>
                <div className="photo-wrap photo-kenburns" style={{ aspectRatio: "4 / 5" }}>
                  <SafeImage
                    src={PHOTOS.ethiopiaLandscape}
                    alt="Ethiopian highlands"
                    fill
                    sizes="(max-width: 900px) 100vw, 500px"
                    fallbackLabel="Ethiopia"
                  />
                </div>
              </Parallax>
            </Reveal>

            <div>
              <Reveal>
                <span className="section-label">
                  <EditableText elementId="about.storyLabel" defaultValue={t("about.storyLabel")} />
                </span>
                <h2 className="text-h1">
                  <EditableText elementId="about.storyTitle" defaultValue={t("about.storyTitle")} />
                </h2>
                <div style={{ display: "grid", gap: 14, marginTop: 16 }} className="text-body-lg">
                  <p>
                    <EditableText elementId="about.storyP1" defaultValue={t("about.storyP1")} multiline />
                  </p>
                  <p>
                    <EditableText elementId="about.storyP2" defaultValue={t("about.storyP2")} multiline />
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 680, marginInline: "auto" }}>
              <span className="section-label">
                <EditableText elementId="about.numbersLabel" defaultValue={t("about.numbersLabel")} />
              </span>
              <h2 className="text-h1">
                <EditableText elementId="about.numbersTitle" defaultValue={t("about.numbersTitle")} />
              </h2>
            </div>
          </Reveal>

          <StaggerChildren
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
            className="about-stats"
          >
            {STATS.map((s) => (
              <StaggerItem key={s.labelKey}>
                <Card className="card-flat" style={{ background: "white", height: "100%" }}>
                  <CardBody>
                    <div
                      className="font-display"
                      style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "rgb(var(--brand))",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      <CountUp value={s.value} suffix={s.suffix} />
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12.5,
                        color: "rgb(var(--ink-muted))",
                        lineHeight: 1.4,
                      }}
                    >
                      <EditableText elementId={s.labelKey} defaultValue={s.label} />
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <style>{`
            @media (min-width: 640px) { .about-stats { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; } }
            @media (min-width: 1024px) { .about-stats { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; } }
          `}</style>
        </div>
      </section>

      <section id="believe" className="section">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 680, marginBottom: 28 }}>
              <span className="section-label">
                <EditableText elementId="about.convictionsLabel" defaultValue={t("about.convictionsLabel")} />
              </span>
              <h2 className="text-h1">
                <EditableText elementId="about.convictionsTitle" defaultValue={t("about.convictionsTitle")} />
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <ValuesAccordion values={values} defaultOpenSlug={values[0]?.slug} />
          </Reveal>
        </div>
      </section>

      <section className="section section-navy-deep">
        <div className="container">
          <Reveal>
            <div className="grid-2" style={{ alignItems: "center" }}>
              <div>
                <span className="section-label">
                  <EditableText elementId="about.parentLabel" defaultValue={t("about.parentLabel")} />
                </span>
                <h2 className="text-h2" style={{ color: "white" }}>
                  <EditableText elementId="about.parentTitle" defaultValue={t("about.parentTitle")} />
                </h2>
                <p className="text-body" style={{ marginTop: 12, color: "rgba(255,255,255,0.74)" }}>
                  <EditableText elementId="about.parentBody" defaultValue={t("about.parentBody")} multiline />
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="https://lhfmissions.org" variant="primary">
                  <EditableText elementId="about.visitLhf" defaultValue={t("about.visitLhf")} />
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  style={{
                    background: "transparent",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.32)",
                  }}
                >
                  <EditableText elementId="about.getInTouch" defaultValue={t("about.getInTouch")} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
