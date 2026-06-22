/**
 * Boot-time environment validation. Imported by `src/lib/db.ts` and
 * `src/lib/auth.ts` so a misconfigured deploy fails loudly the first
 * time anything touches the DB or auth — instead of silently 500ing
 * on every request.
 */

type Required = "DATABASE_URL" | "AUTH_SECRET";
type Optional = "NEXTAUTH_URL" | "UPLOAD_DIR";

const REQUIRED: Required[] = ["DATABASE_URL", "AUTH_SECRET"];

function readEnv(name: Required | Optional): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

let validated = false;
export function validateEnvOnce(): void {
  if (validated) return;
  validated = true;

  // `next build` evaluates server modules to collect page data, so an
  // env check that throws here would block builds run on a dev box.
  // Skip the throw during the build phase — runtime is when the values
  // actually matter, and missing vars there will surface immediately.
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  const missing: string[] = [];
  for (const key of REQUIRED) {
    if (!readEnv(key)) missing.push(key);
  }
  if (missing.length && !isBuild) {
    const help =
      missing.length === 1
        ? `${missing[0]} is not set.`
        : `Required env vars are not set: ${missing.join(", ")}.`;
    throw new Error(
      `[lhf-ethiopia] ${help} Set them in .env (dev) or your deploy platform (prod).`,
    );
  }
  if (
    !isBuild &&
    process.env.NODE_ENV === "production" &&
    process.env.AUTH_SECRET &&
    process.env.AUTH_SECRET.startsWith("dev-only-")
  ) {
    throw new Error(
      "[lhf-ethiopia] AUTH_SECRET still has the dev placeholder value. Rotate it before deploying to production.",
    );
  }
  if (
    isBuild &&
    process.env.AUTH_SECRET &&
    process.env.AUTH_SECRET.startsWith("dev-only-")
  ) {
    console.warn(
      "[lhf-ethiopia] AUTH_SECRET still has the dev placeholder value. Rotate it before deploying to production.",
    );
  }
}

export const env = {
  DATABASE_URL: () => {
    validateEnvOnce();
    return process.env.DATABASE_URL!;
  },
  AUTH_SECRET: () => {
    validateEnvOnce();
    return process.env.AUTH_SECRET!;
  },
};
