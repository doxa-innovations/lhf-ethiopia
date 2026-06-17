"use client";

import { Calendar, CalendarPlus, Mail, MapPin, Users } from "lucide-react";
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
import { useContent, type LocalizedContent } from "@/lib/i18n/useContent";
import { PHOTOS, SITE } from "@/lib/content";
import { downloadIcs } from "@/lib/ics";

type Event = LocalizedContent["events"][number];

export function EventsPageClient() {
  const { t } = useT();
  const { events } = useContent();
  const upcoming = events.filter((e) => e.status === "Upcoming");
  const past = events.filter((e) => e.status === "Past");

  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid-2" style={{ gap: 36, alignItems: "center" }}>
            <Reveal>
              <span className="section-label">{t("events.label")}</span>
              <h1 className="text-display">{t("events.title")}</h1>
              <p className="text-body-lg" style={{ marginTop: 14, maxWidth: 520 }}>
                {t("events.intro")}
              </p>
              <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button href="/contact" variant="primary" size="md">{t("common.reserveSpot")}</Button>
                <Button href="/podcast" variant="secondary" size="md">{t("common.seePodcast")}</Button>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div className="photo-wrap" style={{ aspectRatio: "4 / 3" }}>
                <SafeImage
                  src={PHOTOS.eventGathering}
                  alt="Gathering"
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                  fallbackLabel="Gathering"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: 18 }}>
              <span className="section-label">{t("common.sectionUpcoming")}</span>
              <h2 className="text-h1">{t("events.upcomingTitle")}</h2>
            </div>
          </Reveal>
          {upcoming.length > 0 ? (
            <StaggerChildren className="grid-3">
              {upcoming.map((ev) => (
                <StaggerItem key={ev.slug}>
                  <EventCard ev={ev} />
                </StaggerItem>
              ))}
            </StaggerChildren>
          ) : (
            <Card>
              <CardBody>
                <div style={{ textAlign: "center", padding: "32px 16px", color: "rgb(var(--ink-faint))" }}>
                  <Calendar size={28} style={{ marginInline: "auto", marginBottom: 10, color: "rgb(var(--ink-faint))" }} />
                  <div>{t("events.noUpcoming")}</div>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </section>

      {past.length > 0 ? (
        <section className="section section-soft">
          <div className="container">
            <Reveal>
              <div style={{ marginBottom: 18 }}>
                <span className="section-label">{t("common.sectionPast")}</span>
                <h2 className="text-h1">{t("events.pastTitle")}</h2>
              </div>
            </Reveal>
            <StaggerChildren className="grid-3">
              {past.map((ev) => (
                <StaggerItem key={ev.slug}>
                  <EventCard ev={ev} dimmed />
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>
      ) : null}
    </>
  );
}

function EventCard({ ev, dimmed }: { ev: Event; dimmed?: boolean }) {
  const { t } = useT();
  const isUpcoming = ev.status === "Upcoming";
  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `RSVP — ${ev.title}`,
  )}&body=${encodeURIComponent(
    `Hello LHF Ethiopia,\n\nI would like to attend "${ev.title}" on ${ev.date} at ${ev.location}.\n\nThank you,\n`,
  )}`;

  return (
    <Card
      style={{ height: "100%", opacity: dimmed ? 0.78 : 1, display: "flex", flexDirection: "column" }}
      className="card-lift"
    >
      <CardBody style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Badge tone={isUpcoming ? "teal" : "cream"}>
          <Calendar size={11} /> {ev.statusLabel}
        </Badge>
        <h3 className="text-h3" style={{ marginTop: 12, overflowWrap: "anywhere" }}>{ev.title}</h3>
        <p className="text-body" style={{ marginTop: 8 }}>{ev.summary}</p>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgb(var(--border))", display: "grid", gap: 4, fontSize: 12.5, color: "rgb(var(--ink-muted))" }}>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Calendar size={12} />{" "}
            {new Date(ev.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center", overflowWrap: "anywhere" }}>
            <MapPin size={12} /> {ev.location}
          </span>
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center", overflowWrap: "anywhere" }}>
            <Users size={12} /> {ev.audience}
          </span>
        </div>
        {isUpcoming ? (
          <div
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: "1px solid rgb(var(--border))",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() =>
                downloadIcs({
                  slug: ev.slug,
                  title: ev.title,
                  date: ev.date,
                  location: ev.location,
                  summary: ev.summary,
                })
              }
              className="btn btn-sm"
              style={{
                background: "rgb(var(--brand))",
                color: "white",
                borderColor: "rgb(var(--brand))",
              }}
            >
              <CalendarPlus size={13} /> {t("events.addToCalendar")}
            </button>
            <a
              href={mailtoHref}
              className="btn btn-sm btn-secondary"
            >
              <Mail size={13} /> {t("events.emailOffice")}
            </a>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
