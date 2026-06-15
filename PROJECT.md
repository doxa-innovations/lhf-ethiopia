# LHF Ethiopia — Project Discovery Document

> **Status: DRAFT for review by the LHF IT manager.**
> Every section marked **DECISION NEEDED** is an open question — please mark
> approve / reject / modify directly on this document, or send replies by
> section number. Once decisions are locked, the dev team will rebuild against
> them in one focused pass.
>
> Last updated: 2026-06-15 (rev 2: podcast + events + verified palette)

---

## 1. What this is

A new public marketing + donor website for **Lutheran Heritage Foundation —
Ethiopia (LHF Ethiopia)**, a regional initiative of the Lutheran Heritage
Foundation (LHF, Macomb, MI). The site exists to:

1. **Explain LHF Ethiopia** to congregations, pastors, donors, and partners.
2. **Show the library** — books published and in progress in Amharic, Afaan
   Oromoo, Tigrinya, Somali, Sidaamu Afoo, and (planned) Wolayttattuwaa.
3. **Surface adoption projects** — concrete translation and print campaigns
   that donors can sponsor by name.
4. **Receive book requests** from Ethiopian congregations.
5. **Accept donations** designated to Ethiopian work.
6. **Host LHF Ethiopia's digital outreach** — currently a weekly podcast
   ("The Word at Work — Ethiopia") featuring music, scripture, translation,
   and the people doing the work. A professional studio is in the forecast.
7. **List events** — quarterly distribution days, pastor trainings, book
   launches, live podcast recordings.

A working first build is already live locally (`~/Documents/Github/lhf-ethiopia`,
Next.js 16 + Tailwind v4 + ApexCharts + Motion). This document captures what
should ship in the **public launch version** and what needs the IT manager's
sign-off first.

---

## 2. Goals & success criteria

| # | Goal | How we measure it |
|---|---|---|
| G1 | Anyone landing on the site understands LHF Ethiopia's mission in <10 seconds | Hero copy + photography test reads at-a-glance |
| G2 | A pastor in Hawassa can request books for their parish in <2 minutes | Contact / Request-a-Book form ships < 2 min on mobile |
| G3 | A US-based donor can make a designated gift to Ethiopia in <2 minutes | Donate page, designation field pre-fills "Ethiopia" |
| G4 | The site loads in <2 seconds on a 3G connection in Ethiopia | Lighthouse mobile ≥ 90, hero LCP < 2.5 s |
| G5 | Content editors can update news, projects, and stories without a developer | CMS or low-friction Git editing path |

---

## 3. Audience

| Audience | Primary action on site |
|---|---|
| Ethiopian Lutheran pastor / teacher / parish leader | Request books, contact the office |
| Ethiopian translator or print partner | Learn about open projects, get in touch |
| US / international Lutheran donor | Adopt a project, give to Ethiopia, subscribe |
| LCMS partner organization | Verify legitimacy, find contact, link to LHF parent |
| Press / researcher | Find leadership, statistics, annual reports |

---

## 4. Reference: pages on lhfmissions.org (parent site)

Captured from the live parent site so we can decide what to mirror, what to
adapt, and what to skip.

```
Top nav:
├── About
│   ├── Mission Statement & Statement of Faith
│   ├── What Others Are Saying About LHF
│   ├── Where & How We Work (interactive map)
│   ├── Staff & Representatives
│   ├── Board of Directors
│   └── Annual Reports & Financials
├── Publications
│   ├── Find a Publication (search)
│   ├── Request a Book
│   ├── Request Spanish Books
│   ├── Enviar Tu Pedido
│   ├── LHF Chinese Resources
│   └── Read Online (Issuu)
├── Adopt a Project
│   ├── Projects Needing Adoption
│   ├── Children's Mission Projects
│   └── LWML: Jesus Saved Me
├── News
│   ├── The Word at Work
│   ├── The Word at Work Online Newsletter
│   ├── LHF in South Sudan        (regional spotlight — we model "LHF Ethiopia" on this)
│   ├── LHF Spanish Projects
│   └── Global Mission Requests
├── Resources
│   ├── Mission Speakers
│   ├── River of Life VBS
│   ├── Sudan Seminary Educator Information
│   ├── Printable Projects List
│   ├── Printable Publication List
│   ├── How to Build Excitement for Mission Projects
│   └── Event Calendar
└── Support
    ├── Donate
    ├── LHF Match
    ├── Faithful Stewards
    ├── Thrivent Opportunities
    ├── Receive LHF Emails
    ├── 10 Ways to Support
    ├── Endowment Fund
    └── Sola Fide (Estate Planning)
```

**Observation:** LHF.org is built for a US donor + global mission programme.
LHF Ethiopia is a regional chapter — we don't need to mirror every nav item.
The proposed site map in §5 strips this down to what's relevant for Ethiopia
and respects that LHF.org remains the donor system of record.

---

## 5. Proposed site map (LHF Ethiopia)

Pages that **already exist** in the local build are marked ✅. Pages **proposed
for v1** are 🆕. Anything else is a Phase-2 candidate.

| Page | Status | Purpose |
|---|---|---|
| `/` Home | ✅ | Hero, mission, podcast feature, languages, charts, events, stories, news |
| `/about` | ✅ | History, why Ethiopia, values, leadership, parent org |
| `/about/leadership` | 🆕 | Staff & board portraits (mirrors LHF.org Staff/Board) |
| `/about/financials` | 🆕 | Latest annual report + audit summary (PDF) |
| `/publications` | ✅ | Library overview + table of titles |
| `/publications/library` | 🆕 | **Searchable publication viewer** — see §7 |
| `/publications/request` | 🆕 | Dedicated Request-a-Book form (currently rolled into /contact) |
| `/podcast` | ✅ | **The Word at Work — Ethiopia** episode archive with search + topic filter |
| `/podcast/[slug]` | 🆕 | Individual episode page with player + transcript |
| `/projects` | ✅ | Adoption projects with progress bars |
| `/projects/[slug]` | 🆕 | Individual project detail page |
| `/events` | ✅ | Upcoming + past distribution days, trainings, launches, live recordings |
| `/events/[slug]` | 🆕 | Individual event detail page (RSVP) |
| `/stories` | ✅ | Pastor / teacher / translator portraits + quotes |
| `/news` | ✅ | List of updates |
| `/news/[slug]` | 🆕 | Individual news article page |
| `/news/newsletter` | 🆕 | "The Word at Work — Ethiopia edition" archive |
| `/resources` | 🆕 | Mission speakers, printable lists |
| `/donate` | ✅ | Donate form (payment flow — see §8) |
| `/contact` | ✅ | General contact |
| `/privacy` | 🆕 | Privacy policy (required) |
| `/terms` | 🆕 | Terms of use (required) |

**DECISION NEEDED — D1.** Approve / modify this site map. Anything LHF wants
that isn't listed here? Anything that should be cut?

---

## 6. Brand & visual direction (verified against screenshot)

**Current build palette (verified from lhfmissions.org screenshot, 2026-06-15):**
- Primary crimson: `#9F1F2A` (banner, headings on dark, primary CTA)
- Secondary navy: `#1E2A47` (footer, dark sections, sub-band beneath header)
- CTA accent teal: `#2E8E8E` (matches LHF's actual Donate button color)
- Background: pure white `#FFFFFF` + warm off-white `#FAF8F5` for section bands
- Text: near-black with navy tilt `#121620`

**Headings:** EB Garamond (classical serif, free on Google Fonts) — visually
close to the engraved-serif LHF wordmark.
**Body:** Inter (sans, kept from first pass).

**DECISION NEEDED — D2 (re-confirm).** Approve EB Garamond, or specify a
different serif if LHF has a licensed brand font (Garamond Premier Pro,
Adobe Caslon, Source Serif, etc.).

**DECISION NEEDED — D3 (re-confirm).** Approve the verified palette above
(crimson + navy + teal + white). Any tweaks to exact hex values?

**Design principles applied in v2:**
- Modern, sleek, uncluttered, generous negative space
- **Compact scale for 14" laptops** — display headings cap at ~52px (was 76);
  section padding 72/48; container ≤1260
- **Glass effect** on navbar (frosted blur over hero) and on dark photo
  overlays (episode list, hero collage, podcast hero)
- Serif headings on sans body — quietly editorial, not poster-loud
- Photography-forward — real Ethiopian congregations and faces wherever
  possible (placeholders currently from Unsplash; see §10)
- Crimson + teal CTAs only; navy for dark sections; gold reserved for the
  decorative Ethiopian-flag stripe
- Charts and stats present but never dominant — narrative comes first

---

## 7. Publications viewer (new feature)

A **searchable library** at `/publications/library` so visitors can find
titles by language, audience (children / adults / pastors), or keyword.

**Phase 1 (data source: JSON in repo, no backend):**
- Search box (debounced, client-side filter)
- Filters: language, audience, status (In print / In translation / Requested)
- Each result card: title (English + native script), language, audience, pages
- "Read online" link → Issuu page if available
- "Request a copy" link → contact form pre-filled with the title

**DECISION NEEDED — D4.** Should the viewer offer **PDF downloads** of full
books, or only metadata + "request a copy" + Issuu reading link?
- **Option A — Metadata only + Issuu link.** Simplest. No file storage. No
  copyright friction. *(Recommended for v1.)*
- **Option B — Direct PDF downloads.** Requires us to host the PDFs (see §9).
  Requires LHF to confirm every title is cleared for free public download.

**DECISION NEEDED — D5.** Is there a master publications spreadsheet at LHF
(parent) we can ingest, or do we maintain the Ethiopia-only catalog by hand?

---

## 8. Donations & payment processing

**Current build:** the Donate page collects an amount, designation, and a
message — but does not actually charge.

**DECISION NEEDED — D6.** How should donations flow on launch day?

| Option | What happens | Tradeoff |
|---|---|---|
| **A. Manual payment (recommended for v1)** | The form shows bank transfer details (US + Ethiopia), check mailing address, and a "Notify us you've given" button that emails the office | No payment integration to build, certify, or maintain. Slower for donors. |
| B. Pass-through to LHF.org/donate | Donate button on our site jumps to the existing LHF parent donation page with `?designate=Ethiopia` pre-filled | Re-uses LHF's existing payment processor + tax receipts. No on-site checkout. |
| C. Local processor (Chapa, telebirr) for ETB donations | On-site Chapa checkout for Ethiopian donors; LHF.org passthrough for international | Real money flow in ETB. Requires Chapa merchant account + KYC + ongoing reconciliation. |
| D. Stripe / global card processing | Full on-site checkout, USD | Requires merchant entity + PCI + receipts + chargeback handling. |

**Recommendation for v1:** **A + B.** Manual instructions for Ethiopian
donors, pass-through to LHF.org for international card givers. Defer C/D
until donation volume justifies the operational overhead.

**DECISION NEEDED — D7.** If Option A is approved: provide the exact bank
account number, branch, SWIFT (if any), and beneficiary name LHF Ethiopia
should publish. Also: which email address should receive "I gave" notifications?

---

## 9. File storage (PDFs, photos, annual reports)

**DECISION NEEDED — D8.** Does the site need to host files (book PDFs, annual
reports, newsletters)?

| Option | When to use | Notes |
|---|---|---|
| **A. Static files in the repo** | A handful of small PDFs (<10) updated rarely | Free, no infra. Files redeploy with the site. Recommended if total < 50 MB. |
| B. Cloudflare R2 / S3 bucket | Many PDFs or large files (book PDFs are typically 5–50 MB each) | Cheap (≈$0–5/mo at our scale). Adds an upload workflow. |
| C. Issuu / external reader | LHF parent already uses Issuu for "Read Online" | Free, but visitors leave our site. Already integrated by parent. |

**Recommendation:** **A** for annual reports + the newsletter PDF (few, small).
**C** for book reading. Revisit **B** only if LHF wants downloadable PDFs.

---

## 10. Photography

**Current state:** every page uses Unsplash stock photos as placeholders, with
graceful fallback if any URL fails. None are of actual LHF Ethiopia people,
events, or congregations.

**DECISION NEEDED — D9.** Real photography source for launch:
- Existing LHF photo library (request access)
- New commissioned shoot in Addis / Mekelle / Hawassa (cost & timeline?)
- Stay on stock for soft launch, swap progressively

**Specific image needs (with consent for public use):**
- 1 hero shot (congregation, classroom, or book distribution)
- 5 portrait photos for the Stories page (pastor, teacher, translator,
  deaconess, printer — names and quotes already drafted, see `src/lib/content.ts`)
- 3 process shots (translation desk, print floor, distribution)
- 1 leadership team photo
- 1 office / warehouse exterior

---

## 11. Languages & internationalization

**DECISION NEEDED — D10.** Should the site itself be **bilingual** (English +
Amharic, with optional Afaan Oromoo)?

| Option | Effort | Notes |
|---|---|---|
| **A. English only for v1** | None | Audience leans donor (English) + bilingual Ethiopian leaders. Recommended. |
| B. English + Amharic via toggle | ~1 week | Doubles content load on every edit |
| C. English + Amharic + Afaan Oromoo | ~2 weeks | Most editorially heavy |

Book content remains in the target heart language regardless — this is only
about the marketing site's own copy.

---

## 12. Content editing & CMS

**DECISION NEEDED — D11.** Who edits news, projects, stories, and
publication entries after launch?

| Option | Who edits | How |
|---|---|---|
| **A. Developer-edited (v1)** | Dev team | Edit `src/lib/content.ts` and redeploy. Lowest cost. |
| B. Git-based markdown | Anyone with GitHub access | News and stories become `.md` files; non-tech editors can use GitHub web UI |
| C. Headless CMS (Payload, Sanity) | Non-technical staff | Friendly admin UI. Adds DB infra. |

**Recommendation:** start at **A**, move to **B** when editorial volume
crosses ~2 updates per week. **C** only if LHF Ethiopia hires a dedicated
content editor.

---

## 13. Email / mailing list

**DECISION NEEDED — D12.** Newsletter signup destination?
- LHF parent's mailing system (Mailchimp / Constant Contact?) — passthrough
- LHF Ethiopia's own list (which provider?)
- No mailing list at launch — defer

---

## 14. Analytics & privacy

**DECISION NEEDED — D13.** Approve:
- **Plausible** or **Umami** (privacy-friendly, no cookie banner needed)
- vs. **Google Analytics 4** (free, more features, requires GDPR/Ethiopia
  consent banner)

Either way we need:
- A Privacy Policy page (currently missing — see §5)
- A Terms of Use page (currently missing)
- **DECISION NEEDED — D14.** Provide the legal entity name, registration
  number, and physical address LHF Ethiopia should publish.

---

## 15. Domain & hosting

**DECISION NEEDED — D15.** Confirm:
- Domain: `ethiopia.lhfmissions.org` (subdomain of parent) **or** `lhfethiopia.org` (independent)?
- Hosting: Vercel / Cloudflare Pages / self-hosted? (Static export works on any of them.)
- TLS / certificate ownership

---

## 16. Open critical questions for LHF management

These are not tech decisions — they're operational/legal ones that need
sign-off from the LHF Ethiopia leadership and IT manager before launch.

1. **Legal entity status** of LHF Ethiopia — registered NGO? Branch of LHF
   parent? This affects donation receipts, bank accounts, tax claims.
2. **Bank accounts** for donations (ETB and USD) — exact details to publish.
3. **Authorized signers / contact** for press, partnership, and book requests.
4. **Statement of Faith** — should we publish ours separately, or link to LHF
   parent's? (LHF parent publishes one under About.)
5. **Doctrinal review** of all published English content (a Lutheran pastor on
   the LHF Ethiopia side should sign off).
6. **Photo & quote consent** — every face and quote in `/stories` needs
   written consent for public use.
7. **Data-protection law in Ethiopia** — any local rules about storing
   visitor data, especially form submissions and email lists?

---

## 17. Technical decisions (informational, not blocking)

Captured here so the IT manager understands the stack but doesn't have to
approve every detail.

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Modern React, fast builds, good SEO |
| Styling | Tailwind CSS v4 | Token-based palette, easy to repaint when D3 is decided |
| Animation | `motion` (formerly framer-motion) | Already proven in the BizBridge build |
| Charts | ApexCharts | Already proven in BizBridge |
| Hosting | TBD (D15) — static export works anywhere | Zero server cost at our scale |
| Content | TS objects (Phase 1) → MD or CMS (Phase 2) | Defers infra cost until earned |

---

## 18. Phasing & rollout

| Phase | Scope | Trigger to ship |
|---|---|---|
| Phase 0 (done) | First-pass build with 7 pages, palette/animations/charts | Internal review only |
| **Phase 1 — Launch v1** | All §5 ✅ + 🆕 pages, palette/typography locked (D2, D3), donations resolved (D6), photos updated (D9), privacy + terms (D14), bilingual decision (D10) | Sign-off on D1–D15 |
| Phase 2 — Editor empowerment | Move content to markdown or Payload CMS (D11), Issuu integration, newsletter system (D12) | When editorial volume justifies |
| Phase 3 — Local payments | Chapa / telebirr (D6 Option C) | When ETB donation volume earns the integration cost |

---

## 18b. Digital outreach (new in rev 2)

LHF Ethiopia's chief is building a music-focused podcast ("The Word at Work —
Ethiopia"). The site features it as a top-line programme:

- **`/podcast`** — searchable episode archive, topic + language filter, Spotify
  / Apple Podcasts / YouTube / RSS links, host bio, latest-episode card on the
  homepage hero.
- **Studio:** professional recording studio in the forecast; project-list
  entry created so donors can sponsor acoustic treatment + microphones.
- **Episode data:** currently 8 mock episodes in `src/lib/content.ts` → swap
  to a JSON file or Spotify/Apple feed parser before launch.

**DECISION NEEDED — D16.** Where will the canonical podcast feed live?
- Spotify for Podcasters (free, generates the RSS we ingest)
- Buzzsprout / Transistor (paid, ~$12–19/mo, better analytics)
- Self-hosted on R2 + a hand-rolled RSS

**DECISION NEEDED — D17.** Should episodes have **transcripts** for SEO and
accessibility? (Recommended yes — adds ~$5–10/episode for AI transcription.)

## 18c. Events (new in rev 2)

`/events` lists upcoming distribution days, pastor trainings, book launches,
and live podcast recordings. Five sample events seeded; replace with real
calendar before launch.

**DECISION NEEDED — D18.** Should events offer **RSVP** (we collect name +
email + parish) or just display info? RSVP requires either a form-handler
service (Formspree, Resend webhook) or the headless CMS in §12.

## 19. Out of scope (for now)

- Native mobile app
- Online congregation directory / map
- Live event streaming (we record and post episodes after, not live broadcast)
- Multi-tenant chapters (e.g., LHF Kenya / LHF Ghana co-hosted on the same code)
- On-site PDF reader for books (we link out to Issuu instead)

---

## 20. How to respond to this document

Reply by **decision number**:

> D1: approve as listed but add `/events` page
> D2: heading font = "Source Serif Pro"; body font = "Inter"
> D3: primary = `#1E2A4F` navy, secondary = `#C8312A` red, white background
> D6: Option A only — no LHF.org passthrough for now
> …

Once decisions are in, dev re-renders against the locked spec in one focused
pass rather than iterating on every change. Expected build time after
sign-off: 2–3 working days.
