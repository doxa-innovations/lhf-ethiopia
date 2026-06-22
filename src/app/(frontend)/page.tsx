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
import { useContent } from "@/lib/i18n/useContent";
import { EditableText } from "@/components/cms/EditableText";
import {
  PHOTOS,
  PODCAST,
  PODCAST_EPISODES,
} from "@/lib/content";
import { ValuesAccordion } from "@/components/ui/ValuesAccordion";

export default function HomePage() {
  const { t } = useT();
  const { events, languages, news, podcastEpisodes, values } = useContent();
  const upcomingEvents = events.filter((e) => e.status === "Upcoming").slice(0, 3);
  // Sort by date — pull stable date from PODCAST_EPISODES base by slug.
  const dateFor = (slug: string) =>
    PODCAST_EPISODES.find((e) => e.slug === slug)?.date ?? "";
  const sortedEpisodes = [...podcastEpisodes].sort((a, b) =>
    dateFor(a.slug) < dateFor(b.slug) ? 1 : -1,
  );
  // For the "more episodes" mini-list we also need stable `number` + `durationMin`.
  const otherEpisodes = sortedEpisodes.slice(1, 4).map((ep) => {
    const base = PODCAST_EPISODES.find((e) => e.slug === ep.slug);
    return { ...ep, number: base?.number ?? 0, durationMin: base?.durationMin ?? 0 };
  });
  const latestEpisode = sortedEpisodes[0];
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
              <span className="section-label">
                <EditableText
                  elementId="common.sectionWhatWeDo"
                  defaultValue={t("common.sectionWhatWeDo")}
                />
              </span>
              <h2 className="text-h1">
                <EditableText
                  elementId="home.whatWeDoTitle"
                  defaultValue={t("home.whatWeDoTitle")}
                />
              </h2>
              <p className="text-body" style={{ marginTop: 12 }}>
                <EditableText
                  elementId="home.whatWeDoBody"
                  defaultValue={t("home.whatWeDoBody")}
                  multiline
                />
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid-3" style={{ marginTop: 40 }}>
            {[
              {
                icon: <Globe2 size={18} />,
                titleKey: "home.translation",
                bodyKey: "home.translationBody",
                title: t("home.translation"),
                body: t("home.translationBody"),
                photo: PHOTOS.translatorAtDesk,
              },
              {
                icon: <BookOpen size={18} />,
                titleKey: "home.printing",
                bodyKey: "home.printingBody",
                title: t("home.printing"),
                body: t("home.printingBody"),
                photo: PHOTOS.printPress,
              },
              {
                icon: <HandHeart size={18} />,
                titleKey: "home.distribution",
                bodyKey: "home.distributionBody",
                title: t("home.distribution"),
                body: t("home.distributionBody"),
                photo: PHOTOS.handsHolding,
              },
            ].map((step) => (
              <StaggerItem key={step.titleKey}>
                <Card style={{ height: "100%" }} className="card-lift">
                  <div
                    className="photo-wrap photo-kenburns"
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
                      <EditableText
                        elementId={step.titleKey}
                        defaultValue={step.title}
                      />
                    </h3>
                    <p className="text-body" style={{ marginTop: 6 }}>
                      <EditableText
                        elementId={step.bodyKey}
                        defaultValue={step.body}
                        multiline
                      />
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
                  <EditableText
                    elementId="common.sectionDigitalOutreach"
                    defaultValue={t("common.sectionDigitalOutreach")}
                  />
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
                  <EditableText
                    elementId="home.podcastTagline"
                    defaultValue={t("home.podcastTagline")}
                    multiline
                  />{" "}
                  {PODCAST.cadence}.
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
                    <Youtube size={14} />{" "}
                    <EditableText
                      elementId="common.subscribe"
                      defaultValue={t("common.subscribe")}
                    />
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
                    <Headphones size={13} />{" "}
                    <EditableText
                      elementId="home.allEpisodes"
                      defaultValue={t("home.allEpisodes")}
                    />
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
                    <EditableText
                      elementId="home.moreEpisodes"
                      defaultValue={t("home.moreEpisodes")}
                    />
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
      <section className="section section-data">
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
                  <EditableText
                    elementId="common.sectionImpact"
                    defaultValue={t("common.sectionImpact")}
                  />
                </span>
                <h2 className="text-h1">
                  <EditableText
                    elementId="home.impactTitle"
                    defaultValue={t("home.impactTitle")}
                  />
                </h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  <EditableText
                    elementId="home.impactBody"
                    defaultValue={t("home.impactBody")}
                    multiline
                  />
                </p>
              </div>
            </Reveal>
            <Button href="/projects" variant="navy" size="md">
              <EditableText
                elementId="common.adoptProject"
                defaultValue={t("common.adoptProject")}
              />{" "}
              <ArrowRight size={14} />
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
                  <EditableText
                    elementId="common.sectionLanguages"
                    defaultValue={t("common.sectionLanguages")}
                  />
                </span>
                <h2 className="text-h1">
                  <EditableText
                    elementId="home.languagesTitle"
                    defaultValue={t("home.languagesTitle")}
                  />
                </h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  <EditableText
                    elementId="home.languagesBody"
                    defaultValue={t("home.languagesBody")}
                    multiline
                  />
                </p>
              </div>
            </Reveal>
            <Button href="/publications" variant="primary" size="md">
              <EditableText
                elementId="home.fullLibrary"
                defaultValue={t("home.fullLibrary")}
              />{" "}
              <ArrowRight size={14} />
            </Button>
          </div>

          <Reveal delay={0.05}>
            <Card>
              <ul
                className="lang-list"
                style={{ listStyle: "none", margin: 0, padding: 0 }}
              >
                {languages.slice(0, 6).map((lang, i) => (
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
                        {lang.statusLabel}
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
                  <EditableText
                    elementId="common.sectionUpcoming"
                    defaultValue={t("common.sectionUpcoming")}
                  />
                </span>
                <h2 className="text-h1">
                  <EditableText
                    elementId="home.eventsTitle"
                    defaultValue={t("home.eventsTitle")}
                  />
                </h2>
                <p className="text-body" style={{ marginTop: 8, maxWidth: 500 }}>
                  <EditableText
                    elementId="home.eventsBody"
                    defaultValue={t("home.eventsBody")}
                    multiline
                  />
                </p>
              </div>
            </Reveal>
            <Link
              href="/events"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              <EditableText
                elementId="home.allEvents"
                defaultValue={t("home.allEvents")}
              />
            </Link>
          </div>

          <StaggerChildren className="grid-3">
            {upcomingEvents.map((ev) => (
              <StaggerItem key={ev.slug}>
                <Card style={{ height: "100%" }}>
                  <CardBody>
                    <Badge tone="teal">
                      <Calendar size={11} /> {ev.statusLabel}
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
                  <EditableText
                    elementId="common.sectionWhatWeBelieve"
                    defaultValue={t("common.sectionWhatWeBelieve")}
                  />
                </span>
                <h2 className="text-h1">
                  <EditableText
                    elementId="home.valuesTitle"
                    defaultValue={t("home.valuesTitle")}
                  />
                </h2>
              </Reveal>
              <div style={{ marginTop: 22 }}>
                <ValuesAccordion values={values} defaultOpenSlug={values[0]?.slug} compact />
              </div>
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
                <span className="section-label">
                  <EditableText
                    elementId="common.sectionLatest"
                    defaultValue={t("common.sectionLatest")}
                  />
                </span>
                <h2 className="text-h1">
                  <EditableText
                    elementId="common.tagWordAtWork"
                    defaultValue={t("common.tagWordAtWork")}
                  />
                </h2>
              </div>
            </Reveal>
            <Link
              href="/news"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              <EditableText
                elementId="common.seeAllArrow"
                defaultValue={t("common.seeAllArrow")}
              />
            </Link>
          </div>
          <StaggerChildren className="grid-3">
            {news.slice(0, 3).map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/news/${post.slug}`}
                  style={{ display: "block", height: "100%" }}
                  className="news-card-link"
                >
                  <Card style={{ height: "100%" }} className="card-lift">
                    {post.image ? (
                      <div className="photo-wrap" style={{ aspectRatio: "16 / 10", borderRadius: 0 }}>
                        <SafeImage
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          fallbackLabel={post.title}
                        />
                      </div>
                    ) : null}
                    <CardBody>
                      <Badge tone="cream">{post.tag}</Badge>
                      <h3 className="text-h3" style={{ marginTop: 12, overflowWrap: "anywhere" }}>
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
                </Link>
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
                    <EditableText
                      elementId="common.adoptProject"
                      defaultValue={t("common.adoptProject")}
                    />
                  </span>
                </div>
                <h2 className="text-h1" style={{ color: "white" }}>
                  <EditableText
                    elementId="home.ctaTitle"
                    defaultValue={t("home.ctaTitle")}
                  />
                </h2>
                <p
                  className="text-body"
                  style={{ color: "rgba(255,255,255,0.78)", marginTop: 10 }}
                >
                  <EditableText
                    elementId="home.ctaBody"
                    defaultValue={t("home.ctaBody")}
                    multiline
                  />
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
                  <EditableText
                    elementId="home.ctaPrimary"
                    defaultValue={t("home.ctaPrimary")}
                  />
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
                  <EditableText
                    elementId="home.ctaSecondary"
                    defaultValue={t("home.ctaSecondary")}
                  />
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
