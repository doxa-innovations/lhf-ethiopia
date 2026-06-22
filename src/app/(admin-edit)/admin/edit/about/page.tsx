"use client";

import { AboutPageClient } from "@/components/pages/AboutPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveAbout } from "./actions";

export default function EditAboutPage() {
  return (
    <EditorProvider mode="page" pageName="about">
      <AboutPageClient />
      <EditorToolbar saveAction={saveAbout} />
    </EditorProvider>
  );
}
