"use client";

import { EventsPageClient } from "@/components/pages/EventsPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveEvents } from "./actions";

export default function EditEventsPage() {
  return (
    <EditorProvider mode="page" pageName="events">
      <EventsPageClient />
      <EditorToolbar saveAction={saveEvents} />
    </EditorProvider>
  );
}
