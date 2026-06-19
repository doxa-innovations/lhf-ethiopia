import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/news", "/news/[slug]", "/"]);

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "publishedAt", "_status"],
    group: "Editorial",
    description: "Updates from translation desks, print floors, and congregations served.",
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  access: {
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isAdmin,
    read: () => true,
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    { name: "slug", type: "text", unique: true, required: true, index: true },
    {
      name: "publishedAt",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "tag",
      type: "select",
      required: true,
      defaultValue: "Distribution",
      options: [
        { label: "Distribution", value: "Distribution" },
        { label: "Publication", value: "Publication" },
        { label: "Translation", value: "Translation" },
        { label: "Operations", value: "Operations" },
        { label: "Event", value: "Event" },
      ],
    },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Short headline — written per locale." },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      required: true,
      admin: { description: "1–2 sentence summary used on list pages." },
    },
    {
      name: "body",
      type: "richText",
      localized: true,
      admin: { description: "Full article body. Supports headings, lists, links, images." },
    },
  ],
};
