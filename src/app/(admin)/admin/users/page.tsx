import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Users" };

export default function UsersAdminPage() {
  return (
    <ComingSoon
      title="Users"
      description="Invite a colleague, reset a password, change someone's role. The user management screen is on the roadmap. Until then, run the seed script or insert into the users table directly to add an editor."
      alternative={{ href: "/admin/account", label: "Your account" }}
    />
  );
}
