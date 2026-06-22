/**
 * Drizzle DB client — node-postgres against the configured DATABASE_URL.
 *
 * One dialect (Postgres) for both dev and prod. The PGlite fallback was
 * removed because it doesn't survive Node 24 + Next 16 Turbopack and
 * because middleware.ts runs in the Edge runtime, which rejects
 * `node:path` and `process.cwd()`.
 *
 * Pool tuning for Neon (and similar managed Postgres with idle timeouts):
 * — `idleTimeoutMillis` shorter than Neon's (~5 min) so the pool drops
 *   sockets before the server kills them.
 * — A pool `error` listener so a dropped idle socket logs but doesn't
 *   crash the process.
 */
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../drizzle/schema";
import { env } from "./env";

const url = env.DATABASE_URL();

declare global {
  // eslint-disable-next-line no-var
  var __lhfDb: ReturnType<typeof build> | undefined;
  // eslint-disable-next-line no-var
  var __lhfPool: Pool | undefined;
}

function build() {
  const pool =
    globalThis.__lhfPool ??
    new Pool({
      connectionString: url,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      max: 10,
    });
  // Connections terminated by the server (Neon ~5 min idle, network
  // blip, deploy restart) emit 'error' on the idle socket. Without a
  // listener Node treats it as uncaught and crashes the process.
  if (!globalThis.__lhfPool) {
    pool.on("error", (err) => {
      console.warn("[pg pool] idle client error:", err.message);
    });
    globalThis.__lhfPool = pool;
  }
  return drizzlePg(pool, { schema });
}

export const db = globalThis.__lhfDb ?? build();
if (process.env.NODE_ENV !== "production") globalThis.__lhfDb = db;

export type DB = typeof db;
export { schema };
