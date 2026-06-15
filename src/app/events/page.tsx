import type { Metadata } from "next";
import { Calendar, MapPin, Users } from "lucide-react";
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
import { EVENTS, PHOTOS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming distribution days, pastor trainings, live podcast recordings, and book-launch events across Ethiopia.",
};

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.status === "Upcoming");
  const past = EVENTS.filter((e) => e.status === "Past");

  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 36,
              alignItems: "center",
            }}
            className="grid-2"
          >
            <Reveal>
              <span className="section-label">Events</span>
              <h1 className="text-display">Show up. Take books home.</h1>
              <p
                className="text-body-lg"
                style={{ marginTop: 14, maxWidth: 520 }}
              >
                Quarterly distribution days, pastor trainings, book launches,
                and live podcast recordings. Most events are free and open to
                Lutheran clergy, teachers, and parish leaders.
              </p>
              <div
                style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <Button href="/contact" variant="primary" size="md">
                  Reserve a spot
                </Button>
                <Button href="/podcast" variant="secondary" size="md">
                  See the podcast
                </Button>
              </div>
            </Reveal>
            <Reveal direction="left">
              <div
                className="photo-wrap"
                style={{ aspectRatio: "4 / 3" }}
              >
                <SafeImage
                  src={PHOTOS.eventGathering}
                  alt="Gathering of Lutheran congregation members"
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
              <span className="section-label">Upcoming</span>
              <h2 className="text-h1">Next on the calendar</h2>
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
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 16px",
                    color: "rgb(var(--ink-faint))",
                  }}
                >
                  No upcoming events scheduled. Check back soon.
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </section>

      {past.length > 0 ? (
        <section
          className="section"
          style={{ background: "rgb(var(--bg-soft))" }}
        >
          <div className="container">
            <Reveal>
              <div style={{ marginBottom: 18 }}>
                <span className="section-label">Past</span>
                <h2 className="text-h1">Recently held</h2>
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

function EventCard({
  ev,
  dimmed,
}: {
  ev: (typeof EVENTS)[number];
  dimmed?: boolean;
}) {
  return (
    <Card
      style={{
        height: "100%",
        opacity: dimmed ? 0.78 : 1,
      }}
    >
      <CardBody>
        <Badge tone={ev.status === "Upcoming" ? "teal" : "cream"}>
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
          <span
            style={{
              display: "inline-flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            <Users size={12} /> {ev.audience}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
