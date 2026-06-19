import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/"]);

export const Stories: CollectionConfig = {
  slug: "stories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "languageCode", "_status"],
    group: "Editorial",
    description: "Pastor / teacher / translator portraits + quotes.",
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
      type: "select",
      required: true,
      defaultValue: "am",
      options: [
        { label: "Amharic", value: "am" },
        { label: "Afaan Oromoo", value: "om" },
        { label: "Tigrinya", value: "ti" },
        { label: "Somali", value: "so" },
        { label: "Sidaamu Afoo", value: "sid" },
        { label: "Wolayttattuwaa", value: "wal" },
        { label: "Multilingual", value: "multi" },
      ],
      admin: { description: "Filter / sort key. The display label is per-locale below." },
    },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "name", type: "text", localized: true, required: true },
    { name: "role", type: "text", localized: true, required: true },
    { name: "congregation", type: "text", localized: true, required: true },
    { name: "languageDisplay", type: "text", localized: true, required: true },
    { name: "quote", type: "textarea", localized: true, required: true },
  ],
};
