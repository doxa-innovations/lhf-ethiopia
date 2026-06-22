import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Podcast episodes" };

export default function PodcastEpisodesAdminPage() {
  return (
    <ComingSoon
      title="Podcast episodes"
      description="The episode collection (add new, edit title/summary per locale, change featured episode) is the next module to ship. The podcast page heading + intro copy is editable today."
      alternative={{ href: "/admin/edit/podcast", label: "Edit podcast page" }}
    />
  );
}
