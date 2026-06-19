import type { CollectionConfig } from "payload";
import { isAdmin } from "@/access/isAdmin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
    maxLoginAttempts: 8,
    lockTime: 1000 * 60 * 10, // 10 minutes
  },
  admin: {
    useAsTitle: "email",
    group: "Site",
    description:
      "Admin login accounts. Only admins can create new users. Editors can publish content; admins can also delete content + manage users.",
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: ({ req, id }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      // Editors can only update their own user record.
      return req.user.id === id;
    },
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin (full access)", value: "admin" },
        { label: "Editor (publish content)", value: "editor" },
      ],
      access: {
        // Only admins can change someone's role.
        update: ({ req }) => req.user?.role === "admin",
      },
    },
  ],
};
