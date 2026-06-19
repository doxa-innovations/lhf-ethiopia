import type { Metadata } from "next";
import { PodcastPageClient } from "@/components/pages/PodcastPageClient";
import { PODCAST } from "@/lib/content";

export const metadata: Metadata = {
  title: PODCAST.title,
  description: PODCAST.description,
};

export default function PodcastPage() {
  return <PodcastPageClient />;
}
