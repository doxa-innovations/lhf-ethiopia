import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
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
import { LANGUAGES, PHOTOS, PUBLICATIONS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Browse Lutheran books translated and published for Ethiopia in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaama, and Wolaytta.",
};

export default function PublicationsPage() {
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
              <span className="section-label">Publications</span>
              <h1 className="text-display">The LHF Ethiopia library.</h1>
              <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 560 }}>
                Catechisms, Bible-story books, devotionals, and confessional texts —
                already in print, in translation, or waiting on the next sponsor.
              </p>
            </Reveal>
            <Reveal direction="left">
              <div className="photo-wrap" style={{ aspectRatio: "5 / 4" }}>
                <SafeImage
                  src={PHOTOS.bookshelf}
                  alt="Books on shelf"
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                  fallbackLabel="Bookshelf"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="section-label">Heart languages</span>
            <h2 className="text-h1">Languages we publish in.</h2>
          </Reveal>
          <StaggerChildren className="grid-3" style={{ marginTop: 32 }}>
            {LANGUAGES.map((lang) => (
              <StaggerItem key={lang.code}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3 className="text-h3">{lang.name}</h3>
                      <Badge
                        tone={
                          lang.status === "Published"
                            ? "green"
                            : lang.status === "In translation"
                              ? "gold"
                              : "cream"
                        }
                      >
                        {lang.status}
                      </Badge>
                    </div>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 26,
                        fontWeight: 700,
                        color: "rgb(var(--brand))",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {lang.native}
                    </p>
                    <dl
                      style={{
                        marginTop: 18,
                        paddingTop: 16,
                        borderTop: "1px solid rgb(var(--border))",
                        display: "grid",
                        gap: 8,
                        fontSize: 13,
                      }}
                    >
                      <Row label="Region" value={lang.region} />
                      <Row label="Speakers" value={lang.speakers} />
                      <Row label="Titles" value={String(lang.titles)} />
                    </dl>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section section-cream-deep">
        <div className="container">
          <Reveal>
            <span className="section-label">Catalog</span>
            <h2 className="text-h1">Titles in print and in progress.</h2>
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
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  gap: 16,
                  padding: "16px 24px",
                  background: "rgb(var(--surface-2))",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgb(var(--ink-muted))",
                }}
                className="pub-row pub-header"
              >
                <span>Title</span>
                <span>Language</span>
                <span>Audience</span>
                <span style={{ textAlign: "right" }}>Status</span>
              </div>

              {PUBLICATIONS.map((pub, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    gap: 16,
                    padding: "20px 24px",
                    borderTop: "1px solid rgb(var(--border))",
                    alignItems: "center",
                  }}
                  className="pub-row"
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "rgb(var(--brand-muted))",
                        color: "rgb(var(--brand))",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={18} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, color: "rgb(var(--ink))" }}>
                        {pub.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "rgb(var(--ink-faint))",
                          marginTop: 2,
                        }}
                      >
                        {pub.native} · {pub.pages} pages
                      </div>
                    </div>
                  </div>
                  <span style={{ color: "rgb(var(--ink-muted))" }}>{pub.language}</span>
                  <span style={{ color: "rgb(var(--ink-muted))" }}>{pub.audience}</span>
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
                      {pub.status}
                    </Badge>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <p
            style={{
              marginTop: 18,
              fontSize: 13,
              color: "rgb(var(--ink-faint))",
            }}
          >
            Note: titles are distributed free of charge to congregations and pastors. To
            request a shipment for your parish or Sunday school, use the{" "}
            <a href="/contact" style={{ color: "rgb(var(--brand))", fontWeight: 600 }}>
              contact form
            </a>
            .
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .pub-row { grid-template-columns: 1fr !important; padding: 16px !important; }
            .pub-row > span:nth-child(n+2) { font-size: 13px; }
            .pub-header { display: none !important; }
          }
        `}</style>
      </section>

      <section className="section section-ink">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="text-h1">Don&apos;t see your language?</h2>
            <p
              className="text-body-lg"
              style={{ marginTop: 12, maxWidth: 560, marginInline: "auto" }}
            >
              We open a new heart language whenever a congregation requests it and a
              sponsor steps forward. Tell us about your parish — and the language it prays
              in.
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
              Request a language
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              style={{
                background: "transparent",
                color: "white",
                borderColor: "rgba(255,255,255,0.32)",
              }}
            >
              Adopt a translation
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
