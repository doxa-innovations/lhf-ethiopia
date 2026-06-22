"use client";

import HomePage from "@/app/(frontend)/page";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveHome } from "./actions";

export default function EditHomePage() {
  return (
    <EditorProvider mode="page" pageName="home">
      <HomePage />
      <EditorToolbar saveAction={saveHome} />
    </EditorProvider>
  );
}
