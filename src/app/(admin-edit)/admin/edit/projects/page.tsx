"use client";

import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";
import { EditorProvider } from "@/components/cms/EditorProvider";
import { EditorToolbar } from "@/components/cms/EditorToolbar";
import { saveProjects } from "./actions";

export default function EditProjectsPage() {
  return (
    <EditorProvider mode="page" pageName="projects">
      <ProjectsPageClient />
      <EditorToolbar saveAction={saveProjects} />
    </EditorProvider>
  );
}
