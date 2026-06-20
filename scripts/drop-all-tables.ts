/**
 * Nukes every table + enum type in the connected Postgres schema. Used
 * once to wipe Payload's leftover schema before bootstrapping the new
 * Drizzle-managed tables. Idempotent.
 */
import "dotenv/config";
import { Pool } from "pg";

const url = process.env.DATABASE_URL ?? "";
if (!url.startsWith("postgres")) {
  console.error("DATABASE_URL must point at a Postgres server.");
  process.exit(1);
}

const pool = new Pool({ connectionString: url });

async function main() {
  console.log("Listing tables…");
  const tables = await pool.query<{ tablename: string }>(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public'`,
  );
  console.log(`Found ${tables.rows.length} tables.`);
  if (tables.rows.length > 0) {
    const list = tables.rows.map((r) => `"${r.tablename}"`).join(", ");
    await pool.query(`DROP TABLE ${list} CASCADE`);
    console.log("✓ tables dropped");
  }

  const types = await pool.query<{ typname: string }>(
    `SELECT typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace
     WHERE n.nspname = 'public' AND t.typtype = 'e'`,
  );
  console.log(`Found ${types.rows.length} enum types.`);
  for (const r of types.rows) {
    await pool.query(`DROP TYPE IF EXISTS "${r.typname}" CASCADE`);
  }
  if (types.rows.length > 0) console.log("✓ enums dropped");

  await pool.end();
  console.log("✓ DB wiped");
  process.exit(0);
}

main().catch((err) => {
  console.error("✗ drop failed:");
  console.error(err);
  process.exit(1);
});
