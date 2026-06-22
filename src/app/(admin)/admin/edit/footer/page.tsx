import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Footer copy" };

export default function FooterAdminPage() {
  return (
    <ComingSoon
      title="Footer copy"
      description="A dedicated Footer-only editor will land here. In the meantime the Footer is rendered below every page editor — open any /admin/edit page and scroll to the bottom to edit it in place."
      alternative={{ href: "/admin/edit/home", label: "Open home editor" }}
    />
  );
}
