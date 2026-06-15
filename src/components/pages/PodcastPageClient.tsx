"use client";

import { Headphones, Mic, Youtube } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Reveal,
  SafeImage,
} from "@/components/ui";
import { PodcastBrowser } from "@/components/podcast/PodcastBrowser";
import { YouTubeEmbed } from "@/components/podcast/YouTubeEmbed";
import { useT } from "@/components/providers/LanguageProvider";
import { PHOTOS, PODCAST, PODCAST_EPISODES } from "@/lib/content";

export function PodcastPageClient() {
  const { t } = useT();
  const latest = [...PODCAST_EPISODES].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const featuredId = PODCAST.featuredYoutubeId;

  return (
    <>
      <section
        style={{
          position: "relative",
          paddingTop: 132,
          paddingBottom: 56,
          background: "rgb(var(--navy-strong))",
          color: "white",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -2,
            backgroundImage: `url("${PHOTOS.podcastStudio}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
          }}
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, background: "rgba(8, 12, 22, 0.5)" }} />

        <div className="container-wide" style={{ position: "relative" }}>
          <div className="podcast-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "center" }}>
            <div>
              <Reveal>
                <span className="badge badge-glass" style={{ padding: "5px 12px" }}>
                  <Youtube size={11} /> {t("podcast.label")}
                </span>
                <h1 className="text-display" style={{ color: "white", marginTop: 14 }}>
                  {PODCAST.title}
                </h1>
                <div className="font-display" style={{ color: "rgb(var(--teal-soft))", marginTop: 6, fontSize: 22, fontStyle: "italic", fontWeight: 400 }}>
                  {PODCAST.native}
                </div>
                <p className="text-body" style={{ color: "rgba(255,255,255,0.78)", marginTop: 12, maxWidth: 480 }}>
                  {PODCAST.description}
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a
                    href={PODCAST.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm"
                    style={{ background: "#FF0000", color: "white", borderColor: "#FF0000" }}
                  >
                    <Youtube size={14} /> {t("common.subscribe")}
                  </a>
                  {PODCAST.platforms.slice(1).map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      className="btn btn-secondary btn-sm"
                      style={{ background: "rgba(255,255,255,0.06)", color: "white", borderColor: "rgba(255,255,255,0.28)" }}
                    >
                      <Headphones size={13} /> {p.name}
                    </a>
                  ))}
                </div>

                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="photo-wrap" style={{ width: 44, height: 44, borderRadius: 999, overflow: "hidden", flexShrink: 0 }}>
                    <SafeImage src={PHOTOS.podcastHost} alt={PODCAST.host} fill sizes="44px" fallbackLabel="Host" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgb(var(--teal-soft))" }}>
                      {t("podcast.hostedBy")}
                    </div>
                    <div className="font-display" style={{ fontSize: 16, fontWeight: 500, color: "white", marginTop: 2, lineHeight: 1.2 }}>
                      {PODCAST.host}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <YouTubeEmbed videoId={featuredId} title={`Latest: ${latest.title}`} channelHref={PODCAST.channelUrl} />
            </Reveal>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .podcast-hero-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <div>
                <span className="section-label">{t("podcast.browseLabel")}</span>
                <h2 className="text-h1">{t("podcast.browseTitle")}</h2>
              </div>
              <Button href="/donate" variant="teal" size="sm">{t("common.sponsorShow")}</Button>
            </div>
          </Reveal>

          <PodcastBrowser />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: 32 }}>
            <Reveal>
              <Card>
                <CardBody>
                  <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <Badge tone="navy"><Mic size={11} /> {t("podcast.hostBlockTitle")}</Badge>
                    <Badge tone="cream">{PODCAST.cadence}</Badge>
                  </div>
                  <h3 className="text-h2">{PODCAST.host}</h3>
                  <p className="text-body" style={{ marginTop: 8 }}>{PODCAST.hostBio}</p>
                </CardBody>
              </Card>
            </Reveal>
            <Reveal direction="left">
              <div className="photo-wrap" style={{ aspectRatio: "4 / 3" }}>
                <SafeImage src={PHOTOS.podcastStudio} alt="Podcast studio" fill sizes="(max-width: 900px) 100vw, 420px" fallbackLabel="Studio" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
