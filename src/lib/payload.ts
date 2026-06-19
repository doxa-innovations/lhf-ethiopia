import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Returns a cached Payload Local API instance for use in server components
 * and route handlers. First call initializes the DB connection; subsequent
 * calls reuse it.
 */
let cached: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getLocalPayload() {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
