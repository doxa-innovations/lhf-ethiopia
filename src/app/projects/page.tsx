import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, MapPin } from "lucide-react";
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
import { PHOTOS, PROJECTS, formatUsd } from "@/lib/content";

export const metadata: Metadata = {
  title: "Adopt a Project",
  description:
    "Sponsor a specific LHF Ethiopia translation, reprint, or distribution project. Every project is a real congregation, translator, and shelf waiting to be filled.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
            className="grid-2"
          >
            <Reveal>
              <span className="section-label">Adopt a project</span>
              <h1 className="text-display">Choose where the books go.</h1>
              <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 560 }}>
                Every project here is concrete: a translator, a print run, a parish, a
                Sunday school. Pick one and follow it from manuscript to congregation.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="/donate" variant="primary">
                  Give to most-needed
                </Button>
                <Button href="/contact" variant="secondary">
                  Sponsor a full project
                </Button>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="photo-wrap" style={{ aspectRatio: "5 / 4" }}>
                <SafeImage
                  src={PHOTOS.childrenReading}
                  alt="Children reading"
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                  fallbackLabel="Children reading"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerChildren style={{ display: "grid", gap: 24 }}>
            {PROJECTS.map((p) => {
              const pct = Math.min(100, Math.round((p.raised / p.goal) * 100));
              return (
                <StaggerItem key={p.title}>
                  <Card>
                    <CardBody>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1.6fr 1fr",
                          gap: 32,
                        }}
                        className="project-row"
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <Badge>Open for adoption</Badge>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 13,
                                color: "rgb(var(--ink-faint))",
                              }}
                            >
                              <MapPin size={14} /> {p.region}
                            </span>
                          </div>
                          <h3 className="text-h2" style={{ marginTop: 14 }}>
                            {p.title}
                          </h3>
                          <p className="text-body" style={{ marginTop: 12 }}>
                            <strong style={{ color: "rgb(var(--ink))" }}>Need:</strong>{" "}
                            {p.need}
                          </p>
                          <p className="text-body" style={{ marginTop: 8 }}>
                            <strong style={{ color: "rgb(var(--ink))" }}>Impact:</strong>{" "}
                            {p.impact}
                          </p>
                        </div>

                        <div
                          style={{
                            background: "rgb(var(--surface-2))",
                            borderRadius: 16,
                            padding: 24,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 16,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 13,
                                  color: "rgb(var(--ink-faint))",
                                }}
                              >
                                Raised
                              </span>
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "rgb(var(--brand))",
                                }}
                              >
                                {pct}%
                              </span>
                            </div>
                            <div
                              style={{
                                height: 10,
                                borderRadius: 999,
                                background: "white",
                                border: "1px solid rgb(var(--border))",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${pct}%`,
                                  height: "100%",
                                  background:
                                    "linear-gradient(90deg, rgb(var(--brand)) 0%, rgb(var(--brand-strong)) 100%)",
                                  transition: "width 600ms ease",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                marginTop: 14,
                                display: "flex",
                                alignItems: "baseline",
                                gap: 8,
                              }}
                            >
                              <strong
                                style={{
                                  fontSize: 26,
                                  color: "rgb(var(--ink))",
                                  letterSpacing: "-0.02em",
                                }}
                              >
                                {formatUsd(p.raised)}
                              </strong>
                              <span
                                style={{
                                  fontSize: 14,
                                  color: "rgb(var(--ink-faint))",
                                }}
                              >
                                of {formatUsd(p.goal)} goal
                              </span>
                            </div>
                          </div>
                          <Link
                            href="/donate"
                            className="btn btn-primary"
                            style={{ width: "100%" }}
                          >
                            <HandHeart size={16} /> Sponsor this project
                          </Link>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .project-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
