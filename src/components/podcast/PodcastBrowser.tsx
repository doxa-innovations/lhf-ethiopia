"use client";

import { useMemo, useState } from "react";
import { Headphones, Mic, Search, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { Badge, Card, CardBody, Input } from "@/components/ui";
import { PODCAST_EPISODES, PODCAST } from "@/lib/content";
import { useT } from "@/components/providers/LanguageProvider";

type Episode = (typeof PODCAST_EPISODES)[number];

const TOPICS = [
  "All",
  "Bible Study",
  "Doctrine",
  "Catechism",
  "Music",
] as const;
type Topic = (typeof TOPICS)[number];

const TOPIC_LABEL_KEYS: Record<Topic, string> = {
  All: "podcast.filterAll",
  "Bible Study": "podcast.filterBibleStudy",
  Doctrine: "podcast.filterDoctrine",
  Catechism: "podcast.filterCatechism",
  Music: "podcast.filterMusic",
};

const isPlaceholder = (id: string) => id.startsWith("PLACEHOLDER");

export function PodcastBrowser() {
  const { t } = useT();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<Topic>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PODCAST_EPISODES.filter((ep) => {
      if (topic !== "All" && ep.topic !== topic) return false;
      if (!q) return true;
      return (
        ep.title.toLowerCase().includes(q) ||
        ep.summary.toLowerCase().includes(q) ||
        ep.guest.toLowerCase().includes(q) ||
        ep.language.toLowerCase().includes(q) ||
        ep.topic.toLowerCase().includes(q)
      );
    });
  }, [query, topic]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 16,
          marginBottom: 22,
        }}
        className="podcast-controls"
      >
        <div style={{ position: "relative" }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgb(var(--ink-faint))",
              pointerEvents: "none",
            }}
          />
          <Input
            type="search"
            placeholder={t("podcast.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {TOPICS.map((topicValue) => {
            const active = topicValue === topic;
            return (
              <button
                key={topicValue}
                type="button"
                onClick={() => setTopic(topicValue)}
                style={{
                  border: "1px solid rgb(var(--border-strong))",
                  background: active ? "rgb(var(--ink))" : "white",
                  color: active ? "white" : "rgb(var(--ink-muted))",
                  borderColor: active
                    ? "rgb(var(--ink))"
                    : "rgb(var(--border-strong))",
                  borderRadius: 999,
                  padding: "5px 12px",
                  fontSize: 12.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 180ms ease",
                }}
              >
                {t(TOPIC_LABEL_KEYS[topicValue] as Parameters<typeof t>[0])}
              </button>
            );
          })}
        </div>
      </div>

      <p
        style={{
          fontSize: 12.5,
          color: "rgb(var(--ink-faint))",
          marginBottom: 14,
        }}
      >
        {(filtered.length === 1
          ? t("podcast.resultsCountSingular")
          : t("podcast.resultsCount")
        ).replace("{n}", String(filtered.length))}
        {topic !== "All" ? ` · ${t(TOPIC_LABEL_KEYS[topic] as Parameters<typeof t>[0])}` : ""}
      </p>

      <div className="grid-3">
        {filtered.map((ep) => (
          <EpisodeCard key={ep.slug} ep={ep} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <Card style={{ marginTop: 12 }}>
          <CardBody>
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
                color: "rgb(var(--ink-faint))",
              }}
            >
              No episodes match that search.
            </div>
          </CardBody>
        </Card>
      ) : null}

      <style>{`
        @media (max-width: 900px) {
          .podcast-controls { grid-template-columns: 1fr !important; }
          .podcast-controls > div:last-child { justify-content: flex-start !important; }
        }
      `}</style>
    </div>
  );
}

function EpisodeCard({ ep }: { ep: Episode }) {
  const placeholder = isPlaceholder(ep.youtubeId);
  const watchHref = placeholder
    ? PODCAST.channelUrl
    : `https://www.youtube.com/watch?v=${ep.youtubeId}`;

  return (
    <motion.div
      id={ep.slug}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card style={{ height: "100%" }}>
        <a
          href={watchHref}
          target="_blank"
          rel="noreferrer"
          style={{
            position: "relative",
            display: "block",
            aspectRatio: "16 / 9",
            background: "rgb(var(--navy-strong))",
            overflow: "hidden",
          }}
        >
          {placeholder ? (
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 26,
              }}
            >
              #{ep.number}
            </span>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                alt={ep.title}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.22)",
                }}
              />
            </>
          )}

          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              padding: "4px 8px",
              borderRadius: 6,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              backdropFilter: "blur(4px)",
            }}
          >
            <Youtube size={11} /> YouTube
          </span>

          <span
            aria-hidden
            className="ep-play"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 52,
              height: 36,
              borderRadius: 8,
              background: "rgba(0,0,0,0.78)",
              display: "grid",
              placeItems: "center",
              transition: "background 180ms ease, transform 180ms ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          </span>

          <span
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              bottom: 8,
              color: "white",
              fontSize: 12,
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            <span>{ep.durationMin} min</span>
            <span>#{ep.number}</span>
          </span>
        </a>

        <CardBody>
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            <Badge tone="navy">
              <Mic size={11} /> {ep.topic}
            </Badge>
            <Badge tone="cream">{ep.language}</Badge>
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: 17,
              fontWeight: 500,
              color: "rgb(var(--ink))",
              lineHeight: 1.25,
            }}
          >
            {ep.title}
          </h3>
          <p
            style={{
              marginTop: 6,
              fontSize: 13,
              color: "rgb(var(--ink-muted))",
              lineHeight: 1.55,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {ep.summary}
          </p>
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid rgb(var(--border))",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 12,
              color: "rgb(var(--ink-faint))",
            }}
          >
            <span>
              {new Date(ep.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <a
              href={watchHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                color: "rgb(var(--brand))",
                fontWeight: 600,
                fontSize: 12.5,
              }}
            >
              <Youtube size={13} /> Watch
            </a>
          </div>
        </CardBody>
      </Card>

      <style>{`
        .youtube-embed button:hover .ep-play,
        a:hover .ep-play { background: #FF0000 !important; transform: translate(-50%, -50%) scale(1.08) !important; }
      `}</style>
    </motion.div>
  );
}
