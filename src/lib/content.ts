import { promises as fs } from "node:fs";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { defaultContent } from "@/content/default";
import type { SiteContent } from "@/content/types";
import { isSupabaseEnabled, readRemoteContent, writeRemoteContent } from "./supabase";

/**
 * Content store.
 *
 * The site ships with typed defaults (src/content). Edits made in /admin are
 * layered on top of those defaults, so adding a new field in code never breaks
 * older saved content.
 *
 * Two drivers, picked from the environment:
 * - Supabase (SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY set): works on read-only
 *   hosts such as Vercel. See src/lib/supabase.ts.
 * - Local file (default): data/content.json, needs a writable disk.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
export const CONTENT_TAG = "site-content";

type Json = Record<string, unknown>;

function isPlainObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Objects merge key by key; arrays and primitives from `saved` win when the type matches. */
function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) ? saved : defaults) as T;
  }
  if (isPlainObject(defaults)) {
    if (!isPlainObject(saved)) return defaults;
    const out: Json = {};
    for (const key of Object.keys(defaults)) {
      out[key] = mergeWithDefaults((defaults as Json)[key], saved[key]);
    }
    return out as T;
  }
  return (typeof saved === typeof defaults ? saved : defaults) as T;
}

async function readFile(): Promise<unknown> {
  try {
    return JSON.parse(await fs.readFile(CONTENT_FILE, "utf8"));
  } catch {
    return null;
  }
}

async function writeFile(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${CONTENT_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(content, null, 2), "utf8");
  await fs.rename(tmp, CONTENT_FILE);
}

/**
 * Always-fresh read, for the admin editor. With Supabase this throws when the
 * database is unreachable: the editor must never open on fallback content,
 * because saving it would overwrite the real one.
 */
export async function readContent(): Promise<SiteContent> {
  const raw = isSupabaseEnabled() ? await readRemoteContent() : await readFile();
  return mergeWithDefaults(defaultContent, raw);
}

/** Cached read for public pages; invalidated by tag when the admin saves. */
export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  try {
    const content = await readContent();
    // With Supabase, revalidate daily: fresh enough, and the regular read keeps
    // a free-tier project from being paused for inactivity.
    if (isSupabaseEnabled()) cacheLife("days");
    else cacheLife("max");
    return content;
  } catch (error) {
    // Public pages stay up on the bundled content and retry within minutes.
    console.error("[content] Supabase read failed, serving bundled content.", error);
    cacheLife("minutes");
    return mergeWithDefaults(defaultContent, await readFile());
  }
}

export async function writeContent(input: unknown): Promise<SiteContent> {
  if (!isPlainObject(input)) throw new Error("Invalid content payload.");
  const content = mergeWithDefaults(defaultContent, input);
  const slugs = new Set<string>();
  for (const item of [...content.projects, ...content.blog.posts]) {
    item.slug = slugify(item.slug || item.title);
    if (!item.slug) throw new Error("Every project and post needs a slug or a title.");
  }
  for (const project of content.projects) {
    if (slugs.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);
  }
  if (isSupabaseEnabled()) await writeRemoteContent(content);
  else await writeFile(content);
  return content;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
