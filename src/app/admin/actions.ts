"use server";

import { updateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  checkPassword,
  createSessionToken,
  isAuthConfigured,
} from "@/lib/auth";
import { CONTENT_TAG, writeContent } from "@/lib/content";
import { hasSession } from "@/lib/session";

/* ── Login throttling: 5 attempts per 10 minutes per client address ──── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function isThrottled(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAuthConfigured()) {
    return {
      error:
        "Admin access is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+ characters) in the environment.",
    };
  }

  const headerList = await headers();
  const client = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isThrottled(client)) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const password = String(formData.get("password") ?? "");
  if (!(await checkPassword(password))) {
    return { error: "Incorrect password." };
  }

  attempts.delete(client);
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveContentAction(content: unknown): Promise<SaveResult> {
  if (!(await hasSession())) {
    return { ok: false, error: "Your session has expired. Please sign in again." };
  }
  try {
    await writeContent(content);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException)?.code;
    if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
      return {
        ok: false,
        error:
          "This host has a read-only file system, so changes cannot be saved here. Set SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY and CONTENT_WRITE_TOKEN to save to Supabase instead.",
      };
    }
    return { ok: false, error: error instanceof Error ? error.message : "Could not save." };
  }
  updateTag(CONTENT_TAG);
  return { ok: true };
}
