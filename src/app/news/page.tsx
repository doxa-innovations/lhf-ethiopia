import type { Metadata } from "next";
import { NewsPageClient } from "@/components/pages/NewsPageClient";

export const metadata: Metadata = {
  title: "News",
  description:
    "Updates from translation teams, distribution runs, and congregations served by LHF Ethiopia.",
};

export default function NewsPage() {
  return <NewsPageClient />;
}
