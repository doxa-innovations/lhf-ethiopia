import type { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/AboutPageClient";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `Who we are: ${SITE.description}`,
};

export default function AboutPage() {
  return <AboutPageClient />;
}
