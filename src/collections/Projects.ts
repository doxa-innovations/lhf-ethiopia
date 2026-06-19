import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/projects", "/"]);

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "regionCode", "raised", "goal", "_status"],
    group: "Engage",
    description: "Adopt-a-project entries with progress bars on /projects.",
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
      name: "regionCode",
      type: "select",
      required: true,
      defaultValue: "addis-ababa",
      options: [
        { label: "Addis Ababa", value: "addis-ababa" },
        { label: "Oromia", value: "oromia" },
        { label: "Amhara", value: "amhara" },
        { label: "Tigray", value: "tigray" },
        { label: "Sidama", value: "sidama" },
        { label: "Somali Region", value: "somali" },
        { label: "South Ethiopia", value: "south" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "raised",
      type: "number",
      required: true,
      min: 0,
      admin: { description: "Amount raised so far, in USD (whole dollars)." },
    },
    {
      name: "goal",
      type: "number",
      required: true,
      min: 1,
      admin: { description: "Total funding goal in USD (whole dollars)." },
    },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "regionDisplay",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "How the region name appears on the public site, per locale." },
    },
    { name: "need", type: "textarea", localized: true, required: true },
    { name: "impact", type: "textarea", localized: true, required: true },
  ],
};
