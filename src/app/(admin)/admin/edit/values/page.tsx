import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Values" };

export default function ValuesAdminPage() {
  return (
    <ComingSoon
      title="Values"
      description="The eight confessional values shown on the home page. The collection editor (re-order, add, remove) is on the roadmap. The text of each value is currently editable in-place on the home page."
      alternative={{ href: "/admin/edit/home", label: "Edit home" }}
    />
  );
}
