"use client";

import { DonatePageClient } from "@/components/pages/DonatePageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveDonate } from "./actions";

export default function EditDonatePage() {
  return (
    <EditorProvider mode="page" pageName="donate">
      <DonatePageClient />
      <EditorToolbar saveAction={saveDonate} />
    </EditorProvider>
  );
}
