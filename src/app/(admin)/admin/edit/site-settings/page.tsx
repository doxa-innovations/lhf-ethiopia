import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Site settings" };

export default function SiteSettingsAdminPage() {
  return (
    <ComingSoon
      title="Site settings"
      description="Site-wide configuration — contact email, phone, address, social links, featured podcast episode. The typed form is the next admin module to ship. These fields live in the site_settings table today."
    />
  );
}
