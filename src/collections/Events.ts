import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/events", "/"]);

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "eventPhase", "_status"],
    group: "Engage",
    description: "Distribution days, trainings, book launches, live podcast recordings.",
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
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "eventPhase",
      type: "select",
      required: true,
      defaultValue: "Upcoming",
      options: [
        { label: "Upcoming", value: "Upcoming" },
        { label: "Past", value: "Past" },
      ],
      admin: {
        description:
          "Filter key — leave as Upcoming until the event has happened. (Stored as `eventPhase` to avoid colliding with Payload's draft/publish status.)",
      },
    },
    { name: "title", type: "text", localized: true, required: true },
    { name: "location", type: "text", localized: true, required: true },
    { name: "audience", type: "text", localized: true, required: true },
    { name: "summary", type: "textarea", localized: true, required: true },
    {
      name: "statusLabel",
      type: "text",
      localized: true,
      required: true,
      admin: { description: "Display text for the status pill (e.g. \"Upcoming\" → \"Dhufaa jiru\" in om)." },
    },
  ],
};
