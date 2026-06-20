/**
 * Drizzle DB client.
 *  - Dev (DATABASE_URL = file:./lhf.db or pglite:./.pglite):
 *      → @electric-sql/pglite (Postgres-compatible, WASM, no native deps).
 *  - Prod (DATABASE_URL = postgres://…):
 *      → node-postgres driver.
 *
 * Same Postgres dialect in both environments. Switch is fully transparent
 * to query code.
 */
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import path from "node:path";
import * as schema from "../../drizzle/schema";

const url = process.env.DATABASE_URL ?? "file:./lhf.db";
const isPostgresServer =
  url.startsWith("postgres://") || url.startsWith("postgresql://");

declare global {
  // eslint-disable-next-line no-var
  var __lhfDb: ReturnType<typeof build> | undefined;
}

function build() {
  if (isPostgresServer) {
    const pool = new Pool({ connectionString: url });
    return drizzlePg(pool, { schema });
  }
  // In dev: PGlite (pure WASM Postgres, no native deps). 0.4.x — the 0.5
  // line broke Node 24 + Turbopack with a URL/Buffer typeError in the FS.
  const dataDir = path.resolve(
    process.cwd(),
    url.startsWith("file:")
      ? url.slice("file:".length).replace(/\.db$/, "-pglite")
      : "./lhf-pglite",
  );
  const client = new PGlite(dataDir);
  return drizzlePglite(client, { schema });
}

export const db = globalThis.__lhfDb ?? build();
if (process.env.NODE_ENV !== "production") globalThis.__lhfDb = db;

export type DB = typeof db;
export { schema };
