import type { Metadata } from "next";
import { EventsPageClient } from "@/components/pages/EventsPageClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming distribution days, pastor trainings, live podcast recordings, and book-launch events across Ethiopia.",
};

export default function EventsPage() {
  return <EventsPageClient />;
}
