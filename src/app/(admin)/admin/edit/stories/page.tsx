import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Stories" };

export default function StoriesAdminPage() {
  return (
    <ComingSoon
      title="Stories"
      description="Member testimonies — the collection list and the form for adding/editing stories is the next admin module to ship. The text already shown on /stories is editable from the home and about page editors today."
      alternative={{ href: "/admin/edit/home", label: "Edit home" }}
    />
  );
}
