"use client";

import { ContactPageClient } from "@/components/pages/ContactPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveContact } from "./actions";

export default function EditContactPage() {
  return (
    <EditorProvider mode="page" pageName="contact">
      <ContactPageClient />
      <EditorToolbar saveAction={saveContact} />
    </EditorProvider>
  );
}
