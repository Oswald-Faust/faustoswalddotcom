-- Content store for faustoswald.com.
-- Reads are public (it is website copy). Writes only go through the
-- SECURITY DEFINER functions below, which require a secret write token whose
-- SHA-256 hash is kept in a table the API roles cannot read.
--
-- After applying, register the hash of your CONTENT_WRITE_TOKEN:
--   printf '%s' "$CONTENT_WRITE_TOKEN" | shasum -a 256
--   insert into public.site_secrets (name, hash) values ('content_write', '<hash>')
--     on conflict (name) do update set hash = excluded.hash;

create table public.site_content (
  id text primary key default 'main' check (id = 'main'),
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now()
);

create table public.site_media (
  name text primary key
    check (name ~ '^[a-z0-9]+-[a-f0-9]{12}\.(png|jpg|gif|webp|avif)$'),
  content_type text not null
    check (content_type in ('image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif')),
  data bytea not null check (octet_length(data) between 1 and 4194304),
  created_at timestamptz not null default now()
);

create table public.site_secrets (
  name text primary key,
  hash text not null check (hash ~ '^[a-f0-9]{64}$')
);

alter table public.site_content enable row level security;
alter table public.site_media enable row level security;
alter table public.site_secrets enable row level security;

revoke all on public.site_content, public.site_media, public.site_secrets from anon, authenticated;
grant select on public.site_content, public.site_media to anon, authenticated;

create policy "Site content is public" on public.site_content
  for select to anon, authenticated using (true);

create policy "Site media is public" on public.site_media
  for select to anon, authenticated using (true);

-- No policy on site_secrets: with RLS on, API roles can never read it.

create function public.site_write_allowed(p_token text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.site_secrets s
    where s.name = 'content_write'
      and s.hash = encode(sha256(convert_to(coalesce(p_token, ''), 'UTF8')), 'hex')
  );
$$;

create function public.save_site_content(p_token text, p_data jsonb)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_now timestamptz := now();
begin
  if not public.site_write_allowed(p_token) then
    raise exception 'Invalid write token' using errcode = '28000';
  end if;

  insert into public.site_content (id, data, updated_at)
  values ('main', p_data, v_now)
  on conflict (id) do update
    set data = excluded.data, updated_at = excluded.updated_at;

  return v_now;
end;
$$;

create function public.save_site_media(
  p_token text,
  p_name text,
  p_content_type text,
  p_data_base64 text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.site_write_allowed(p_token) then
    raise exception 'Invalid write token' using errcode = '28000';
  end if;

  insert into public.site_media (name, content_type, data)
  values (p_name, p_content_type, decode(p_data_base64, 'base64'));

  return p_name;
end;
$$;

-- The token check is internal; only the two save functions are callable from the API.
revoke all on function public.site_write_allowed(text) from public, anon, authenticated;
revoke all on function public.save_site_content(text, jsonb) from public;
revoke all on function public.save_site_media(text, text, text, text) from public;
grant execute on function public.save_site_content(text, jsonb) to anon, authenticated;
grant execute on function public.save_site_media(text, text, text, text) to anon, authenticated;
