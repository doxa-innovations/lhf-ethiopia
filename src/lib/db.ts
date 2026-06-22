/**
 * Drizzle DB client — node-postgres against the configured DATABASE_URL.
 *
 * One dialect (Postgres) for both dev and prod. The PGlite fallback was
 * removed because it doesn't survive Node 24 + Next 16 Turbopack and
 * because middleware.ts runs in the Edge runtime, which rejects
 * `node:path` and `process.cwd()`.
 */
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../drizzle/schema";

const url =
  process.env.DATABASE_URL ??
  (() => {
    throw new Error("DATABASE_URL is not set");
  })();

declare global {
  // eslint-disable-next-line no-var
  var __lhfDb: ReturnType<typeof build> | undefined;
}

function build() {
  const pool = new Pool({ connectionString: url });
  return drizzlePg(pool, { schema });
}

export const db = globalThis.__lhfDb ?? build();
if (process.env.NODE_ENV !== "production") globalThis.__lhfDb = db;

export type DB = typeof db;
export { schema };
