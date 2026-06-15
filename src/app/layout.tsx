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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9F1F2A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ethiopia.lhfmissions.org"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  category: "Non-profit",
  keywords: [
    "Lutheran Heritage Foundation",
    "LHF Ethiopia",
    "Amharic Lutheran books",
    "Afaan Oromoo catechism",
    "Tigrinya Bible stories",
    "Lutheran mission Ethiopia",
    "Ethiopian Christian podcast",
    "Digital outreach Ethiopia",
    "ቃሉ ብቻ",
    "Scripture Alone Podcast",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: "https://ethiopia.lhfmissions.org",
    siteName: SITE.name,
    type: "website",
    locale: "en_ET",
    alternateLocale: ["am_ET", "om_ET"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${garamond.variable}`}
    >
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
