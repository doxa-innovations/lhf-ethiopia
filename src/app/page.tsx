"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Globe2,
  HandHeart,
  Headphones,
  MapPin,
  Users,
  Youtube,
} from "lucide-react";
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
import { BentoHero } from "@/components/marketing/BentoHero";
import { StatsBand } from "@/components/marketing/StatsBand";
import { ImpactCharts } from "@/components/marketing/ImpactCharts";
import { YouTubeEmbed } from "@/components/podcast/YouTubeEmbed";
import { useT } from "@/components/providers/LanguageProvider";
import {
  EVENTS,
  LANGUAGES,
  NEWS,
  PHOTOS,
  PODCAST,
  PODCAST_EPISODES,
  VALUES,
} from "@/lib/content";

export default function HomePage() {
  const { t } = useT();
  const upcomingEvents = EVENTS.filter((e) => e.status === "Upcoming").slice(0, 3);
  const sortedEpisodes = [...PODCAST_EPISODES].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const latestEpisode = sortedEpisodes[0];
  const otherEpisodes = sortedEpisodes.slice(1, 4);
  const featuredYoutubeId = PODCAST.featuredYoutubeId;

  return (
    <>
      {/* ===================== HERO — bento grid, no photo backgrounds ===================== */}
      <BentoHero />

      {/* ===================== STATS BAND — navy with SVG dot texture ===================== */}
      <StatsBand />

      {/* ===================== WHAT WE DO ===================== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                textAlign: "center",
                maxWidth: 640,
                marginInline: "auto",
              }}
            >
              <span className="section-label">{t("common.sectionWhatWeDo")}</span>
              <h2 className="text-h1">{t("home.whatWeDoTitle")}</h2>
              <p className="text-body" style={{ marginTop: 12 }}>
                {t("home.whatWeDoBody")}
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid-3" style={{ marginTop: 40 }}>
            {[
              {
                icon: <Globe2 size={18} />,
                title: t("home.translation"),
                body: t("home.translationBody"),
                photo: PHOTOS.translatorAtDesk,
              },
              {
                icon: <BookOpen size={18} />,
                title: t("home.printing"),
                body: t("home.printingBody"),
                photo: PHOTOS.printPress,
              },
              {
                icon: <HandHeart size={18} />,
                title: t("home.distribution"),
                body: t("home.distributionBody"),
                photo: PHOTOS.handsHolding,
              },
            ].map((step) => (
              <StaggerItem key={step.title}>
                <Card style={{ height: "100%" }}>
                  <div
                    className="photo-wrap"
                    style={{ aspectRatio: "16 / 10", borderRadius: 0 }}
                  >
                    <SafeImage
                      src={step.photo}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      fallbackLabel={step.title}
                    />
                  </div>
                  <CardBody>
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: "rgb(var(--brand-muted))",
                        color: "rgb(var(--brand))",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {step.icon}
                    </span>
                    <h3 className="text-h3" style={{ marginTop: 14 }}>
                      {step.title}
                    </h3>
                    <p className="text-body" style={{ marginTop: 6 }}>
                      {step.body}
                    </p>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===================== DIGITAL OUTREACH / PODCAST ===================== */}
      <section className="section section-navy-deep">
        <div className="container-wide">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 28,
              alignItems: "center",
            }}
            className="podcast-grid"
          >
            <Reveal>
              <div>
                <span
                  className="badge badge-glass"
                  style={{ padding: "5px 12px" }}
                >
                  <Youtube size={11} />{" "}
                  {t("common.sectionDigitalOutreach")}
                </span>
                <h2
                  className="text-h1"
                  style={{ color: "white", marginTop: 14 }}
                >
                  {PODCAST.title}
                </h2>
                <div
                  className="font-display"
                  style={{
                    color: "rgb(var(--teal-soft))",
                    marginTop: 4,
                    fontSize: 19,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  {PODCAST.native}
                </div>
                <p
                  className="text-body"
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    marginTop: 12,
                    maxWidth: 460,
                  }}
                >
                  {t("home.podcastTagline")} {PODCAST.cadence}.
                </p>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    href={PODCAST.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: "#FF0000",
                      color: "white",
                      borderColor: "#FF0000",
                    }}
                  >
                    <Youtube size={14} /> {t("common.subscribe")}
                  </a>
                  <Button
                    href="/podcast"
                    variant="secondary"
                    size="sm"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.28)",
                    }}
                  >
                    <Headphones size={13} /> {t("home.allEpisodes")}
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: 26,
                    paddingTop: 18,
                    borderTop: "1px solid rgba(255,255,255,0.10)",
                    display: "grid",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgb(var(--teal-soft))",
                    }}
                  >
                    {t("home.moreEpisodes")}
                  </div>
                  {otherEpisodes.map((ep) => (
                    <Link
                      key={ep.slug}
                      href={`/podcast#${ep.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 0",
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 5,
                          background: "rgba(255,255,255,0.08)",
                          color: "rgb(var(--teal-soft))",
                          fontSize: 11,
                          fontWeight: 700,
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {ep.number || "•"}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          minWidth: 0,
                          color: "white",
                          fontSize: 13,
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ep.title}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.5)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ep.durationMin} min
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.12}>
              <YouTubeEmbed
                videoId={featuredYoutubeId}
                title={`Latest: ${latestEpisode.title}`}
                channelHref={PODCAST.channelUrl}
              />
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .podcast-grid { grid-template-columns: 1fr 1.2fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* ===================== IMPACT CHARTS ===================== */}
      <section className="section section-soft">
        <div className="container-wide">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <Reveal>
              <div style={{ maxWidth: 540 }}>
                <span className="section-label">
                  {t("common.sectionImpact")}
                </span>
                <h2 className="text-h1">{t("home.impactTitle")}</h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  {t("home.impactBody")}
                </p>
              </div>
            </Reveal>
            <Button href="/projects" variant="navy" size="md">
              {t("common.adoptProject")} <ArrowRight size={14} />
            </Button>
          </div>

          <Reveal delay={0.08}>
            <ImpactCharts />
          </Reveal>
        </div>
      </section>

      {/* ===================== LANGUAGES ===================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <Reveal>
              <div style={{ maxWidth: 540 }}>
                <span className="section-label">
                  {t("common.sectionLanguages")}
                </span>
                <h2 className="text-h1">{t("home.languagesTitle")}</h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  {t("home.languagesBody")}
                </p>
              </div>
            </Reveal>
            <Button href="/publications" variant="primary" size="md">
              {t("home.fullLibrary")} <ArrowRight size={14} />
            </Button>
          </div>

          <Reveal delay={0.05}>
            <Card>
              <ul
                className="lang-list"
                style={{ listStyle: "none", margin: 0, padding: 0 }}
              >
                {LANGUAGES.slice(0, 6).map((lang, i) => (
                  <li
                    key={lang.code}
                    className="lang-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) auto",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 18px",
                      borderTop: i === 0 ? "none" : "1px solid rgb(var(--border))",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: 0,
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          color: "rgb(var(--brand))",
                          lineHeight: 1.15,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {lang.native}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgb(var(--ink-muted))",
                          fontWeight: 500,
                        }}
                      >
                        {lang.name}
                      </span>
                    </span>
                    <span
                      className="lang-region"
                      style={{
                        fontSize: 12.5,
                        color: "rgb(var(--ink-faint))",
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lang.region}
                    </span>
                    <span style={{ display: "inline-flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: "rgb(var(--ink-faint))",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {lang.titles}
                      </span>
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
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .lang-row { grid-template-columns: minmax(0, 1fr) auto !important; }
            .lang-region { display: none !important; }
          }
        `}</style>
      </section>

      {/* ===================== EVENTS TEASER ===================== */}
      <section className="section section-soft">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <Reveal>
              <div>
                <span className="section-label">
                  {t("common.sectionUpcoming")}
                </span>
                <h2 className="text-h1">{t("home.eventsTitle")}</h2>
                <p className="text-body" style={{ marginTop: 8, maxWidth: 500 }}>
                  {t("home.eventsBody")}
                </p>
              </div>
            </Reveal>
            <Link
              href="/events"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              {t("home.allEvents")}
            </Link>
          </div>

          <StaggerChildren className="grid-3">
            {upcomingEvents.map((ev) => (
              <StaggerItem key={ev.slug}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <Badge tone="teal">
                      <Calendar size={11} /> {ev.status}
                    </Badge>
                    <h3 className="text-h3" style={{ marginTop: 12 }}>
                      {ev.title}
                    </h3>
                    <p className="text-body" style={{ marginTop: 8 }}>
                      {ev.summary}
                    </p>
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop: "1px solid rgb(var(--border))",
                        display: "grid",
                        gap: 4,
                        fontSize: 12.5,
                        color: "rgb(var(--ink-muted))",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <Calendar size={12} />{" "}
                        {new Date(ev.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <MapPin size={12} /> {ev.location}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="section section-soft">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 26,
              alignItems: "center",
            }}
            className="values-grid"
          >
            <Reveal direction="right">
              <div className="photo-wrap" style={{ aspectRatio: "4 / 5" }}>
                <SafeImage
                  src={PHOTOS.congregation}
                  alt="Lutheran congregation gathered"
                  fill
                  sizes="(max-width: 900px) 100vw, 460px"
                  fallbackLabel="Congregation"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="section-label">
                  {t("common.sectionWhatWeBelieve")}
                </span>
                <h2 className="text-h1">{t("home.valuesTitle")}</h2>
              </Reveal>
              <StaggerChildren style={{ display: "grid", gap: 12, marginTop: 22 }}>
                {VALUES.map((value) => (
                  <StaggerItem key={value.title}>
                    <div
                      style={{
                        background: "rgb(var(--surface))",
                        border: "1px solid rgb(var(--border))",
                        borderLeft: "3px solid rgb(var(--brand))",
                        borderRadius: 10,
                        padding: 16,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "rgb(var(--ink))",
                        }}
                      >
                        {value.title}
                      </h3>
                      <p
                        style={{
                          marginTop: 4,
                          fontSize: 13.5,
                          color: "rgb(var(--ink-muted))",
                          lineHeight: 1.6,
                        }}
                      >
                        {value.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .values-grid { grid-template-columns: 1fr 1fr !important; gap: 44px !important; }
          }
        `}</style>
      </section>

      {/* ===================== NEWS ===================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            <Reveal>
              <div>
                <span className="section-label">{t("common.sectionLatest")}</span>
                <h2 className="text-h1">{t("common.tagWordAtWork")}</h2>
              </div>
            </Reveal>
            <Link
              href="/news"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              {t("common.seeAllArrow")}
            </Link>
          </div>
          <StaggerChildren className="grid-3">
            {NEWS.slice(0, 3).map((post) => (
              <StaggerItem key={post.slug}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <Badge tone="cream">{post.tag}</Badge>
                    <h3 className="text-h3" style={{ marginTop: 12 }}>
                      {post.title}
                    </h3>
                    <p className="text-body" style={{ marginTop: 6 }}>
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 12.5,
                        color: "rgb(var(--ink-faint))",
                      }}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===================== BIG CTA — flat ink background, no gradient ===================== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                position: "relative",
                background: "rgb(var(--ink))",
                borderRadius: 20,
                padding: "clamp(28px, 5vw, 64px)",
                color: "white",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 22,
                alignItems: "center",
                overflow: "hidden",
              }}
              className="cta-shell"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <Users size={15} style={{ color: "rgb(var(--teal-soft))" }} />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgb(var(--teal-soft))",
                    }}
                  >
                    {t("common.adoptProject")}
                  </span>
                </div>
                <h2 className="text-h1" style={{ color: "white" }}>
                  {t("home.ctaTitle")}
                </h2>
                <p
                  className="text-body"
                  style={{ color: "rgba(255,255,255,0.78)", marginTop: 10 }}
                >
                  {t("home.ctaBody")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Button href="/projects" variant="teal" size="md">
                  {t("home.ctaPrimary")}
                </Button>
                <Button
                  href="/donate"
                  variant="secondary"
                  size="md"
                  style={{
                    background: "transparent",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.28)",
                  }}
                >
                  {t("home.ctaSecondary")}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .cta-shell { grid-template-columns: 1.4fr 1fr !important; gap: 28px !important; }
          }
        `}</style>
      </section>
    </>
  );
}
