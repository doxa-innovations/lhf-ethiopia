"use client";

import { Play, Youtube } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const isPlaceholder = (id: string) => id.startsWith("PLACEHOLDER");

/**
 * Lite YouTube embed: shows the YouTube thumbnail with a play button on top,
 * and only loads the heavy iframe player after a click. Falls back to a brand
 * placeholder when the video ID hasn't been wired yet.
 */
export function YouTubeEmbed({
  videoId,
  title,
  className,
  aspectRatio = "16 / 9",
  channelHref,
}: {
  videoId: string;
  title: string;
  className?: string;
  aspectRatio?: string;
  channelHref?: string;
}) {
  const [active, setActive] = useState(false);
  const placeholder = isPlaceholder(videoId);

  return (
    <div
      className={cn("youtube-embed", className)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: 14,
        overflow: "hidden",
        background: "rgb(var(--ink))",
      }}
    >
      {placeholder ? (
        <PlaceholderCard title={title} channelHref={channelHref} />
      ) : active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play: ${title}`}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            background: "transparent",
            border: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              const t = e.currentTarget;
              t.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 72,
              height: 50,
              borderRadius: 12,
              background: "rgba(0, 0, 0, 0.78)",
              display: "grid",
              placeItems: "center",
              transition: "background 180ms ease, transform 180ms ease",
              backdropFilter: "blur(2px)",
            }}
            className="yt-play-btn"
          >
            <Play size={24} fill="white" color="white" />
          </span>
          <span
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 14,
              color: "white",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "-0.005em",
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              lineHeight: 1.3,
            }}
          >
            {title}
          </span>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "4px 8px",
              borderRadius: 6,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              backdropFilter: "blur(4px)",
            }}
          >
            <Youtube size={12} /> YouTube
          </span>
        </button>
      )}

      <style>{`
        .youtube-embed button:hover .yt-play-btn {
          background: #FF0000 !important;
          transform: translate(-50%, -50%) scale(1.06) !important;
        }
      `}</style>
    </div>
  );
}

function PlaceholderCard({
  title,
  channelHref,
}: {
  title: string;
  channelHref?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(135deg, rgb(var(--brand-strong)) 0%, rgb(var(--navy-strong)) 100%)",
        color: "white",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <Youtube size={36} style={{ marginInline: "auto", marginBottom: 12 }} />
        <div
          className="font-display"
          style={{
            fontSize: 19,
            fontWeight: 500,
            lineHeight: 1.25,
            maxWidth: 360,
            margin: "0 auto",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.04em",
          }}
        >
          YouTube video ID pending — paste it into{" "}
          <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 5px", borderRadius: 4 }}>
            src/lib/content.ts
          </code>
        </div>
        {channelHref ? (
          <a
            href={channelHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: 16,
              padding: "8px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              fontSize: 13,
              fontWeight: 600,
              color: "white",
              backdropFilter: "blur(8px)",
            }}
          >
            <Youtube size={14} /> Visit channel
          </a>
        ) : null}
      </div>
    </div>
  );
}
