import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Navbar copy" };

export default function NavAdminPage() {
  return (
    <ComingSoon
      title="Navbar copy"
      description="A dedicated Navbar-only editor will land here. In the meantime the Navbar is rendered above every page editor — open any /admin/edit page and edit the menu items in place."
      alternative={{ href: "/admin/edit/home", label: "Open home editor" }}
    />
  );
}
