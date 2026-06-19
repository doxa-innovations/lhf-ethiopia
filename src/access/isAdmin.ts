import type { Access, FieldAccess } from "payload";

/** Top-level collection access: only authenticated users with role "admin". */
export const isAdmin: Access = ({ req }) => {
  return req.user?.role === "admin";
};

/** Same check as a field-level access function. */
export const isAdminField: FieldAccess = ({ req }) => {
  return req.user?.role === "admin";
};

/** Returns true if the request is authenticated at all (admin or editor). */
export const isAuthenticated: Access = ({ req }) => Boolean(req.user);
