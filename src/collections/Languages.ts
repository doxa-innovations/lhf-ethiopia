import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/publications", "/"]);

export const Languages: CollectionConfig = {
  slug: "languages",
  admin: {
    useAsTitle: "code",
    defaultColumns: ["code", "nativeName", "statusCode", "titlesPublished"],
    group: "Library",
    description: "The heart languages LHF Ethiopia publishes in.",
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
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
      admin: { description: 'ISO-639 code (am, om, ti, so, sid, wal).' },
    },
    {
      name: "nativeName",
      type: "text",
      required: true,
      admin: { description: 'Native script name (e.g. "Afaan Oromoo", "አማርኛ"). Same in every locale.' },
    },
    {
      name: "titlesPublished",
      type: "number",
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: "statusCode",
      type: "select",
      required: true,
      defaultValue: "Published",
      options: [
        { label: "Published", value: "Published" },
        { label: "In translation", value: "In translation" },
        { label: "Requested", value: "Requested" },
      ],
      admin: { description: "Filter / sort key. Sets the badge color on /publications." },
    },
    { name: "displayName", type: "text", localized: true, required: true },
    { name: "region", type: "text", localized: true, required: true },
    { name: "speakers", type: "text", localized: true, required: true },
    { name: "statusLabel", type: "text", localized: true, required: true },
  ],
};
