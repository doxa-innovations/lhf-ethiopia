import type { Metadata } from "next";
import { DonatePageClient } from "@/components/pages/DonatePageClient";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to LHF Ethiopia. Every dollar goes toward translating, printing, and freely distributing Lutheran books in heart languages across Ethiopia.",
};

export default function DonatePage() {
  return <DonatePageClient />;
}
