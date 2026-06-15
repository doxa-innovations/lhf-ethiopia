import type { Metadata } from "next";
import { StoriesPageClient } from "@/components/pages/StoriesPageClient";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Translators, pastors, teachers, and congregation members tell what these books mean in real life.",
};

export default function StoriesPage() {
  return <StoriesPageClient />;
}
