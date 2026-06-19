import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/publications"]);

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "languageCode", "printStatus", "pages", "_status"],
    group: "Library",
    description: "Books we've translated, printed, or have on the roadmap.",
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
      name: "languageCode",
      type: "relationship",
      relationTo: "languages",
      required: true,
      admin: { description: "Which heart language this title is published in." },
    },
    { name: "pages", type: "number", min: 1, required: true },
    {
      name: "nativeTitle",
      type: "text",
      required: true,
      admin: {
        description:
          "The book title in its publication script (e.g. Ge'ez). Same in every locale — does not get translated.",
      },
    },
    {
      name: "printStatus",
      type: "select",
      required: true,
      defaultValue: "In print",
      options: [
        { label: "In print", value: "In print" },
        { label: "In translation", value: "In translation" },
        { label: "Reprint requested", value: "Reprint requested" },
        { label: "Requested", value: "Requested" },
      ],
      admin: {
        description:
          "Stored as `printStatus` to avoid colliding with Payload's draft/publish status.",
      },
    },
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "language",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Display name of the language for this row, per locale." },
    },
    {
      name: "audience",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Target readership (children / pastors / all ages)." },
    },
    { name: "statusLabel", type: "text", localized: true, required: true },
  ],
};
