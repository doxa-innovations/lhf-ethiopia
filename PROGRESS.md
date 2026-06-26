# LHF Ethiopia — Project Progress & Handoff

> Snapshot for a fresh Claude conversation. Read this first, then
> [`PROJECT.md`](./PROJECT.md) for the discovery + decision document
> the LHF IT manager will mark up.
>
> Last updated: 2026-06-26

---

## Session log — 2026-06-26 — Frontend-only ship prep

**Goal of the session:** wrap up and deploy the public frontend on
Yegara (Ethiopian cloud) while the admin/CMS work continues locally.
No DB and no auth required on the production deploy.

### Shipped (commits on `main`, pushed)

- `edc9b06` — **Frontend-only deploy mode.** New `src/lib/admin-flag.ts`
  gates `/admin/*`, `/admin/edit/*`, `/api/admin/*`, and
  `/api/auth/*` on `process.env.ENABLE_ADMIN === "true"`. When unset:
  layouts return `notFound()`, API routes return 404 without ever
  loading `pg`/`bcryptjs`/NextAuth, middleware is a no-op,
  `getPublishedElements()` returns empty so `<EditableText>` falls
  back to its baked-in `defaultValue`, and `env.ts` no longer
  requires `DATABASE_URL` or `AUTH_SECRET`. Flip to admin mode later
  by setting `ENABLE_ADMIN=true` + DB + AUTH_SECRET — no code change.
- `a3db16d` — **`DEPLOYMENT.md` rewritten.** Stale Payload/Docker
  Compose runbook replaced with a clean Yegara nginx + pm2 + certbot
  + Node 20 LTS playbook. Documents both frontend-only and full
  modes, plus how to flip between them.
- `5ded0ef` — **Canonical domain swapped to `lhfethiopia.org`.**
  Updated SITE_URL, sitemap.ts, robots.ts, DEPLOYMENT.md (apex + www
  with www→apex redirect, certbot for both), and Caddyfile (rewrote
  to support bare-metal `reverse_proxy 127.0.0.1:3000` instead of
  the old Docker-network assumption).
- `48f4d99` — **OG image + robots fix + README brand sync.**
  - `src/app/(frontend)/opengraph-image.tsx` (edge runtime) emits a
    1200×630 brand-crimson social card with Luther's Rose, brand
    wordmark, tagline, language list, and `lhfethiopia.org` footer.
    Removed the small `/icon` reference from `layout.tsx`
    `openGraph.images` so file convention wins.
  - `robots.ts` moved from `(frontend)/` to `src/app/` root —
    Next 16 Turbopack wasn't picking up the file convention inside
    a route group (sitemap inside the same group works, but robots
    did not). `/robots.txt` now resolves.
  - `README.md` brand section now reflects the shipped crimson +
    navy + teal palette instead of the aspirational
    blue/gold/green that was never implemented.

### Verified locally

- `npm run build` clean with **no** `DATABASE_URL` / `AUTH_SECRET` /
  `ENABLE_ADMIN` set. 38 routes emitted. TypeScript clean.
- Boot test on port 3302 with no env vars:
  - `/`, `/about`, `/publications`, `/podcast`, `/projects`,
    `/events`, `/news`, `/donate`, `/contact`,
    `/news/tigrinya-catechism-reprint`, `/sitemap.xml`,
    `/robots.txt`, `/opengraph-image-…` → **all 200**.
  - `/admin`, `/admin/edit/home`, `/admin/login`, `/api/auth/csrf`
    → **all 404** (gated, as intended).
- OG image inspected: clean 1200×630 PNG, brand crimson, legible at
  thumbnail size.

### Outstanding before public launch (owner action required)

**Content placeholders** in `src/lib/content.ts`:
- `SITE.phone "+251 911 000 000"` — dummy.
- `SITE.social.facebook/instagram/youtube` — point at US parent
  (`lhfmissions`, `lhfbooks`), not LHF Ethiopia accounts.
- `SITE.social.spotify/applePodcasts` — bare service roots, no show
  ID. (Real Scripture Alone Podcast URLs exist deeper in
  `content.ts` ~line 441–445 — point SITE.social there or remove.)
- `SITE.address "Bole Sub-City, Addis Ababa, Ethiopia"` — generic.
- `SITE.email "Info@lhfethiopia.org"` — confirm exists/monitored.
- Donate page has no `action` / payment processor wired. Decide:
  Chapa/Telebirr now, redirect to LHF US parent, or explicit
  bank-transfer / mail copy.
- Contact form `onSubmit` is a no-op.
- Newsletter footer signup is `mailto:`, not a real list.
- All `PHOTOS.*` are Unsplash URLs (flagged in code comment).
- Afaan Oromoo dictionary self-declared "placeholder-quality" in
  header.
- News (4), events (5), projects (5), stories (5) — round numbers,
  future-precise 2026 dates, "Pastor Tadesse" appearing in both
  stories and events suggests seed data. Confirm which are real.

**A11y blockers** (can fix in one pass on go):
1. `<html lang="en">` hardcoded in layout, only client-side patched
   after hydration. Amharic + Afaan Oromoo ship to screen readers as
   English for first paint.
2. `/podcast` skips heading levels h1 → h3 on episode cards.
3. `--ink-faint #8A919E` on cream fails AA at ~2.9:1. Used for
   captions, placeholders, nav sub-label, mobile-nav group labels.
   Bump to ~`#5F6470`.
4. Footer copyright `rgba(255,255,255,0.5)` on navy is ~3.3:1, fails
   AA. Bump alpha to ≥0.72.
5. Footer newsletter `<input>` has no `aria-label`, has
   `outline:none`, no replacement focus ring.
6. No skip-to-content link.

**Pre-deploy reminders:**
- Rotate `AUTH_SECRET` only matters when admin is on — for the
  frontend-only deploy, leave it unset.
- Point both `lhfethiopia.org` and `www.lhfethiopia.org` A records at
  the Yegara VM IP; nginx + certbot configs in `DEPLOYMENT.md`
  handle the www→apex redirect.

---

## 1. What this is

A trilingual marketing + donor website for **Lutheran Heritage Foundation —
Ethiopia (LHF Ethiopia)**, a regional initiative of the Lutheran Heritage
Foundation (LHF, Macomb, MI). Translates, prints, and freely distributes
confessional Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali,
Sidaamu Afoo, and Wolayttattuwaa. Hosts the **Scripture Alone Podcast** as a
featured digital-outreach programme.

- **Local path:** `~/Documents/Github/lhf-ethiopia`
- **GitHub:** https://github.com/Cherireal7/lhf-ethiopia (auto-redirects to
  `doxa-innovations/lhf-ethiopia`; pushes succeed via redirect)
- **Branch:** `main`
- **Dev URL:** http://localhost:3000
- **Target prod URL:** `https://lhfethiopia.org` (org-owned, confirmed 2026-06-26)
- **Host:** Yegara (Ethiopian cloud) — Ubuntu + Node 20 + nginx + pm2 + certbot. See `DEPLOYMENT.md`.

## 2. Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack), React 19.2.4
- **Styling:** Tailwind CSS v4 via PostCSS plugin (tokens in
  `src/app/globals.css`, no `tailwind.config.js`)
- **TypeScript:** strict
- **Path alias:** `@/*` → `src/*`
- **Animation:** `motion` (formerly framer-motion)
- **Charts:** `apexcharts` + `react-apexcharts` (themed via CSS vars)
- **Radix primitives:** dialog, accordion, tabs, scroll-area
- **Fonts:** EB Garamond (display) + Inter (sans), both via `next/font/google`
- **Logo source:** `public/lhflogo.png` (official rose mark, wide canvas)
- **No backend.** Forms are placeholders; donate is a pass-through plan.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## 3. Brand tokens (verified against lhfmissions.org screenshot)

| Token | Value | Use |
|---|---|---|
| `--brand` | `#9F1F2A` (159 31 42) | Primary crimson. CTAs, accents, headings on dark. |
| `--brand-strong` | `#7F1821` (127 24 33) | Crimson hover |
| `--brand-soft` | rgb(196 86 92) | Italic emphasis text on hero |
| `--navy` | `#1E2A47` (30 42 71) | Dark sections, footer, stats band |
| `--navy-strong` | (18 28 52) | Hero / stats band base |
| `--teal` | `#2E8E8E` (46 142 142) | **Donate CTA** (matches LHF.org actual) |
| `--teal-soft` | (102 178 178) | Accent on dark |
| `--ink` | `#121620` | Body text |
| `--bg` | white | Site background |
| `--bg-soft` | `#F8F6F2` | Section bands |

Typography: EB Garamond serif headings (mobile-first clamps, scaled down
~10% for `lang="om"`); Inter body.

**No flag colours.** `.flag-stripe` has been removed; tri-colour
(green/yellow/red) motifs are deliberately retired sitewide. Single
`.brand-accent` crimson hairline replaces it.

## 4. Routes (all static-prerendered)

| Route | Page | Client component |
|---|---|---|
| `/` | `src/app/page.tsx` | (inline) |
| `/about` | `app/about/page.tsx` | `AboutPageClient.tsx` |
| `/publications` | `app/publications/page.tsx` | `PublicationsPageClient.tsx` |
| `/podcast` | `app/podcast/page.tsx` | `PodcastPageClient.tsx` |
| `/projects` | `app/projects/page.tsx` | `ProjectsPageClient.tsx` |
| `/events` | `app/events/page.tsx` | `EventsPageClient.tsx` |
| `/news` | `app/news/page.tsx` | `NewsPageClient.tsx` |
| `/donate` | `app/donate/page.tsx` | `DonatePageClient.tsx` |
| `/contact` | `app/contact/page.tsx` | `ContactPageClient.tsx` |
| `/icon` | `app/icon.tsx` | Generates 64×64 Luther's Rose PNG favicon via `next/og` |
| `/sitemap.xml` | `app/sitemap.ts` | All pages + hreflang for en/am/om |
| `/robots.txt` | `app/robots.ts` | Allow all, points to sitemap |

**Removed:** `/stories` was deleted (page, client component, nav entry,
home teaser). `STORIES` array still in `content.ts` for future use.

## 5. Key directories

```
src/
├── app/                   Routes (server pages + globals.css + icon + sitemap + robots)
├── components/
│   ├── brand/            LhfMark (background-cropped logo), LuthersRose (SVG primitives)
│   ├── charts/           Chart wrapper (dynamic-imported react-apexcharts) + chart-theme
│   ├── layout/           Navbar (with dropdowns), NavDropdown, Footer
│   ├── marketing/        BentoHero, StatsBand, ImpactCharts, AllocationDonut, HeroBackdrop (unused on home), GridBackdrop
│   ├── pages/            *PageClient components, one per /<route>
│   ├── podcast/          YouTubeEmbed (lite-iframe), PodcastBrowser (search + topic filter)
│   ├── providers/        LanguageProvider, LanguageSwitcher, LanguagePromptModal
│   └── ui/               Button, Card, Badge, Input/Textarea/Field, Reveal, SafeImage, etc.
└── lib/
    ├── content.ts        All site copy: SITE, NAV_GROUPS, LANGUAGES, PROJECTS, EVENTS, NEWS, VALUES, STORIES (orphaned), PODCAST_EPISODES, PHOTOS, charts data
    ├── i18n/
    │   └── dictionary.ts EN + AM + OM strings, typed by section
    └── utils.ts          cn() class merger
```

## 6. i18n

- `LanguageProvider` in `src/components/providers/LanguageProvider.tsx`
- `useT()` hook returns `{ locale, setLocale, t, promptOpen, closePrompt, detectedLocale }`
- Choice persists in `localStorage` under `lhf-ethiopia.locale`
- First-visit modal auto-detects browser language and offers a chooser
- Dictionary keys typed as `TKey` union — every component uses `t("section.key")`
- Coverage: nav, common, home, about, publications, podcast, projects,
  events, news, donate, contact, footer, navMenu, languageModal
- **Body content** in `content.ts` arrays (PROJECTS, EVENTS, NEWS,
  PUBLICATIONS, VALUES) is still English-only — flagged in the
  dictionary header as the next translation pass

## 7. Navigation (post-categorization)

6 top-level + Donate CTA. Two grouped dropdowns:

- **Home** (link)
- **About** ▾ (Mission, What We Believe)
- **Library** ▾ (Publications, Podcast)
- **Engage** ▾ (Projects, Events)
- **News** (link)
- **Contact** (link)
- **Donate** (teal pill CTA on right)

Defined in `NAV_GROUPS` in `src/lib/content.ts`. Dropdown component:
`src/components/layout/NavDropdown.tsx` — opens on hover or click,
items carry title + description.

Mobile: simple sticky white bar with logo + 40×40 hamburger; menu
inlines group children under uppercase group headers.

## 8. Hero + stats (current design)

- **Hero:** `BentoHero.tsx`. Centered headline on cream + faint
  blueprint-grid backdrop, then a 5-tile bento cluster:
  1. Black tile — Luther's Rose mark (inverted from `lhflogo.png`)
  2. Crimson tile — "One book. / One language. / One congregation."
  3. Cream tile — "42k+ Books" mini-stat
  4. Navy tile — "Sola Scriptura" in serif italic
  5. Teal-muted tile — hand-traced Ethiopia outline with crimson dots
- **Stats band:** `StatsBand.tsx`. Navy panel with masked SVG dot texture,
  4 stats divided by hairlines, each = icon-circle + serif number + label.

**No photo backgrounds anywhere on home.** User explicitly asked for
no-image hero (load time). `PHOTOS.*` still used on About / Publications /
Projects / Podcast for content imagery.

## 9. Podcast

- **Real channel:** Scripture Alone Podcast (`UCH4uGyZQCCvrppCIFN_V_Wg`)
  https://www.youtube.com/@scripturealonepodcast6447
- `PODCAST` constant in `content.ts` has channel URL, native title
  `ቃሉ ብቻ ፖድካስት`, Spotify + Apple URLs from RSS, Telegram link
- 8 episodes wired with real `youtubeId` (4 full episodes 126–129 +
  4 shorts)
- `YouTubeEmbed.tsx` — lite-loader: thumbnail with click-to-play,
  iframe loads on click via `youtube-nocookie.com`
- `PodcastBrowser.tsx` — client-side search + topic chip filter
  (All / Bible Study / Doctrine / Catechism / Music)

## 10. SEO

- `app/layout.tsx` — Organization (NGO) + WebSite JSON-LD in `<head>`,
  full Metadata with canonical + per-locale hreflang, OG image points
  at `/icon`
- `app/sitemap.ts` — all routes, hreflang for en/am/om
- `app/robots.ts` — allow all, points to sitemap
- Expanded keywords include Book of Concord, Sola Scriptura,
  `ቃሉ ብቻ ፖድካስት`, etc.

## 11. Donations, photography, email

- **Email everywhere:** `Info@lhfethiopia.org` (set once via `SITE.email`)
- **Donate page** = placeholder form. PROJECT.md D6 still pending —
  recommendation is **manual bank-transfer instructions + pass-through
  to LHF.org for international card givers** for v1. No Chapa, no
  Stripe.
- **Photography:** placeholder Unsplash URLs in `PHOTOS`, each entry
  carries a `[TODO]` comment requesting traditional Ethiopian /
  Lalibela / Ge'ez / fresco replacements. `SafeImage` wrapper falls
  back to a brand-tinted placeholder if a URL 404s — site never
  breaks on a missing image.

## 12. Mobile-first

- `globals.css` rewritten mobile-first — every rule targets a 360px
  phone first; `min-width` breakpoints at 480 / 768 / 1024 / 1180 add
  density.
- Buttons 44px min-height on phones (iOS HIG), 42px from md.
- Inputs 16px font on phones to stop iOS auto-zoom.
- Container + section padding scale 16/44 → 24/72.
- Display heading clamps from 26→52px via `clamp(28px, 7.5vw, 52px)`;
  `lang="om"` shrinks ~10% extra to keep Oromoo words from wrapping
  awkwardly.

## 13. Pending decisions (PROJECT.md, sections § = numbered Dx)

The LHF IT manager has not yet replied. 18 numbered decisions await
sign-off — most important:

- **D2 / D3** confirm typography + palette
- **D4** PDF downloads y/n
- **D6** payment flow (current recommendation: A + B = manual + LHF.org passthrough)
- **D7** bank account details to publish
- **D8** file storage (R2 vs in-repo vs Issuu)
- **D9** real photography
- **D10** site bilingual y/n (i18n is already wired so this is approval, not work)
- **D11** CMS decision (TS objects → markdown → Payload roadmap)
- **D12** mailing list provider
- **D14** legal entity / privacy / terms
- **D15** domain + hosting
- **D16** podcast feed canonical home (Spotify for Podcasters? Buzzsprout?)
- **D17** transcripts y/n
- **D18** event RSVP y/n

## 14. Commit timeline (most recent first)

| SHA | Title |
|---|---|
| `8a80630` | Bento hero, textured stats band, fix nav-underline crash, rose to right |
| `22c2c39` | Ethiopia + Rose hero, drop Stories, dropdown nav, expanded confessional values, SEO |
| `4a22911` | Geometric SVG hero, restyled stats, real Info@ email |
| `118f871` | Real LHF logo, clean nav bar, compact languages list, modern grouped footer |
| `b1ab199` | Mobile-first refactor: tokens, grids, touch targets, breakpoints flipped |
| `59b60b5` | Luther's Rose logo + favicon, static stats, traditional imagery, full i18n on every page |
| `b7e8627` | Trilingual i18n (EN/AM/OM), floating-pill navbar, image hero, no gradients |
| `2570562` | Initial LHF Ethiopia website |

## 15. Known issues / next steps

- **Body content arrays** (PROJECTS, EVENTS, NEWS, PUBLICATIONS) still
  English regardless of locale. Each entry needs `{ en, am, om }` shape
  for full trilingual content. Editorial effort, not engineering.
- **Donation flow** is a placeholder. Once D6/D7 land, wire either a
  mailto: confirmation, an LHF.org passthrough, or a real processor.
- **Newsletter signup** in the footer is `mailto:Info@lhfethiopia.org`
  for now. Swap to Mailchimp / Resend audience when D12 lands.
- **Stories** is gone but the `STORIES` array is still in `content.ts`
  and three `STORIES` strings remain in the i18n dictionary
  (`home.storiesTitle`, etc.). Safe to leave (unused but typed); or
  prune in a small cleanup pass.
- **`PHOTOS.*` Unsplash placeholders** need replacement with real
  Ethiopian imagery. Every entry carries a TODO comment.
- **Animated counters** (Counter component) still exist in
  `src/components/ui/Counter.tsx` but are unused — `StatBlock`
  renders plain numbers per user feedback.
- **HeroBackdrop, LuthersRose, MarqueeStrip, StatBlock, GridBackdrop**
  are exported but no longer used on the home page. Kept available
  for future sections; safe to leave or prune.

## 16. Memory snapshot

Two relevant entries in `~/.claude/projects/.../memory`:

- `project_lhf-ethiopia.md` — project context, brand, stack, scope
- `feedback_ui-sizing.md` — marketing sites should target 14" laptop
  scale, not 27" monitor
- `feedback_git-integration.md` — don't auto-rebase on rejected push
- `reference_fida-infra.md` — note the git identity caveat: this repo
  was created without global git config; commits use inline
  `-c user.name=cherireal7 -c user.email=cheridemeke7@gmail.com`

## 17. How to push

```bash
cd ~/Documents/Github/lhf-ethiopia
git add -A
git -c user.name=cherireal7 -c user.email=cheridemeke7@gmail.com \
  commit -m "your message"
git push   # currently goes through Cherireal7 → doxa-innovations redirect
```

To switch to the canonical remote URL:

```bash
git remote set-url origin https://github.com/doxa-innovations/lhf-ethiopia.git
```
