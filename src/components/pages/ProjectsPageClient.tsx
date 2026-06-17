"use client";

import Link from "next/link";
import { useRef } from "react";
import { HandHeart, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
import { useContent } from "@/lib/i18n/useContent";
import { PHOTOS, formatUsd } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function ProjectProgress({ pct, raisedLabel }: { pct: number; raisedLabel: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const bar = wrap.querySelector<HTMLDivElement>(".pp-bar");
      const label = wrap.querySelector<HTMLSpanElement>(".pp-label");
      if (!bar || !label) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        bar.style.width = `${pct}%`;
        label.textContent = `${pct}%`;
        return;
      }
      const obj = { n: 0 };
      gsap.to(obj, {
        n: pct,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
        onUpdate: () => {
          const v = Math.round(obj.n);
          bar.style.width = `${v}%`;
          label.textContent = `${v}%`;
        },
      });
    },
    { scope: wrapRef, dependencies: [pct] },
  );

  return (
    <div ref={wrapRef}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "rgb(var(--ink-faint))" }}>{raisedLabel}</span>
        <span className="pp-label" style={{ fontSize: 13, fontWeight: 700, color: "rgb(var(--brand))" }}>
          0%
        </span>
      </div>
      <div style={{ height: 10, borderRadius: 999, background: "white", border: "1px solid rgb(var(--border))", overflow: "hidden" }}>
        <div className="pp-bar" style={{ width: "0%", height: "100%", background: "rgb(var(--brand))" }} />
      </div>
    </div>
  );
}

export function ProjectsPageClient() {
  const { t } = useT();
  const { projects } = useContent();
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
            {projects.map((p) => {
              const pct = Math.min(100, Math.round((p.raised / p.goal) * 100));
              return (
                <StaggerItem key={p.slug}>
                  <Card>
                    <CardBody>
                      <div className="project-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
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
                            <ProjectProgress pct={pct} raisedLabel={t("common.raised")} />
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

        <style>{`@media (min-width: 900px) { .project-row { grid-template-columns: 1.6fr 1fr !important; gap: 32px !important; } }`}</style>
      </section>
    </>
  );
}
