/**
 * Single source of truth for whether the admin / CMS area is enabled on
 * this deploy. The marketing frontend ships standalone — the admin is
 * gated until `ENABLE_ADMIN=true` so a frontend-only prod build doesn't
 * need DATABASE_URL or AUTH_SECRET.
 *
 * Read at module top-level so Edge middleware and server components see
 * the same value. Cast to string explicitly because `process.env` may
 * surface vars as undefined inside the Edge runtime.
 */
export const adminEnabled = process.env.ENABLE_ADMIN === "true";
