# faustoswald.com

English rebuild of the Framer site, in code: Next.js 16 (App Router, Cache Components), React 19,
Tailwind CSS v4, Motion. Includes a private dashboard at `/admin` to edit every piece of content.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `ADMIN_SESSION_SECRET` | 32+ random characters used to sign the session cookie (`openssl rand -hex 32`) |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `CONTENT_WRITE_TOKEN` | Optional: store content in Supabase (see below) |

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, projects, services, about, pricing, expertise, testimonials, FAQ |
| `/projects`, `/projects/[slug]` | Project index by category and case studies |
| `/blog`, `/blog/[slug]` | Articles (markdown-lite body) |
| `/terms`, `/privacy-policy` | Legal pages (`src/content/legal.ts`) |
| `/admin` | Dashboard (password protected) |

## How content works

- `src/content/types.ts` — the content schema.
- `src/content/default.ts`, `src/content/projects.ts` — the default English content shipped with the code.
- Saved content — written the first time you save in `/admin`. It is layered on top of the
  defaults, so fields added later in code keep working with older saved content.
- Public pages read content through a tagged cache (`getContent`); saving in the dashboard
  invalidates that tag, so edits are live immediately with no rebuild.
- Images uploaded from the dashboard are served from `/media/<name>`.

The dashboard form is generated from the content shape: add a field to the types and defaults and it
becomes editable automatically.

### Where content is stored

Two drivers, chosen from the environment (`src/lib/content.ts`):

| Driver | When | Stores |
| --- | --- | --- |
| Supabase | `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are set | `public.site_content` (one JSON row) and `public.site_media` (uploads, 4 MB max) |
| Local file | otherwise | `data/content.json` and `data/uploads` (needs a writable disk) |

Supabase is what makes the dashboard work on read-only hosts such as Vercel. The schema is in
`supabase/migrations`. Reads are public; writes go through two database functions that require
`CONTENT_WRITE_TOKEN`, a server-only secret whose SHA-256 hash is stored in `public.site_secrets`
(no service-role key is needed in the app). To rotate it, generate a new token, update the env var,
and replace the hash:

```bash
printf '%s' "$CONTENT_WRITE_TOKEN" | shasum -a 256
```

If Supabase is unreachable, public pages fall back to the content bundled in the code and retry
within minutes; the dashboard refuses to open rather than risk overwriting real content.

When deploying, set these on the host: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SUPABASE_URL`,
`SUPABASE_PUBLISHABLE_KEY`, `CONTENT_WRITE_TOKEN`.

## Design system

Tokens and the type scale live in `src/app/globals.css` (`t-display`, `t-h2`, `t-lead`, …, `shell`).
They were measured from the original Framer build: Switzer, a 1080px column with guide lines,
`#fafafa` background, 128px section rhythm.
