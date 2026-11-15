/**
 * Minimal single-admin auth: one password (ADMIN_PASSWORD) and a signed,
 * expiring session cookie (HMAC-SHA256 with ADMIN_SESSION_SECRET).
 * Uses Web Crypto only, so it runs in both the proxy and server runtimes.
 */
export const SESSION_COOKIE = "fo_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && getSecret() !== null;
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Constant-time comparison of two strings (compared through their SHA-256 digests). */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [da, db] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const va = new Uint8Array(da);
  const vb = new Uint8Array(db);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !isAuthConfigured()) return false;
  return safeEqual(candidate, expected);
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS);
  return `${expires}.${await sign(expires, secret)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, await sign(expires, secret));
}
