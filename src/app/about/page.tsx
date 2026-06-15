import type { Metadata } from "next";
import {
  Button,
  Card,
  CardBody,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { GridBackdrop } from "@/components/marketing/GridBackdrop";
import { PHOTOS, SITE, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `Who we are: ${SITE.description}`,
};

export default function AboutPage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">About</span>
            <h1 className="text-display">
              A Lutheran library, built one heart language at a time.
            </h1>
            <p className="text-body-lg" style={{ marginTop: 18, maxWidth: 760 }}>
              LHF Ethiopia is the regional arm of the Lutheran Heritage Foundation — a
              US-based mission that has placed more than 6 million Bible-rooted books into
              the hands of Lutheran congregations in nearly 100 countries. In Ethiopia, we
              work shoulder to shoulder with local pastors, translators, and printers to do
              the same thing here.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            className="grid-2"
            style={{ alignItems: "center", gap: 48 }}
          >
            <Reveal direction="right">
              <div
                className="photo-wrap"
                style={{ aspectRatio: "4 / 5" }}
              >
                <SafeImage
                  src={PHOTOS.ethiopiaLandscape}
                  alt="Ethiopian highlands landscape"
                  fill
                  sizes="(max-width: 900px) 100vw, 500px"
                  fallbackLabel="Ethiopia"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="section-label">Our story</span>
                <h2 className="text-h1">Why Ethiopia. Why now.</h2>
                <div
                  style={{ display: "grid", gap: 14, marginTop: 16 }}
                  className="text-body-lg"
                >
                  <p>
                    Lutheran congregations have been part of Ethiopia&apos;s story since the
                    19th century. Today, more than 11 million Ethiopians worship in Lutheran
                    parishes — and most of them have never held a copy of Luther&apos;s
                    Small Catechism in the language they think and pray in.
                  </p>
                  <p>
                    LHF Ethiopia exists to change that. We translate, print, and distribute
                    confessional Lutheran books — at no cost to the congregation, the
                    pastor, or the family that receives them.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream-deep">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 680, marginInline: "auto" }}>
              <span className="section-label">By the numbers</span>
              <h2 className="text-h1">A measurable mission.</h2>
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
                      style={{
                        fontSize: 30,
                        fontWeight: 800,
                        color: "rgb(var(--brand))",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 13,
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
            @media (max-width: 1024px) {
              .about-stats { grid-template-columns: repeat(3, 1fr) !important; }
            }
            @media (max-width: 640px) {
              .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: 680 }}>
              <span className="section-label">What we hold to</span>
              <h2 className="text-h1">Four convictions that shape every project.</h2>
            </div>
          </Reveal>
          <StaggerChildren className="grid-2" style={{ marginTop: 36 }}>
            {VALUES.map((value, i) => (
              <StaggerItem key={value.title}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 12,
                      }}
                    >
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

      <section className="section section-ink">
        <div className="container">
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                alignItems: "center",
              }}
              className="grid-2"
            >
              <div>
                <span className="section-label">Parent</span>
                <h2 className="text-h2" style={{ color: "white" }}>
                  Lutheran Heritage Foundation
                </h2>
                <p
                  className="text-body"
                  style={{ marginTop: 12, color: "rgba(255,255,255,0.74)" }}
                >
                  LHF is a Recognized Service Organization of the Lutheran Church—Missouri
                  Synod (LCMS), headquartered in Macomb, Michigan. Since 1992 LHF has
                  translated Luther&apos;s Small Catechism into more than 150 languages and
                  published over 2,000 titles. LHF Ethiopia carries that mission to the
                  highlands and lowlands of Ethiopia.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="https://lhfmissions.org" variant="primary">
                  Visit LHF
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
                  Get in touch
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
