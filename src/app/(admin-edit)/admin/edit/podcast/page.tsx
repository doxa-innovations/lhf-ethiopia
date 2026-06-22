"use client";

import { PodcastPageClient } from "@/components/pages/PodcastPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { savePodcast } from "./actions";

export default function EditPodcastPage() {
  return (
    <EditorProvider mode="page" pageName="podcast">
      <PodcastPageClient />
      <EditorToolbar saveAction={savePodcast} />
    </EditorProvider>
  );
}
