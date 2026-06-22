import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Languages" };

export default function LanguagesAdminPage() {
  return (
    <ComingSoon
      title="Languages"
      description="The translation languages collection — add a new language, mark titles published, set status. Coming next. The labels around the language list are editable today on the home page editor."
      alternative={{ href: "/admin/edit/home", label: "Edit home" }}
    />
  );
}
