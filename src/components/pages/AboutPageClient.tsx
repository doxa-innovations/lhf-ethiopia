"use client";

import {
  Button,
  Card,
  CardBody,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { PHOTOS, VALUES } from "@/lib/content";

export function AboutPageClient() {
  const { t } = useT();
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">{t("about.label")}</span>
            <h1 className="text-display">{t("about.title")}</h1>
            <p className="text-body-lg" style={{ marginTop: 18, maxWidth: 760 }}>
              {t("about.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: 48 }}>
            <Reveal direction="right">
              <div className="photo-wrap" style={{ aspectRatio: "4 / 5" }}>
                <SafeImage
                  src={PHOTOS.ethiopiaLandscape}
                  alt="Ethiopian highlands"
                  fill
                  sizes="(max-width: 900px) 100vw, 500px"
                  fallbackLabel="Ethiopia"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="section-label">{t("about.storyLabel")}</span>
                <h2 className="text-h1">{t("about.storyTitle")}</h2>
                <div style={{ display: "grid", gap: 14, marginTop: 16 }} className="text-body-lg">
                  <p>{t("about.storyP1")}</p>
                  <p>{t("about.storyP2")}</p>
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
              <span className="section-label">{t("about.numbersLabel")}</span>
              <h2 className="text-h1">{t("about.numbersTitle")}</h2>
            </div>
          </Reveal>

          <StaggerChildren
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: 16,
            }}
            className="about-stats"
          >
            {[
              { value: "42,300+", label: "Books distributed in Ethiopia" },
              { value: "180", label: "Congregations supplied" },
              { value: "12", label: "Active translation projects" },
              { value: "6", label: "Heart languages published in" },
              { value: "34", label: "Ethiopian reviewers trained" },
            ].map((s) => (
              <StaggerItem key={s.label}>
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
                      {s.value}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12.5,
                        color: "rgb(var(--ink-muted))",
                        lineHeight: 1.4,
                      }}
                    >
                      {s.label}
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <style>{`
            @media (max-width: 1024px) { .about-stats { grid-template-columns: repeat(3, 1fr) !important; } }
            @media (max-width: 640px) { .about-stats { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 680 }}>
              <span className="section-label">{t("about.convictionsLabel")}</span>
              <h2 className="text-h1">{t("about.convictionsTitle")}</h2>
            </div>
          </Reveal>
          <StaggerChildren className="grid-2" style={{ marginTop: 36 }}>
            {VALUES.map((value, i) => (
              <StaggerItem key={value.title}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgb(var(--brand-muted))",
                          color: "rgb(var(--brand-strong))",
                          fontWeight: 800,
                          fontSize: 14,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        {i + 1}
                      </span>
                      <h3 className="text-h3">{value.title}</h3>
                    </div>
                    <p className="text-body">{value.body}</p>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section section-navy-deep">
        <div className="container">
          <Reveal>
            <div className="grid-2" style={{ alignItems: "center" }}>
              <div>
                <span className="section-label">{t("about.parentLabel")}</span>
                <h2 className="text-h2" style={{ color: "white" }}>
                  {t("about.parentTitle")}
                </h2>
                <p className="text-body" style={{ marginTop: 12, color: "rgba(255,255,255,0.74)" }}>
                  {t("about.parentBody")}
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="https://lhfmissions.org" variant="primary">
                  {t("about.visitLhf")}
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
                  {t("about.getInTouch")}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
