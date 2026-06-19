import type { CollectionConfig } from "payload";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { isAdmin } from "@/access/isAdmin";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    // In dev we store originals under public/uploads; in prod the storage-s3
    // plugin redirects them to Cloudflare R2. The plugin only patches the
    // adapter — collection config below stays the same in both modes.
    staticDir: "public/uploads",
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"],
    imageSizes: [
      { name: "thumb", width: 300, height: 300, position: "center" },
      { name: "card", width: 800, height: 600, position: "center" },
      { name: "hero", width: 1600, height: 900, position: "center" },
    ],
    adminThumbnail: "thumb",
    crop: true,
    focalPoint: true,
  },
  admin: {
    useAsTitle: "filename",
    group: "Site",
    description:
      "Upload photos here once, then attach them to news, projects, stories, etc. Always fill in alt text for accessibility.",
  },
  access: {
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isAdmin,
    read: () => true, // public read so the website can render <img> tags
  },
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
      admin: {
        description:
          "Short description for screen readers. Write it in every locale you publish in.",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
      admin: {
        description: "Optional photo caption shown under the image.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Photographer / source credit (English, not localized).",
      },
    },
  ],
};
