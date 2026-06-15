"use client";

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
import { useT } from "@/components/providers/LanguageProvider";
import { PHOTOS, PROJECTS, formatUsd } from "@/lib/content";

export function ProjectsPageClient() {
  const { t } = useT();
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2" style={{ gap: 48, alignItems: "center" }}>
            <Reveal>
              <span className="section-label">{t("projects.label")}</span>
              <h1 className="text-display">{t("projects.title")}</h1>
              <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 560 }}>
                {t("projects.intro")}
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="/donate" variant="primary">{t("projects.giveCta")}</Button>
                <Button href="/contact" variant="secondary">{t("projects.sponsorFullCta")}</Button>
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
                      <div className="project-row" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 32 }}>
                        <div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                            <Badge>{t("common.open")}</Badge>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgb(var(--ink-faint))" }}>
                              <MapPin size={14} /> {p.region}
                            </span>
                          </div>
                          <h3 className="text-h2" style={{ marginTop: 14 }}>{p.title}</h3>
                          <p className="text-body" style={{ marginTop: 12 }}>
                            <strong style={{ color: "rgb(var(--ink))" }}>{t("projects.need")}</strong> {p.need}
                          </p>
                          <p className="text-body" style={{ marginTop: 8 }}>
                            <strong style={{ color: "rgb(var(--ink))" }}>{t("projects.impact")}</strong> {p.impact}
                          </p>
                        </div>

                        <div style={{ background: "rgb(var(--surface-2))", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16 }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                              <span style={{ fontSize: 13, color: "rgb(var(--ink-faint))" }}>{t("common.raised")}</span>
                              <span style={{ fontSize: 13, fontWeight: 700, color: "rgb(var(--brand))" }}>{pct}%</span>
                            </div>
                            <div style={{ height: 10, borderRadius: 999, background: "white", border: "1px solid rgb(var(--border))", overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "rgb(var(--brand))", transition: "width 600ms ease" }} />
                            </div>
                            <div className="font-display" style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 8 }}>
                              <strong style={{ fontSize: 24, color: "rgb(var(--ink))", letterSpacing: "-0.02em" }}>{formatUsd(p.raised)}</strong>
                              <span style={{ fontSize: 13, color: "rgb(var(--ink-faint))" }}>
                                {t("common.ofGoal").replace("{goal}", formatUsd(p.goal))}
                              </span>
                            </div>
                          </div>
                          <Link href="/donate" className="btn btn-primary" style={{ width: "100%" }}>
                            <HandHeart size={16} /> {t("common.sponsorProject")}
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

        <style>{`@media (max-width: 900px) { .project-row { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}
