import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/", "/about"]);

export const Values: CollectionConfig = {
  slug: "values",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
    group: "Editorial",
    description: 'Items rendered in the "What we believe" accordion.',
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  defaultSort: "order",
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
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        description: "Sort order on the public site. Lower = earlier in the list.",
      },
    },
    { name: "title", type: "text", localized: true, required: true },
    { name: "body", type: "textarea", localized: true, required: true },
  ],
};
