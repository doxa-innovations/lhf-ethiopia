import "server-only";

/**
 * Retry a DB operation once if it fails with a transient connection error.
 * Neon (and other managed Postgres providers) kill idle pool connections —
 * the first query after a long idle hands out a dead socket and throws
 * "Connection terminated unexpectedly". A second attempt opens a new
 * socket and succeeds. Anything else surfaces immediately.
 */
const TRANSIENT_PATTERNS = [
  /Connection terminated/i,
  /connection terminated unexpectedly/i,
  /ECONNRESET/i,
  /ETIMEDOUT/i,
  /Client has encountered a connection error/i,
];

function isTransient(err: unknown): boolean {
  const message =
    err instanceof Error
      ? err.message + " " + (err.cause instanceof Error ? err.cause.message : "")
      : String(err);
  return TRANSIENT_PATTERNS.some((p) => p.test(message));
}

export async function withDbRetry<T>(
  fn: () => Promise<T>,
  { retries = 1, delayMs = 150 }: { retries?: number; delayMs?: number } = {},
): Promise<T> {
  let attempt = 0;
  let lastErr: unknown;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (!isTransient(err) || attempt === retries) break;
      await new Promise((r) => setTimeout(r, delayMs * (attempt + 1)));
      attempt++;
    }
  }
  throw lastErr;
}
