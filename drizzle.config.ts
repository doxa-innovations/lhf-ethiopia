import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL ?? "file:./lhf.db";
const isPostgres = url.startsWith("postgres://") || url.startsWith("postgresql://");

export default isPostgres
  ? defineConfig({
      dialect: "postgresql",
      schema: "./drizzle/schema.pg.ts",
      out: "./drizzle/migrations",
      dbCredentials: { url },
    })
  : defineConfig({
      dialect: "sqlite",
      driver: "libsql",
      schema: "./drizzle/schema.ts",
      out: "./drizzle/migrations",
      dbCredentials: { url },
    } as never);
