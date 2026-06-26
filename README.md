# LHF Ethiopia

Marketing site for **Lutheran Heritage Foundation — Ethiopia**, a regional initiative that translates, prints, and distributes confessional Lutheran books in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaama, and Wolaytta — free of charge.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4 (PostCSS plugin, tokens in `src/app/globals.css`)
- TypeScript
- Path alias: `@/*` → `src/*`

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

```
src/
  app/                Routes: /, /about, /publications, /projects, /news, /donate, /contact
  components/
    layout/           Navbar, Footer
    ui/               Button, Card, Badge, Input/Textarea/Field
  lib/
    content.ts        Site copy, languages, publications, projects, news (TS data)
    utils.ts          cn() class-merge helper
```

Content lives in `src/lib/content.ts` — edit there to update copy, languages, publications, and projects. The site has no backend yet; donation and contact forms are placeholders ready to wire into the LHF US donation processor or a local payment provider.

## Brand

Tokens defined as R/G/B triplets in `src/app/(frontend)/globals.css` and composed via `rgb(var(--…))` so every value supports alpha at the call site.

- **Brand crimson** `#9F1F2A` — chrome, primary CTAs, theme color
- **Navy** `#1E2A47` — secondary chrome on dark sections, headings
- **Teal** `#2E8E8E` — accent, confirmation states
- **Cream** `#F8F6F2` — page background
- **Charcoal** `#121620` — body text

EB Garamond for headings, Inter for body. A tri-color stripe (Ethiopian flag) appears only in the footer as a decorative accent.
