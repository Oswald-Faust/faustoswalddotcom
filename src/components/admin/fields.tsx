"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Schema-less form builder. It walks the content JSON and picks a control from
 * the shape of each value (and a few naming conventions), so new fields added
 * to src/content/types.ts become editable without touching the dashboard.
 */

export type Path = (string | number)[];
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const LONG_TEXT = /^(description|text|body|quote|answer|intro|excerpt|seoDescription|plansText|cardText|bannerText|ctaText|pageIntro|bio|greeting)$/;
const IMAGE_KEY = /^(cover|src|avatar|portrait|images)$/;
const ENUMS: Record<string, string[]> = {
  category: ["web", "mobile", "landing"],
  icon: ["framer", "mobile", "web", "landing", "ai"],
};
const STACK_OPTIONS = [
  "javascript", "typescript", "react", "nextjs", "apple", "swift", "supabase",
  "docker", "node", "python", "tailwind", "mongodb", "expo", "flutter", "framer", "bolt",
];
const HINTS: Record<string, string> = {
  slug: "Used in the URL. Lowercase letters, numbers and dashes.",
  body: "Formatting: ## Heading, - list item, > quote, **bold**, [link](https://…). Blank line = new paragraph.",
  date: "Format: YYYY-MM-DD",
  featured: "Featured projects appear on the home page (first four) and in the hero deck (first three).",
  timezone: "IANA time zone, e.g. Africa/Porto-Novo",
  stack: `Available: ${STACK_OPTIONS.join(", ")}`,
  bio: "Blank line = new paragraph. Links: [text](https://…).",
  greeting: "Typed out when the CV loads. Links: [text](https://…). {avatar} inserts the small portrait.",
  projectSlugs: "Slugs of the projects listed on the CV, in order. Leave empty to list the featured projects.",
  list: "Comma-separated list.",
};

export function humanize(key: string | number): string {
  if (typeof key === "number") return `#${key + 1}`;
  const spaced = key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

export function getAt(root: Json, path: Path): Json {
  return path.reduce<Json>(
    (node, key) => (node as Record<string | number, Json> | undefined)?.[key] as Json,
    root,
  );
}

export function setAt<T>(root: T, path: Path, value: Json): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  const clone = (Array.isArray(root) ? [...root] : { ...(root as object) }) as Record<string | number, unknown>;
  clone[head] = setAt(clone[head], rest, value);
  return clone as T;
}

/** Same shape as `sample`, emptied. Used as the template for "Add" buttons. */
function blank(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (sample !== null && typeof sample === "object") {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blank(v)]));
  }
  if (typeof sample === "boolean") return false;
  if (typeof sample === "number") return 0;
  return "";
}

/** Finds the template for a new array item by looking at the defaults (indexes collapse to 0). */
function templateFor(defaults: Json, path: Path): Json {
  const sample = getAt(defaults, [...path.map((p) => (typeof p === "number" ? 0 : p)), 0]);
  return sample === undefined ? "" : blank(sample);
}

function itemTitle(item: Json, index: number): string {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    if (item.type === "images") return `Images (${(item.images as Json[] | undefined)?.length ?? 0})`;
    for (const key of ["title", "label", "name", "question", "company", "heading", "strong", "slug"]) {
      const value = item[key];
      if (typeof value === "string" && value.trim()) return value;
    }
  }
  return `Item ${index + 1}`;
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium tracking-[-0.01em] outline-none transition-shadow placeholder:text-muted focus:border-ink focus:ring-2 focus:ring-ink/10";

/* ── Leaf controls ───────────────────────────────────────────────────── */

function TextControl({
  value,
  onChange,
  long,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  long: boolean;
  id: string;
}) {
  if (!long) {
    return <input id={id} className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />;
  }
  const rows = Math.min(24, Math.max(3, Math.ceil(value.length / 70) + value.split("\n").length - 1));
  return (
    <textarea
      id={id}
      rows={rows}
      className={cn(inputClass, "resize-y leading-relaxed")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ImageControl({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-tint">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImagePlus className="size-4 text-muted" />
          )}
        </div>
        <input
          id={id}
          className={inputClass}
          value={value}
          placeholder="/images/… or upload"
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold transition-colors hover:border-ink disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
          Upload
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  );
}

/* ── Recursive field ─────────────────────────────────────────────────── */

type FieldProps = {
  value: Json;
  path: Path;
  defaults: Json;
  onChange: (path: Path, value: Json) => void;
};

export function Field({ value, path, defaults, onChange }: FieldProps) {
  const id = useId();
  const key = path[path.length - 1];
  const parentKey = [...path].reverse().find((p): p is string => typeof p === "string") ?? "";
  const label = humanize(key);
  // The formatting hint only applies to blog bodies, not project text blocks.
  const hint =
    typeof key === "string" && (key !== "body" || path[0] === "blog") ? HINTS[key] : undefined;

  if (Array.isArray(value)) {
    return <ListField value={value} path={path} defaults={defaults} onChange={onChange} />;
  }

  if (value !== null && typeof value === "object") {
    return (
      <fieldset className="rounded-2xl border border-line bg-white/60 p-4">
        <legend className="px-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-soft">
          {label}
        </legend>
        <div className="flex flex-col gap-4">
          {Object.entries(value).map(([childKey, child]) => (
            <Field
              key={childKey}
              value={child}
              path={[...path, childKey]}
              defaults={defaults}
              onChange={onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={value}
            onChange={(e) => onChange(path, e.target.checked)}
          />
          <span className="relative h-6 w-10 rounded-full bg-line transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-ink peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-ink/30" />
          <span className="text-sm font-semibold">{label}</span>
        </label>
        {hint && <p className="mt-1.5 text-xs text-soft">{hint}</p>}
      </div>
    );
  }

  const text = value === null ? "" : String(value);
  const isType = key === "type";
  const options = typeof key === "string" ? ENUMS[key] : undefined;
  const isImage =
    (typeof key === "string" && IMAGE_KEY.test(key)) || (typeof key === "number" && parentKey === "images");
  const isLong = typeof key === "string" && LONG_TEXT.test(key);

  if (isType) return null;

  return (
    <div>
      {typeof key === "string" && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-soft">
          {label}
        </label>
      )}
      {options ? (
        <div className="relative">
          <select
            id={id}
            className={cn(inputClass, "appearance-none pr-9")}
            value={text}
            onChange={(e) => onChange(path, e.target.value)}
          >
            {!options.includes(text) && <option value={text}>{text || "—"}</option>}
            {options.map((option) => (
              <option key={option} value={option}>
                {humanize(option)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-soft" />
        </div>
      ) : isImage ? (
        <ImageControl id={id} value={text} onChange={(v) => onChange(path, v)} />
      ) : (
        <TextControl id={id} value={text} long={isLong} onChange={(v) => onChange(path, v)} />
      )}
      {hint && <p className="mt-1.5 text-xs text-soft">{hint}</p>}
    </div>
  );
}

/* ── Arrays: reorder, duplicate, remove, add ─────────────────────────── */

function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid size-8 place-items-center rounded-lg text-soft transition-colors hover:bg-tint hover:text-ink disabled:pointer-events-none disabled:opacity-30",
        danger && "hover:bg-red-50 hover:text-red-600",
      )}
    >
      {children}
    </button>
  );
}

function ListField({ value, path, defaults, onChange }: FieldProps & { value: Json[] }) {
  const key = path[path.length - 1];
  const label = humanize(key);
  const hint = typeof key === "string" ? HINTS[key] : undefined;
  const [open, setOpen] = useState<number | null>(null);
  const isBlocks = key === "blocks";
  const complex = value.some((item) => item !== null && typeof item === "object");
  const isComplexList = complex || (value.length === 0 && typeof templateFor(defaults, path) === "object");

  const update = (next: Json[]) => onChange(path, next);
  const move = (from: number, to: number) => {
    const next = [...value];
    next.splice(to, 0, next.splice(from, 1)[0]);
    update(next);
    setOpen((current) => (current === from ? to : current));
  };
  const add = (item: Json) => {
    update([...value, item]);
    setOpen(value.length);
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-soft">
          {label} <span className="font-medium normal-case tracking-normal text-muted">· {value.length}</span>
        </p>
      </div>
      {hint && <p className="-mt-1 mb-2 text-xs text-soft">{hint}</p>}

      <ul className="flex flex-col gap-2">
        {value.map((item, index) => {
          const controls = (
            <div className="flex shrink-0 items-center">
              <IconButton label="Move up" disabled={index === 0} onClick={() => move(index, index - 1)}>
                <ArrowUp className="size-4" />
              </IconButton>
              <IconButton
                label="Move down"
                disabled={index === value.length - 1}
                onClick={() => move(index, index + 1)}
              >
                <ArrowDown className="size-4" />
              </IconButton>
              {isComplexList && (
                <IconButton
                  label="Duplicate"
                  onClick={() => {
                    const copy = structuredClone(item) as Json;
                    if (copy && typeof copy === "object" && !Array.isArray(copy) && typeof copy.slug === "string") {
                      copy.slug = `${copy.slug}-copy`;
                    }
                    const next = [...value];
                    next.splice(index + 1, 0, copy);
                    update(next);
                    setOpen(index + 1);
                  }}
                >
                  <Copy className="size-4" />
                </IconButton>
              )}
              <IconButton
                label="Remove"
                danger
                onClick={() => {
                  if (isComplexList && !window.confirm(`Remove “${itemTitle(item, index)}”?`)) return;
                  update(value.filter((_, i) => i !== index));
                  setOpen(null);
                }}
              >
                <Trash2 className="size-4" />
              </IconButton>
            </div>
          );

          if (!isComplexList) {
            return (
              <li key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <Field value={item} path={[...path, index]} defaults={defaults} onChange={onChange} />
                </div>
                {controls}
              </li>
            );
          }

          const expanded = open === index;
          return (
            <li key={index} className="rounded-2xl border border-line bg-white">
              <div className="flex items-center gap-1 py-1.5 pl-1.5 pr-2">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-2 text-left"
                >
                  <ChevronDown
                    className={cn("size-4 shrink-0 text-soft transition-transform", !expanded && "-rotate-90")}
                  />
                  <span className="truncate text-sm font-semibold">{itemTitle(item, index)}</span>
                </button>
                {controls}
              </div>
              {expanded && (
                <div className="flex flex-col gap-4 border-t border-line p-4">
                  {item !== null && typeof item === "object" && !Array.isArray(item) ? (
                    Object.entries(item).map(([childKey, child]) => (
                      <Field
                        key={childKey}
                        value={child}
                        path={[...path, index, childKey]}
                        defaults={defaults}
                        onChange={onChange}
                      />
                    ))
                  ) : (
                    <Field value={item} path={[...path, index]} defaults={defaults} onChange={onChange} />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-2 flex flex-wrap gap-2">
        {isBlocks ? (
          <>
            <AddButton onClick={() => add({ type: "text", heading: "", body: "" })}>Add text block</AddButton>
            <AddButton onClick={() => add({ type: "images", images: [""] })}>Add image block</AddButton>
          </>
        ) : (
          <AddButton onClick={() => add(templateFor(defaults, path))}>Add {label.toLowerCase().replace(/s$/, "")}</AddButton>
        )}
      </div>
    </div>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-dashed border-muted/60 px-3 text-xs font-semibold text-soft transition-colors hover:border-ink hover:text-ink"
    >
      <Plus className="size-3.5" />
      {children}
    </button>
  );
}
