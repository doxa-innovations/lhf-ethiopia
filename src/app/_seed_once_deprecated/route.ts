/* ONE-TIME SEED ENDPOINT.
 *
 *   POST /api/__seed   header: x-seed-token: <PAYLOAD_SECRET>
 *
 * Run with:
 *   curl -X POST -H "x-seed-token: $PAYLOAD_SECRET" http://localhost:3000/api/__seed
 *
 * Delete this file after seeding production. The script body is imported
 * from a colocated module so the same logic also runs from CLI if we ever
 * get tsx + Node 24 working.
 */
import { NextResponse } from "next/server";
import { runSeed } from "./run-seed";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: Request) {
  const token = req.headers.get("x-seed-token");
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  try {
    const log = await runSeed();
    return NextResponse.json({ ok: true, log });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message, stack: (err as Error).stack },
      { status: 500 },
    );
  }
}
