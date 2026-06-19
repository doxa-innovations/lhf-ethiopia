import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";
import { isEditorOrAbove } from "@/access/isEditorOrAbove";
import { revalidateRoutes } from "@/hooks/revalidate";

const { afterChange, afterDelete } = revalidateRoutes(["/podcast", "/"]);

export const PodcastEpisodes: CollectionConfig = {
  slug: "podcastEpisodes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["number", "title", "topicKey", "date", "_status"],
    group: "Library",
    description: "Scripture Alone Podcast episode metadata.",
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  defaultSort: "-date",
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
      name: "number",
      type: "number",
      required: true,
      min: 0,
      admin: { description: "Episode number. Use 0 for shorts / trailers." },
    },
    {
      name: "youtubeId",
      type: "text",
      required: true,
      admin: { description: 'The "v" param from the YouTube watch URL.' },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "durationMin",
      type: "number",
      required: true,
      min: 1,
      admin: { description: "Episode length in minutes (rounded)." },
    },
    {
      name: "topicKey",
      type: "select",
      required: true,
      defaultValue: "BibleStudy",
      options: [
        { label: "Bible Study", value: "BibleStudy" },
        { label: "Doctrine", value: "Doctrine" },
        { label: "Catechism", value: "Catechism" },
        { label: "Music", value: "Music" },
      ],
      admin: { description: "Filter chip on /podcast. Display label is localized in dictionary.ts." },
    },
    { name: "title", type: "text", localized: true, required: true },
    { name: "summary", type: "textarea", localized: true, required: true },
    {
      name: "languageDisplay",
      type: "text",
      localized: true,
      required: true,
      admin: { description: 'E.g. "Amharic / English".' },
    },
  ],
};
