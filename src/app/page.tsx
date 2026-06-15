import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Globe2,
  HandHeart,
  Headphones,
  MapPin,
  Mic,
  Quote,
  Users,
  Youtube,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  MarqueeStrip,
  Reveal,
  SafeImage,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { StatBlock } from "@/components/marketing/StatBlock";
import { ImpactCharts } from "@/components/marketing/ImpactCharts";
import { YouTubeEmbed } from "@/components/podcast/YouTubeEmbed";
import {
  EVENTS,
  LANGUAGES,
  NEWS,
  PARTNERS,
  PHOTOS,
  PODCAST,
  PODCAST_EPISODES,
  SITE,
  STORIES,
  VALUES,
} from "@/lib/content";

export default function HomePage() {
  const upcomingEvents = EVENTS.filter((e) => e.status === "Upcoming").slice(0, 3);
  const sortedEpisodes = [...PODCAST_EPISODES].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const latestEpisode = sortedEpisodes[0];
  const otherEpisodes = sortedEpisodes.slice(1, 4);
  const featuredYoutubeId = PODCAST.featuredYoutubeId;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero-shell">
        <div
          className="container-wide"
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <Reveal direction="up">
              <span
                className="badge badge-glass"
                style={{ padding: "5px 12px" }}
              >
                <span
                  className="flag-stripe"
                  style={{ width: 18, height: 2.5 }}
                >
                  <span /> <span /> <span />
                </span>
                The Word at work in Ethiopia
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                className="text-display"
                style={{ marginTop: 18, maxWidth: 580 }}
              >
                The Gospel,{" "}
                <em
                  style={{
                    color: "rgb(var(--brand-soft))",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  in every heart language
                </em>{" "}
                of Ethiopia.
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="text-body-lg"
                style={{ marginTop: 18, maxWidth: 520 }}
              >
                {SITE.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 26,
                  flexWrap: "wrap",
                }}
              >
                <Button href="/donate" variant="teal" size="md">
                  Sponsor a book <ArrowRight size={15} />
                </Button>
                <Button
                  href="/podcast"
                  variant="secondary"
                  size="md"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    borderColor: "rgba(255,255,255,0.28)",
                  }}
                >
                  <Youtube size={15} /> Watch on YouTube
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.18}>
            <div
              className="hero-collage"
              style={{ position: "relative", height: 360 }}
            >
              <div
                className="photo-wrap photo-tilt"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "78%",
                  height: 280,
                }}
              >
                <SafeImage
                  src={PHOTOS.heroPrimary}
                  alt="Open Bible on a table"
                  fill
                  sizes="(max-width: 1024px) 78vw, 420px"
                  priority
                  fallbackLabel="Open Bible"
                />
              </div>
              <div
                className="photo-wrap glass"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "58%",
                  height: 200,
                  transform: "rotate(1.5deg)",
                  borderRadius: 14,
                  overflow: "hidden",
                  padding: 4,
                }}
              >
                <SafeImage
                  src={PHOTOS.heroSecondary}
                  alt="Person reading scripture"
                  fill
                  sizes="(max-width: 1024px) 58vw, 320px"
                  fallbackLabel="Reading scripture"
                />
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: -32,
                  background:
                    "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(159, 31, 42, 0.22), transparent 70%)",
                  zIndex: -1,
                }}
              />
            </div>
          </Reveal>
        </div>

        <div
          className="container-wide"
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: 48,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <StatBlock
            stats={[
              { value: 6, suffix: "+", label: "Heart languages" },
              { value: 42300, suffix: "+", label: "Books distributed" },
              { value: 180, suffix: "+", label: "Congregations supplied" },
              { value: 14, label: "Podcast episodes live" },
            ]}
            tone="dark"
          />
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .hero-collage { display: none !important; }
          }
        `}</style>
      </section>

      {/* ===================== PARTNER MARQUEE ===================== */}
      <section
        style={{
          padding: "20px 0",
          borderBottom: "1px solid rgb(var(--border))",
          background: "rgb(var(--surface))",
        }}
      >
        <div className="container-wide">
          <p
            style={{
              textAlign: "center",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgb(var(--ink-faint))",
              marginBottom: 12,
            }}
          >
            Partners & supporters
          </p>
          <MarqueeStrip items={PARTNERS} />
        </div>
      </section>

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
              <span className="section-label">What we do</span>
              <h2 className="text-h1">
                Translate. Print. Distribute. Free of charge.
              </h2>
              <p className="text-body" style={{ marginTop: 12 }}>
                Lutheran congregations across Ethiopia ask for one thing again
                and again — solid Christian books they can actually read. LHF
                Ethiopia closes that gap, language by language.
              </p>
            </div>
          </Reveal>

          <StaggerChildren className="grid-3" style={{ marginTop: 40 }}>
            {[
              {
                icon: <Globe2 size={18} />,
                title: "Translation",
                body:
                  "Ethiopian pastors and theological reviewers render Luther's catechism, Bible stories, and devotionals into Amharic, Afaan Oromoo, Tigrinya, and more.",
                photo: PHOTOS.translatorAtDesk,
              },
              {
                icon: <BookOpen size={18} />,
                title: "Printing",
                body:
                  "Books are printed locally in Addis Ababa whenever possible, supporting Ethiopian presses and shrinking the time from manuscript to congregation.",
                photo: PHOTOS.printPress,
              },
              {
                icon: <HandHeart size={18} />,
                title: "Distribution",
                body:
                  "We deliver to congregations, Sunday schools, and pastoral training centers countrywide — and they receive every title at no cost.",
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

      {/* ===================== DIGITAL OUTREACH / PODCAST FEATURE ===================== */}
      <section
        style={{
          position: "relative",
          padding: "var(--section-py) 0",
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
            zIndex: -1,
            background:
              "radial-gradient(ellipse 60% 60% at 90% 100%, rgba(46, 142, 142, 0.32), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 0%, rgba(159, 31, 42, 0.32), transparent 65%)",
          }}
        />
        <div className="container-wide">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 48,
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
                  <Youtube size={11} /> Digital outreach on YouTube
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
                  {PODCAST.tagline} {PODCAST.cadence}.
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
                    <Youtube size={14} /> Subscribe on YouTube
                  </a>
                  <Button href="/podcast" variant="secondary" size="sm" style={{ background: "rgba(255,255,255,0.06)", color: "white", borderColor: "rgba(255,255,255,0.28)" }}>
                    <Headphones size={13} /> All episodes
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
                    More recent episodes
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
                        {ep.number}
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
          @media (max-width: 900px) {
            .podcast-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          }
        `}</style>
      </section>

      {/* ===================== IMPACT CHARTS ===================== */}
      <section
        className="section"
        style={{ background: "rgb(var(--bg-soft))" }}
      >
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
                <span className="section-label">Impact</span>
                <h2 className="text-h1">The Word, multiplying.</h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  Real distribution data — every copy counted, broken down by
                  language and year. We update these numbers monthly.
                </p>
              </div>
            </Reveal>
            <Button href="/projects" variant="navy" size="md">
              Adopt a project <ArrowRight size={14} />
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
                <span className="section-label">Heart languages</span>
                <h2 className="text-h1">
                  Six languages today. More on the way.
                </h2>
                <p className="text-body" style={{ marginTop: 10 }}>
                  Ethiopia is home to 90+ languages. We add a new heart
                  language whenever donors, translators, and a partner
                  congregation come together.
                </p>
              </div>
            </Reveal>
            <Button href="/publications" variant="primary" size="md">
              Full library <ArrowRight size={14} />
            </Button>
          </div>

          <StaggerChildren className="grid-3">
            {LANGUAGES.slice(0, 6).map((lang) => (
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
                      className="font-display"
                      style={{
                        marginTop: 8,
                        fontSize: 24,
                        fontWeight: 500,
                        color: "rgb(var(--brand))",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {lang.native}
                    </p>
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 12,
                        borderTop: "1px solid rgb(var(--border))",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12.5,
                        color: "rgb(var(--ink-faint))",
                      }}
                    >
                      <span>{lang.region}</span>
                      <span>
                        {lang.titles}{" "}
                        {lang.titles === 1 ? "title" : "titles"}
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===================== EVENTS TEASER ===================== */}
      <section
        className="section"
        style={{ background: "rgb(var(--bg-soft))" }}
      >
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
                <span className="section-label">Upcoming</span>
                <h2 className="text-h1">Events &amp; gatherings</h2>
                <p
                  className="text-body"
                  style={{ marginTop: 8, maxWidth: 500 }}
                >
                  Distribution days, pastor trainings, and live podcast
                  recordings across Ethiopia.
                </p>
              </div>
            </Reveal>
            <Link
              href="/events"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              All events →
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

      {/* ===================== STORIES TEASER ===================== */}
      <section className="section">
        <div className="container-wide">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 40,
              alignItems: "center",
            }}
            className="stories-teaser"
          >
            <Reveal>
              <div>
                <span className="section-label">Stories</span>
                <h2 className="text-h1">
                  A Lutheran library, one face at a time.
                </h2>
                <p
                  className="text-body-lg"
                  style={{ marginTop: 12 }}
                >
                  Translators, pastors, Sunday school teachers, and
                  congregation members carry these books into real life.
                </p>
                <div style={{ marginTop: 22 }}>
                  <Button href="/stories" variant="primary" size="md">
                    Read the stories <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </Reveal>

            <StaggerChildren className="grid-2">
              {STORIES.slice(0, 2).map((story) => (
                <StaggerItem key={story.slug}>
                  <Card style={{ height: "100%" }}>
                    <div
                      className="photo-wrap"
                      style={{ aspectRatio: "4 / 3", borderRadius: 0 }}
                    >
                      <SafeImage
                        src={
                          story.photo.startsWith("/")
                            ? PHOTOS.pastor
                            : story.photo
                        }
                        alt={story.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 300px"
                        fallbackLabel={story.role}
                      />
                    </div>
                    <CardBody>
                      <Quote
                        size={14}
                        style={{ color: "rgb(var(--brand))" }}
                      />
                      <p
                        className="font-display"
                        style={{
                          marginTop: 8,
                          fontSize: 16,
                          fontStyle: "italic",
                          lineHeight: 1.5,
                          color: "rgb(var(--ink))",
                          fontWeight: 500,
                        }}
                      >
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <div
                        style={{
                          marginTop: 14,
                          paddingTop: 12,
                          borderTop: "1px solid rgb(var(--border))",
                          fontSize: 12.5,
                        }}
                      >
                        <strong style={{ color: "rgb(var(--ink))" }}>
                          {story.name}
                        </strong>
                        <span style={{ color: "rgb(var(--ink-faint))" }}>
                          {" "}
                          · {story.role}
                        </span>
                        <div
                          style={{
                            color: "rgb(var(--ink-faint))",
                            marginTop: 2,
                          }}
                        >
                          {story.congregation}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .stories-teaser { grid-template-columns: 1fr !important; gap: 24px !important; }
          }
        `}</style>
      </section>

      {/* ===================== VALUES ===================== */}
      <section
        className="section"
        style={{ background: "rgb(var(--bg-soft))" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 44,
              alignItems: "center",
            }}
            className="values-grid"
          >
            <Reveal direction="right">
              <div
                className="photo-wrap"
                style={{ aspectRatio: "4 / 5" }}
              >
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
                <span className="section-label">What we believe</span>
                <h2 className="text-h1">
                  Bible-based. Christ-centered. Reformation-driven.
                </h2>
              </Reveal>
              <StaggerChildren
                style={{ display: "grid", gap: 12, marginTop: 22 }}
              >
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
          @media (max-width: 900px) {
            .values-grid { grid-template-columns: 1fr !important; gap: 26px !important; }
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
                <span className="section-label">Latest</span>
                <h2 className="text-h1">The Word at work</h2>
              </div>
            </Reveal>
            <Link
              href="/news"
              style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
            >
              All updates →
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

      {/* ===================== BIG CTA ===================== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                position: "relative",
                background: "rgb(var(--ink))",
                borderRadius: 20,
                padding: "clamp(32px, 5vw, 64px)",
                color: "white",
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: 28,
                alignItems: "center",
                overflow: "hidden",
              }}
              className="cta-shell"
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 65% 65% at 100% 20%, rgba(159, 31, 42, 0.42), transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(46, 142, 142, 0.30), transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <Users
                    size={15}
                    style={{ color: "rgb(var(--teal-soft))" }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgb(var(--teal-soft))",
                    }}
                  >
                    Adopt a project
                  </span>
                </div>
                <h2 className="text-h1" style={{ color: "white" }}>
                  $7 prints a catechism. $1,200 opens a new language.
                </h2>
                <p
                  className="text-body"
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    marginTop: 10,
                  }}
                >
                  Every project on our list is a real congregation, a real
                  translator, and a real shelf waiting to be filled.
                </p>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Button href="/projects" variant="teal" size="md">
                  See projects needing adoption
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
                  Give where most needed
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cta-shell { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
