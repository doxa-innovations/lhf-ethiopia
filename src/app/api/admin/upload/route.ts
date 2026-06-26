/**
 * POST /api/admin/upload — auth-gated file ingest for EditableImage.
 *
 * Form fields:
 *   file: the image file (required, ≤ 8 MB, image/* only)
 *   elementId: which element this image is for (used to build a stable
 *              filename so repeat uploads overwrite instead of pile up)
 *
 * Returns: { url } — public URL of the stored file.
 *
 * Storage: writes to `public/uploads/cms/<filename>` so Next serves it
 * statically. A row is recorded in the `media` table so the admin can
 * audit / clean up later. For a VPS deploy this works as-is; swap to
 * S3/R2/B2 by replacing the writeFile call.
 */
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";
import { adminEnabled } from "@/lib/admin-flag";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_PREFIX = "image/";

export async function POST(req: Request) {
  if (!adminEnabled) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const elementId = String(form.get("elementId") ?? "").trim();

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 },
    );
  }
  if (!(file as File).type?.startsWith(ALLOWED_PREFIX)) {
    return NextResponse.json(
      { error: "Only image/* files allowed" },
      { status: 415 },
    );
  }

  const ext = pickExtension((file as File).name, (file as File).type);
  const base = elementId.replace(/[^a-z0-9_-]/gi, "_") || "img";
  const filename = `${base}-${randomBytes(4).toString("hex")}${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads", "cms");
  await mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), bytes);

  const url = `/uploads/cms/${filename}`;

  // Best-effort media row; don't fail the upload if it errors.
  try {
    await db.insert(schema.media).values({
      filename,
      url,
      mimeType: (file as File).type,
    });
  } catch (err) {
    console.warn("media row insert failed (continuing):", err);
  }

  return NextResponse.json({ url, filename });
}

function pickExtension(name: string, mime: string): string {
  const fromName = path.extname(name).toLowerCase();
  if (fromName && /^\.(png|jpe?g|webp|gif|avif|svg)$/.test(fromName)) {
    return fromName;
  }
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "image/avif":
      return ".avif";
    case "image/svg+xml":
      return ".svg";
    default:
      return ".bin";
  }
}
