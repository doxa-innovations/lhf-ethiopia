"use client";

import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { Button, Parallax } from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { EditableText } from "@/components/cms/EditableText";

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
      <Parallax
        speed={0.22}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage:
              "linear-gradient(to right, rgb(var(--border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--border) / 0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 35%, black 35%, transparent 80%)",
          }}
        />
      </Parallax>

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
            6+{" "}
            <EditableText
              elementId="common.sectionLanguages"
              defaultValue={t("common.sectionLanguages")}
            />{" "}
            ·{" "}
            <EditableText
              elementId="common.tagWordAtWork"
              defaultValue={t("common.tagWordAtWork")}
            />
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
            <EditableText
              elementId="home.heroTitlePart1"
              defaultValue={t("home.heroTitlePart1")}
            />{" "}
            <em
              style={{
                color: "rgb(var(--brand))",
                fontStyle: "italic",
                fontWeight: 500,
                display: "inline",
              }}
            >
              <EditableText
                elementId="home.heroTitleEm"
                defaultValue={t("home.heroTitleEm")}
              />
            </em>{" "}
            <EditableText
              elementId="home.heroTitlePart2"
              defaultValue={t("home.heroTitlePart2")}
            />
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
            <EditableText
              elementId="home.whatWeDoBody"
              defaultValue={t("home.whatWeDoBody")}
              multiline
            />
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
              <EditableText
                elementId="home.heroCtaPrimary"
                defaultValue={t("home.heroCtaPrimary")}
              />{" "}
              <ArrowRight size={15} />
            </Button>
            <Link
              href="/podcast"
              className="btn btn-secondary btn-lg"
              style={{ borderColor: "rgb(var(--border-strong))" }}
            >
              <Youtube size={15} />{" "}
              <EditableText
                elementId="home.heroCtaSecondary"
                defaultValue={t("home.heroCtaSecondary")}
              />
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
            tile="rose"
          >
            <RoseTile
              sealLabel={
                <EditableText
                  elementId="home.bentoSeal"
                  defaultValue={t("home.bentoSeal")}
                />
              }
            />
          </Tile>

          {/* TILE: bilingual quote card — crimson */}
          <Tile
            colStart={3}
            rowStart={1}
            colSpan={2}
            rowSpan={1}
            background="rgb(var(--brand))"
            delay={0.4}
            tile="quote"
          >
            <QuoteTile
              line1={
                <EditableText
                  elementId="home.bentoLine1"
                  defaultValue={t("home.bentoLine1")}
                />
              }
              line2={
                <EditableText
                  elementId="home.bentoLine2"
                  defaultValue={t("home.bentoLine2")}
                />
              }
              line3={
                <EditableText
                  elementId="home.bentoLine3"
                  defaultValue={t("home.bentoLine3")}
                />
              }
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
            tile="stat"
          >
            <BooksBackdrop />
            <MiniStat
              value="42k+"
              label={
                <EditableText
                  elementId="home.bentoBooksLabel"
                  defaultValue={t("home.bentoBooksLabel")}
                />
              }
            />
          </Tile>

          {/* TILE: Sola Scriptura — navy */}
          <Tile
            colStart={3}
            rowStart={2}
            colSpan={1}
            rowSpan={1}
            background="rgb(var(--navy))"
            delay={0.5}
            tile="sola"
          >
            <ScriptureBackdrop />
            <QuoteTile
              line1={
                <EditableText
                  elementId="home.bentoSolaLine1"
                  defaultValue={t("home.bentoSolaLine1")}
                />
              }
              line2={
                <EditableText
                  elementId="home.bentoSolaLine2"
                  defaultValue={t("home.bentoSolaLine2")}
                />
              }
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
            tile="ethiopia"
          >
            <EthiopiaTile
              heartLangsLabel={
                <EditableText
                  elementId="home.bentoHeartLangsLabel"
                  defaultValue={t("home.bentoHeartLangsLabel")}
                />
              }
              langList={
                <EditableText
                  elementId="home.bentoLangList"
                  defaultValue={t("home.bentoLangList")}
                  multiline
                />
              }
            />
          </Tile>
        </div>
      </div>

      <style>{`
        /* MOBILE-FIRST: single column stack of tiles */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: minmax(120px, auto);
          gap: 12px;
        }
        .bento-tile {
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 12px 30px -14px rgba(18, 22, 32, 0.22);
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
            grid-auto-rows: 140px;
            gap: 18px;
            align-items: stretch;
          }
          .bento-tile {
            grid-column: var(--col-start) / span var(--col-span);
            grid-row: var(--row-start) / span var(--row-span);
          }
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
  tile,
  children,
}: {
  colStart: number;
  rowStart: number;
  colSpan: number;
  rowSpan: number;
  background?: string;
  border?: boolean;
  delay?: number;
  tile: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="bento-tile"
      data-tile={tile}
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
  line1: React.ReactNode;
  line2?: React.ReactNode;
  line3?: React.ReactNode;
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
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>{line1}</div>
      {line2 ? <div>{line2}</div> : null}
      {line3 ? <div>{line3}</div> : null}
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: React.ReactNode }) {
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
          position: "relative",
          zIndex: 1,
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
          position: "relative",
          zIndex: 1,
        }}
      >
        {label}
      </div>
    </>
  );
}

/* Stack of catechisms drawn behind the "42k+ books" stat tile — the
   brand-crimson spines fade in from the bottom-right corner so the
   text stays legible on the left. */
function BooksBackdrop() {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      style={{
        position: "absolute",
        right: -18,
        bottom: -14,
        width: "78%",
        height: "auto",
        opacity: 0.42,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="bookSpine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(var(--navy))" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="bookSpineAlt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--teal-strong))" stopOpacity="0.85" />
          <stop offset="100%" stopColor="rgb(var(--navy))" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* Bottom stack — three horizontal books */}
      <rect x="30" y="140" width="150" height="18" rx="2" fill="url(#bookSpine)" />
      <rect x="30" y="140" width="6" height="18" fill="rgba(255,255,255,0.35)" />
      <rect x="40" y="158" width="140" height="16" rx="2" fill="url(#bookSpineAlt)" />
      <rect x="40" y="158" width="5" height="16" fill="rgba(255,255,255,0.28)" />
      <rect x="34" y="174" width="150" height="14" rx="2" fill="url(#bookSpine)" />
      {/* Standing books on top */}
      <rect x="60" y="90" width="14" height="48" rx="1.5" fill="url(#bookSpine)" />
      <rect x="60" y="90" width="14" height="4" fill="rgba(255,255,255,0.5)" />
      <rect x="78" y="82" width="14" height="56" rx="1.5" fill="url(#bookSpineAlt)" />
      <rect x="78" y="82" width="14" height="4" fill="rgba(255,255,255,0.5)" />
      <rect x="96" y="96" width="14" height="42" rx="1.5" fill="url(#bookSpine)" />
      <rect x="114" y="88" width="14" height="50" rx="1.5" fill="url(#bookSpineAlt)" />
      {/* Cross inscribed on the tallest spine — a quiet nod to the mission */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round">
        <line x1="85" y1="102" x2="85" y2="118" />
        <line x1="80" y1="108" x2="90" y2="108" />
      </g>
    </svg>
  );
}

/* Open-Bible / illuminated-page backdrop for the Sola Scriptura tile.
   Warm parchment page behind the navy background, subtle so the serif
   quote reads first. */
function ScriptureBackdrop() {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      style={{
        position: "absolute",
        right: -12,
        bottom: -8,
        width: "72%",
        height: "auto",
        opacity: 0.28,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255, 245, 220, 0.9)" />
          <stop offset="100%" stopColor="rgba(255, 240, 200, 0.6)" />
        </linearGradient>
      </defs>
      {/* Left page */}
      <path
        d="M 20 60 Q 100 40 100 40 L 100 175 Q 100 175 20 190 Z"
        fill="url(#page)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      {/* Right page */}
      <path
        d="M 100 40 Q 100 40 180 60 L 180 190 Q 100 175 100 175 Z"
        fill="url(#page)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      {/* Text lines on left page */}
      <g stroke="rgba(30, 42, 71, 0.55)" strokeWidth="1.3" strokeLinecap="round">
        <line x1="30" y1="80" x2="88" y2="76" />
        <line x1="30" y1="92" x2="90" y2="88" />
        <line x1="30" y1="104" x2="86" y2="100" />
        <line x1="30" y1="116" x2="90" y2="112" />
        <line x1="30" y1="128" x2="84" y2="124" />
        <line x1="30" y1="140" x2="88" y2="136" />
        <line x1="30" y1="152" x2="82" y2="148" />
      </g>
      {/* Text lines on right page */}
      <g stroke="rgba(30, 42, 71, 0.55)" strokeWidth="1.3" strokeLinecap="round">
        <line x1="112" y1="76" x2="170" y2="80" />
        <line x1="110" y1="88" x2="170" y2="92" />
        <line x1="114" y1="100" x2="170" y2="104" />
        <line x1="110" y1="112" x2="168" y2="116" />
        <line x1="116" y1="124" x2="170" y2="128" />
        <line x1="110" y1="136" x2="168" y2="140" />
        <line x1="118" y1="148" x2="170" y2="152" />
      </g>
      {/* Illuminated initial — small cross-in-circle on the right page */}
      <g>
        <circle cx="150" cy="70" r="6" fill="rgb(var(--brand))" opacity="0.75" />
        <g stroke="rgba(255,245,220,0.9)" strokeWidth="1.2" strokeLinecap="round">
          <line x1="150" y1="66" x2="150" y2="74" />
          <line x1="146" y1="70" x2="154" y2="70" />
        </g>
      </g>
    </svg>
  );
}

function RoseTile({ sealLabel }: { sealLabel: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "12px 14px 14px",
      }}
    >
      {/* Single Luther's Rose. The source PNG is a wide canvas with the rose
          on the LEFT and a wordmark trailing to the right — clip the
          background to the rose region by sizing it to the container square
          and aligning to the left edge of the (taller) image. */}
      <span
        aria-hidden
        style={{
          width: "min(48%, 110px)",
          aspectRatio: "1 / 1",
          backgroundImage: 'url("/lhflogo.png")',
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          filter: "invert(1) brightness(1.2)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
          overflowWrap: "anywhere",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: "100%",
        }}
      >
        {sealLabel}
      </span>
    </div>
  );
}

function EthiopiaTile({
  heartLangsLabel,
  langList,
}: {
  heartLangsLabel: React.ReactNode;
  langList: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "center",
        gap: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgb(var(--teal-strong))",
            overflowWrap: "anywhere",
          }}
        >
          {heartLangsLabel}
        </div>
        <div
          className="font-display"
          style={{
            marginTop: 6,
            fontSize: "clamp(13px, 1.7vw, 17px)",
            fontWeight: 500,
            color: "rgb(var(--ink))",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            overflowWrap: "anywhere",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {langList}
        </div>
      </div>
      <svg
        viewBox="0 0 200 200"
        width="68"
        height="68"
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
