"use client";

import { NewsPageClient } from "@/components/pages/NewsPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveNews } from "./actions";

export default function EditNewsPage() {
  return (
    <EditorProvider mode="page" pageName="news">
      <NewsPageClient />
      <EditorToolbar saveAction={saveNews} />
    </EditorProvider>
  );
}
