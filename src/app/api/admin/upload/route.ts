import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { UPLOAD_DIR } from "@/lib/content";
import { hasSession } from "@/lib/session";
import { isSupabaseEnabled, saveRemoteMedia } from "@/lib/supabase";

const MAX_LOCAL_BYTES = 8 * 1024 * 1024;
// Serverless hosts cap request bodies around 4.5 MB, and the database column at 4 MB.
const MAX_REMOTE_BYTES = 4 * 1024 * 1024;

const CONTENT_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
};

/** Detect the real image type from its first bytes; the client's MIME type is not trusted. */
function sniff(bytes: Uint8Array): string | null {
  const ascii = (start: number, length: number) =>
    String.fromCharCode(...bytes.subarray(start, start + length));
  if (bytes[0] === 0x89 && ascii(1, 3) === "PNG") return "png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (ascii(0, 3) === "GIF") return "gif";
  if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") return "webp";
  if (ascii(4, 4) === "ftyp" && /avif|avis/.test(ascii(8, 4))) return "avif";
  return null;
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  const remote = isSupabaseEnabled();
  const limit = remote ? MAX_REMOTE_BYTES : MAX_LOCAL_BYTES;
  if (file.size === 0 || file.size > limit) {
    return NextResponse.json(
      { error: `Images must be under ${limit / 1024 / 1024} MB.` },
      { status: 413 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = sniff(bytes);
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported format. Use PNG, JPG, WebP, AVIF or GIF." },
      { status: 415 },
    );
  }

  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${extension}`;
  try {
    if (remote) {
      await saveRemoteMedia(name, CONTENT_TYPES[extension], bytes);
    } else {
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
    }
  } catch (error) {
    const message = remote
      ? error instanceof Error
        ? error.message
        : "Could not store the image."
      : "This host cannot store uploads (read-only file system).";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  return NextResponse.json({ url: `/media/${name}` });
}
