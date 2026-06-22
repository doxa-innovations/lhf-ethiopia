"use client";

import { BookOpen } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Parallax,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { useContent } from "@/lib/i18n/useContent";
import { EditableText } from "@/components/cms/EditableText";
import { PHOTOS } from "@/lib/content";

export function PublicationsPageClient() {
  const { t } = useT();
  const { languages, publications } = useContent();
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2" style={{ gap: 48, alignItems: "center" }}>
            <Reveal>
              <span className="section-label">
                <EditableText
                  elementId="publications.label"
                  defaultValue={t("publications.label")}
                />
              </span>
              <h1 className="text-display">
                <EditableText
                  elementId="publications.title"
                  defaultValue={t("publications.title")}
                />
              </h1>
              <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 560 }}>
                <EditableText
                  elementId="publications.intro"
                  defaultValue={t("publications.intro")}
                  multiline
                />
              </p>
            </Reveal>
            <Reveal direction="left">
              <Parallax speed={0.18}>
                <div className="photo-wrap photo-kenburns" style={{ aspectRatio: "5 / 4" }}>
                  <SafeImage
                    src={PHOTOS.bookshelf}
                    alt="Books on shelf"
                    fill
                    sizes="(max-width: 900px) 100vw, 460px"
                    fallbackLabel="Bookshelf"
                  />
                </div>
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="section-label">
              <EditableText
                elementId="common.sectionLanguages"
                defaultValue={t("common.sectionLanguages")}
              />
            </span>
            <h2 className="text-h1">
              <EditableText
                elementId="publications.heartLanguagesTitle"
                defaultValue={t("publications.heartLanguagesTitle")}
              />
            </h2>
          </Reveal>
          <StaggerChildren className="grid-3" style={{ marginTop: 32 }}>
            {languages.map((lang) => (
              <StaggerItem key={lang.code}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <h3 className="text-h3" style={{ overflowWrap: "anywhere" }}>{lang.name}</h3>
                      <Badge
                        tone={
                          lang.status === "Published"
                            ? "green"
                            : lang.status === "In translation"
                              ? "gold"
                              : "cream"
                        }
                      >
                        {lang.statusLabel}
                      </Badge>
                    </div>
                    <p
                      className="font-display"
                      style={{
                        marginTop: 8,
                        fontSize: 24,
                        fontWeight: 500,
                        color: "rgb(var(--brand))",
                        letterSpacing: "-0.01em",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {lang.native}
                    </p>
                    <dl
                      style={{
                        marginTop: 16,
                        paddingTop: 14,
                        borderTop: "1px solid rgb(var(--border))",
                        display: "grid",
                        gap: 6,
                        fontSize: 12.5,
                      }}
                    >
                      <Row label={t("publications.labelRegion")} value={lang.region} />
                      <Row label={t("publications.labelSpeakers")} value={lang.speakers} />
                      <Row label={t("publications.labelTitles")} value={String(lang.titles)} />
                    </dl>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal>
            <span className="section-label">
              <EditableText
                elementId="publications.catalogLabel"
                defaultValue={t("publications.catalogLabel")}
              />
            </span>
            <h2 className="text-h1">
              <EditableText
                elementId="publications.catalogTitle"
                defaultValue={t("publications.catalogTitle")}
              />
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: 32,
                background: "rgb(var(--surface))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "none",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  gap: 16,
                  padding: "14px 22px",
                  background: "rgb(var(--surface-2))",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgb(var(--ink-muted))",
                }}
                className="pub-row pub-header"
              >
                <span>
                  <EditableText
                    elementId="publications.colTitle"
                    defaultValue={t("publications.colTitle")}
                  />
                </span>
                <span>
                  <EditableText
                    elementId="publications.colLanguage"
                    defaultValue={t("publications.colLanguage")}
                  />
                </span>
                <span>
                  <EditableText
                    elementId="publications.colAudience"
                    defaultValue={t("publications.colAudience")}
                  />
                </span>
                <span style={{ textAlign: "right" }}>
                  <EditableText
                    elementId="publications.colStatus"
                    defaultValue={t("publications.colStatus")}
                  />
                </span>
              </div>

              {publications.map((pub) => (
                <div
                  key={pub.slug}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 10,
                    padding: "16px 18px",
                    borderTop: "1px solid rgb(var(--border))",
                    alignItems: "center",
                  }}
                  className="pub-row"
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: "rgb(var(--brand-muted))",
                        color: "rgb(var(--brand))",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={16} />
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "rgb(var(--ink))", overflowWrap: "anywhere" }}>{pub.title}</div>
                      <div style={{ fontSize: 12.5, color: "rgb(var(--ink-faint))", marginTop: 2, overflowWrap: "anywhere" }}>
                        {pub.native} · {pub.pages}{" "}
                        <EditableText
                          elementId="publications.pagesLabel"
                          defaultValue={t("publications.pagesLabel")}
                        />
                      </div>
                    </div>
                  </div>
                  <span style={{ color: "rgb(var(--ink-muted))", overflowWrap: "anywhere" }}>{pub.language}</span>
                  <span style={{ color: "rgb(var(--ink-muted))", overflowWrap: "anywhere" }}>{pub.audience}</span>
                  <span style={{ textAlign: "right" }}>
                    <Badge
                      tone={
                        pub.status === "In print"
                          ? "green"
                          : pub.status === "In translation"
                            ? "gold"
                            : "cream"
                      }
                    >
                      {pub.statusLabel}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <p style={{ marginTop: 16, fontSize: 12.5, color: "rgb(var(--ink-faint))" }}>
            <EditableText
              elementId="publications.noteFree"
              defaultValue={t("publications.noteFree")}
              multiline
            />
          </p>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .pub-row { grid-template-columns: 2fr 1fr 1fr 1fr !important; gap: 16px !important; padding: 18px 22px !important; }
            .pub-header { display: grid !important; }
          }
        `}</style>
      </section>

      <section className="section section-navy-deep">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="text-h1">
              <EditableText
                elementId="publications.missingLanguageTitle"
                defaultValue={t("publications.missingLanguageTitle")}
              />
            </h2>
            <p className="text-body-lg" style={{ marginTop: 12, maxWidth: 560, marginInline: "auto" }}>
              <EditableText
                elementId="publications.missingLanguageBody"
                defaultValue={t("publications.missingLanguageBody")}
                multiline
              />
            </p>
          </Reveal>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button href="/contact" variant="primary">
              <EditableText
                elementId="common.requestLanguage"
                defaultValue={t("common.requestLanguage")}
              />
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              style={{ background: "transparent", color: "white", borderColor: "rgba(255,255,255,0.32)" }}
            >
              <EditableText
                elementId="common.adoptTranslation"
                defaultValue={t("common.adoptTranslation")}
              />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <dt style={{ color: "rgb(var(--ink-faint))" }}>{label}</dt>
      <dd style={{ color: "rgb(var(--ink))", fontWeight: 600 }}>{value}</dd>
    </div>
  );
}
