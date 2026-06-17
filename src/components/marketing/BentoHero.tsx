"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";

/* ============================================================
   BentoHero — centered serif headline + bento grid of tiles.
   No photo backgrounds: every tile is solid colour, SVG, or
   the locally-served lhflogo.png mark. Renders instantly.
   ============================================================ */
export function BentoHero() {
  const { t } = useT();
  return (
    <section
      className="bento-hero"
      style={{
        position: "relative",
        paddingTop: 116,
        paddingBottom: 56,
        background: "rgb(var(--bg-soft))",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Faint grid backdrop — drawn inline so it stays under the bento. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(to right, rgb(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border) / 0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 80%)",
        }}
      />

      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        {/* ===== HEADLINE BAND ===== */}
        <div style={{ textAlign: "center", maxWidth: 880, marginInline: "auto" }}>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(var(--brand))",
            }}
          >
            6+ {t("common.sectionLanguages")} · {t("common.tagWordAtWork")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-display bento-headline"
            style={{
              marginTop: 14,
              fontSize: "clamp(34px, 7vw, 68px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
            }}
          >
            {t("home.heroTitlePart1")}{" "}
            <em
              style={{
                color: "rgb(var(--brand))",
                fontStyle: "italic",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {t("home.heroTitleEm")}
            </em>{" "}
            {t("home.heroTitlePart2")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg"
            style={{
              marginTop: 16,
              maxWidth: 580,
              marginInline: "auto",
            }}
          >
            {t("home.whatWeDoBody")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            style={{
              marginTop: 22,
              display: "inline-flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button href="/donate" variant="dark" size="lg">
              {t("home.heroCtaPrimary")} <ArrowRight size={15} />
            </Button>
            <Link
              href="/podcast"
              className="btn btn-secondary btn-lg"
              style={{ borderColor: "rgb(var(--border-strong))" }}
            >
              <Youtube size={15} /> {t("home.heroCtaSecondary")}
            </Link>
          </motion.div>
        </div>

        {/* ===== BENTO TILE CLUSTER ===== */}
        <div className="bento-grid" style={{ marginTop: 32 }}>
          {/* TILE: rose monogram (the Luther's Rose mark) */}
          <Tile
            colStart={1}
            rowStart={1}
            colSpan={2}
            rowSpan={2}
            background="rgb(var(--ink))"
            delay={0.34}
          >
            <RoseTile />
          </Tile>

          {/* TILE: bilingual quote card — crimson */}
          <Tile
            colStart={3}
            rowStart={1}
            colSpan={2}
            rowSpan={1}
            background="rgb(var(--brand))"
            delay={0.4}
          >
            <QuoteTile
              line1="One book."
              line2="One language."
              line3="One congregation."
              tone="light"
            />
          </Tile>

          {/* TILE: small stat */}
          <Tile
            colStart={5}
            rowStart={1}
            colSpan={1}
            rowSpan={1}
            background="rgb(var(--surface))"
            border
            delay={0.46}
          >
            <MiniStat value="42k+" label="Books" />
          </Tile>

          {/* TILE: Sola Scriptura — navy */}
          <Tile
            colStart={3}
            rowStart={2}
            colSpan={1}
            rowSpan={1}
            background="rgb(var(--navy))"
            delay={0.5}
          >
            <QuoteTile
              line1="Sola"
              line2="Scriptura"
              tone="light"
              serif
            />
          </Tile>

          {/* TILE: Ethiopia + congregation dots */}
          <Tile
            colStart={4}
            rowStart={2}
            colSpan={2}
            rowSpan={1}
            background="rgb(var(--teal-muted))"
            delay={0.56}
          >
            <EthiopiaTile />
          </Tile>
        </div>
      </div>

      <style>{`
        /* MOBILE-FIRST: single column stack of tiles */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: minmax(120px, auto);
          gap: 10px;
        }
        .bento-tile {
          border-radius: 18px;
          overflow: hidden;
          position: relative;
        }
        .bento-tile-inner {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Mobile: collapse explicit grid coordinates to "auto" so the
           tiles flow normally instead of leaving holes. */
        .bento-tile { grid-column: auto !important; grid-row: auto !important; }

        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            grid-auto-rows: 130px;
            gap: 12px;
          }
          .bento-tile { grid-column: var(--col-start) / span var(--col-span); grid-row: var(--row-start) / span var(--row-span); }
        }
      `}</style>
    </section>
  );
}

function Tile({
  colStart,
  rowStart,
  colSpan,
  rowSpan,
  background,
  border,
  delay = 0,
  children,
}: {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
  background?: string;
  border?: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="bento-tile"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={
        {
          background,
          border: border ? "1px solid rgb(var(--border))" : "none",
          ["--col-start" as string]: colStart,
          ["--col-span" as string]: colSpan,
          ["--row-start" as string]: rowStart,
          ["--row-span" as string]: rowSpan,
        } as React.CSSProperties
      }
    >
      <div className="bento-tile-inner">{children}</div>
    </motion.div>
  );
}

/* ============================================================
   Tile inner contents — all pure CSS / SVG, no image load.
   ============================================================ */

function QuoteTile({
  line1,
  line2,
  line3,
  tone = "light",
  serif = false,
}: {
  line1: string;
  line2?: string;
  line3?: string;
  tone?: "light" | "dark";
  serif?: boolean;
}) {
  return (
    <div
      className={serif ? "font-display" : undefined}
      style={{
        fontSize: "clamp(18px, 2vw, 24px)",
        fontWeight: serif ? 500 : 600,
        color: tone === "light" ? "white" : "rgb(var(--ink))",
        lineHeight: 1.18,
        letterSpacing: "-0.01em",
      }}
    >
      <div>{line1}</div>
      {line2 ? <div>{line2}</div> : null}
      {line3 ? <div>{line3}</div> : null}
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <>
      <div
        className="font-display"
        style={{
          fontSize: "clamp(24px, 3vw, 34px)",
          fontWeight: 500,
          color: "rgb(var(--brand))",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgb(var(--ink-faint))",
        }}
      >
        {label}
      </div>
    </>
  );
}

function RoseTile() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* Single Luther's Rose at large scale; LhfMark backed by /lhflogo.png. */}
      <span
        style={{
          width: "70%",
          maxWidth: 180,
          aspectRatio: "1 / 1",
          backgroundImage: 'url("/lhflogo.png")',
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "invert(1) brightness(1.2)",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 14,
          left: 18,
          right: 18,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
        }}
      >
        The Lutheran Seal · Ethiopia
      </span>
    </div>
  );
}

function EthiopiaTile() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgb(var(--teal-strong))",
          }}
        >
          Heart languages
        </div>
        <div
          className="font-display"
          style={{
            marginTop: 6,
            fontSize: "clamp(18px, 2.2vw, 24px)",
            fontWeight: 500,
            color: "rgb(var(--ink))",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Amharic · Afaan Oromoo · Tigrinya · …
        </div>
      </div>
      <svg
        viewBox="0 0 200 200"
        width="92"
        height="92"
        aria-hidden
        style={{ flexShrink: 0 }}
      >
        <path
          d="
            M 30,40
            L 100,32
            L 160,60
            L 188,110
            L 168,160
            L 110,180
            L 50,170
            L 22,120
            L 12,80
            Z
          "
          fill="rgba(46, 142, 142, 0.18)"
          stroke="rgb(var(--teal-strong))"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <g fill="rgb(var(--brand))">
          <circle cx="80" cy="80" r="3.5" />
          <circle cx="120" cy="90" r="3.5" />
          <circle cx="100" cy="130" r="3.5" />
          <circle cx="60" cy="120" r="3" />
          <circle cx="140" cy="140" r="3" />
        </g>
      </svg>
    </div>
  );
}
