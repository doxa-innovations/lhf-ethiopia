import type { Access } from "payload";

/**
 * Editor or Admin can read/write content. Anonymous users cannot reach admin
 * collections at all — public-facing data is fetched via the Local API by
 * the Next.js server components, which run outside the access layer.
 */
export const isEditorOrAbove: Access = ({ req }) => {
  if (!req.user) return false;
  return req.user.role === "admin" || req.user.role === "editor";
};
