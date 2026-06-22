"use client";

import { PublicationsPageClient } from "@/components/pages/PublicationsPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { savePublications } from "./actions";

export default function EditPublicationsPage() {
  return (
    <EditorProvider mode="page" pageName="publications">
      <PublicationsPageClient />
      <EditorToolbar saveAction={savePublications} />
    </EditorProvider>
  );
}
