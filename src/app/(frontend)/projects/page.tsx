import type { Metadata } from "next";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";

export const metadata: Metadata = {
  title: "Adopt a Project",
  description:
    "Sponsor a specific LHF Ethiopia translation, reprint, or distribution project.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
