import { ComingSoon } from "@/components/admin/ComingSoon";

export const metadata = { title: "Media library" };

export default function MediaAdminPage() {
  return (
    <ComingSoon
      title="Media library"
      description="A browsable view of every uploaded image is on the roadmap. Until then, uploads happen in place from any page editor: hover over an image, click 'Replace photo', pick a file. The file is stored under /uploads/cms/ and recorded in the media table."
      alternative={{ href: "/admin/edit/home", label: "Open home editor" }}
    />
  );
}
