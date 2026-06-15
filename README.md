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

- **Primary blue** `#1B3A6B` — LHF heritage, used for buttons and headings on dark sections
- **Gold** `#E6A817` — Ethiopian-flag-derived accent for CTAs and emphasis (used sparingly)
- **Green** `#0F8A4C` — confirmation states only
- **Cream** `#FAF6EE` — page background
- **Charcoal** `#0E1525` — text

A tri-color stripe (Ethiopian flag) appears only in the footer as a decorative accent.
