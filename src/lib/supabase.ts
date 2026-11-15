/**
 * Supabase driver for the content store, used when SUPABASE_URL and
 * SUPABASE_PUBLISHABLE_KEY are set. It talks to PostgREST directly with fetch.
 *
 * Security model (see supabase/migrations): the publishable key can only read
 * `site_content` and `site_media`. Writes go through SECURITY DEFINER functions
 * that require CONTENT_WRITE_TOKEN, a server-only secret whose SHA-256 hash is
 * stored in a table the API cannot read.
 */

type Config = { url: string; key: string };

function config(): Config | null {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  return url && key ? { url, key } : null;
}

export function isSupabaseEnabled(): boolean {
  return config() !== null;
}

function requireConfig(): Config {
  const value = config();
  if (!value) throw new Error("Supabase is not configured.");
  return value;
}

function headers(key: string, extra?: Record<string, string>): Record<string, string> {
  return {
    apikey: key,
    // Legacy anon keys are JWTs and must also be sent as a bearer token.
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
    ...extra,
  };
}

async function rpc(name: string, args: Record<string, unknown>): Promise<unknown> {
  const { url, key } = requireConfig();
  const token = process.env.CONTENT_WRITE_TOKEN;
  if (!token) {
    throw new Error("CONTENT_WRITE_TOKEN is not set, so the dashboard cannot save to Supabase.");
  }

  const response = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: headers(key, { "Content-Type": "application/json" }),
    body: JSON.stringify({ p_token: token, ...args }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as { message?: string; code?: string } | null;
    if (detail?.code === "28000") {
      throw new Error("Supabase rejected the write token. Check CONTENT_WRITE_TOKEN.");
    }
    throw new Error(`Supabase write failed (${response.status}): ${detail?.message ?? "unknown error"}`);
  }
  return response.json();
}

/** Returns the saved content, or null when nothing has been saved yet. Throws if Supabase is unreachable. */
export async function readRemoteContent(): Promise<unknown> {
  const { url, key } = requireConfig();
  const response = await fetch(`${url}/rest/v1/site_content?id=eq.main&select=data`, {
    headers: headers(key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase read failed (${response.status}).`);
  const rows = (await response.json()) as { data: unknown }[];
  return rows[0]?.data ?? null;
}

export async function writeRemoteContent(content: unknown): Promise<void> {
  await rpc("save_site_content", { p_data: content });
}

export async function saveRemoteMedia(name: string, contentType: string, bytes: Uint8Array): Promise<void> {
  await rpc("save_site_media", {
    p_name: name,
    p_content_type: contentType,
    p_data_base64: Buffer.from(bytes).toString("base64"),
  });
}

/** Raw image bytes for an uploaded file, or null if it does not exist. */
export async function readRemoteMedia(name: string): Promise<Uint8Array<ArrayBuffer> | null> {
  const { url, key } = requireConfig();
  const response = await fetch(
    `${url}/rest/v1/site_media?name=eq.${encodeURIComponent(name)}&select=data`,
    { headers: headers(key), cache: "no-store" },
  );
  if (!response.ok) return null;
  // PostgREST serialises bytea as a hex string: "\\x89504e47…".
  const rows = (await response.json()) as { data: string }[];
  const hex = rows[0]?.data;
  if (typeof hex !== "string" || !hex.startsWith("\\x")) return null;
  return new Uint8Array(Buffer.from(hex.slice(2), "hex"));
}
