import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { LanguagePromptModal } from "@/components/providers/LanguagePromptModal";
import { SITE } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const SITE_URL = "https://ethiopia.lhfmissions.org";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9F1F2A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  category: "Non-profit",
  authors: [{ name: "Lutheran Heritage Foundation Ethiopia", url: SITE_URL }],
  creator: "Lutheran Heritage Foundation Ethiopia",
  publisher: "Lutheran Heritage Foundation Ethiopia",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      am: "/?lang=am",
      om: "/?lang=om",
    },
  },
  keywords: [
    "Lutheran Heritage Foundation",
    "LHF Ethiopia",
    "Amharic Lutheran books",
    "Afaan Oromoo catechism",
    "Tigrinya Bible stories",
    "Luther's Small Catechism Amharic",
    "Sola Scriptura podcast",
    "ቃሉ ብቻ ፖድካስት",
    "Ethiopia Lutheran mission",
    "Scripture Alone Podcast",
    "Lutheran Church Ethiopia",
    "Book of Concord",
    "confessional Lutheran Ethiopia",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
    locale: "en_ET",
    alternateLocale: ["am_ET", "om_ET"],
    images: [
      {
        url: "/icon",
        width: 64,
        height: 64,
        alt: "LHF Ethiopia — Luther's Rose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.longName,
  alternateName: "LHF Ethiopia",
  legalName: SITE.longName,
  url: SITE_URL,
  logo: `${SITE_URL}/lhflogo.png`,
  image: `${SITE_URL}/lhflogo.png`,
  description: SITE.description,
  parentOrganization: {
    "@type": "Organization",
    name: "Lutheran Heritage Foundation",
    url: "https://lhfmissions.org",
  },
  areaServed: {
    "@type": "Country",
    name: "Ethiopia",
  },
  knowsLanguage: ["en", "am", "om", "ti", "so", "sid"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bole Sub-City",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.youtube],
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE_URL,
  inLanguage: ["en-ET", "am-ET", "om-ET"],
  publisher: { "@type": "NGO", name: SITE.longName },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_LD) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <LanguagePromptModal />
        </LanguageProvider>
      </body>
    </html>
  );
}
