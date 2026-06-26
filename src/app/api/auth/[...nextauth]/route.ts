import { NextResponse, type NextRequest } from "next/server";
import { adminEnabled } from "@/lib/admin-flag";

/**
 * NextAuth handler — only wired up when the admin area is enabled.
 * On a frontend-only deploy any hit to /api/auth/* 404s without ever
 * importing the auth module (which would pull in pg / bcryptjs).
 */

export const runtime = "nodejs";

async function handle(req: NextRequest) {
  if (!adminEnabled) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const { handlers } = await import("@/lib/auth");
  return req.method === "POST" ? handlers.POST(req) : handlers.GET(req);
}

export const GET = handle;
export const POST = handle;
