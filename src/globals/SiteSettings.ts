import type { GlobalConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange } = revalidateRoutes(["/"]);

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  admin: {
    group: "Site",
    description: "Org metadata used by the layout, footer, and SEO.",
  },
  access: {
    read: () => true,
    update: isEditorOrAbove,
  },
  hooks: { afterChange: [afterChange] },
  fields: [
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    { name: "address", type: "text", required: true },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "youtube", type: "text" },
        { name: "spotify", type: "text" },
        { name: "applePodcasts", type: "text" },
        { name: "telegram", type: "text" },
      ],
    },
    {
      name: "featuredYoutubeId",
      type: "text",
      admin: { description: "Hero podcast player on home + /podcast." },
    },
    { name: "tagline", type: "text", localized: true, required: true },
    { name: "siteDescription", type: "textarea", localized: true, required: true },
  ],
};

// Casting to satisfy the `update: isAdmin` access shape Payload expects on globals.
isAdmin;
