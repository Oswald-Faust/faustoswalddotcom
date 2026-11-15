"use client";

import {
  BadgeDollarSign,
  BookOpen,
  Check,
  CircleHelp,
  ExternalLink,
  FolderKanban,
  GalleryHorizontalEnd,
  GraduationCap,
  Home,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquareQuote,
  PanelBottom,
  Settings,
  Sparkles,
  Star,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { logoutAction, saveContentAction } from "@/app/admin/actions";
import { defaultContent } from "@/content/default";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { Field, type Path } from "./fields";

type SectionKey = keyof SiteContent;

const SECTIONS: { key: SectionKey; label: string; icon: LucideIcon; note: string }[] = [
  { key: "settings", label: "Settings", icon: Settings, note: "Identity, contact links, availability badge and SEO." },
  { key: "hero", label: "Hero", icon: Home, note: "The first screen: headline, rotating words and call to action." },
  { key: "logos", label: "Client logos", icon: GalleryHorizontalEnd, note: "Logos shown in the two scrolling ribbons." },
  { key: "projects", label: "Projects", icon: FolderKanban, note: "Case studies. Toggle “Featured” to show one on the home page." },
  { key: "projectsSection", label: "Projects labels", icon: Wrench, note: "Titles and category names used around the project grids." },
  { key: "services", label: "Services", icon: Sparkles, note: "Service list and the tech stack icons." },
  { key: "about", label: "About", icon: UserRound, note: "Portrait, bio paragraphs and experience." },
  { key: "pricing", label: "Pricing", icon: BadgeDollarSign, note: "Steps, subscription and one-off project offers." },
  { key: "expertise", label: "Expertise", icon: Star, note: "The dark section: pick a format — coaching, mentoring or AI." },
  { key: "testimonials", label: "Testimonials", icon: MessageSquareQuote, note: "Client quotes." },
  { key: "faq", label: "FAQ", icon: CircleHelp, note: "Questions, answers and the discovery-call card." },
  { key: "footer", label: "Footer", icon: PanelBottom, note: "Closing headline and labels." },
  { key: "blog", label: "Blog", icon: BookOpen, note: "Blog intro and articles." },
  { key: "cv", label: "CV", icon: GraduationCap, note: "The one-page CV at /cv: greeting, bio, work, education, involvements and skills." },
];

type Toast = { kind: "success" | "error"; message: string } | null;

export function Editor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [saved, setSaved] = useState<SiteContent>(initial);
  const [active, setActive] = useState<SectionKey | "overview">("overview");
  const [toast, setToast] = useState<Toast>(null);
  const [saving, startSaving] = useTransition();
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const dirty = useMemo(() => JSON.stringify(content) !== JSON.stringify(saved), [content, saved]);

  const notify = useCallback((next: Toast) => {
    setToast(next);
    clearTimeout(toastTimer.current);
    if (next?.kind === "success") toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const save = useCallback(() => {
    if (!dirty || saving) return;
    const snapshot = content;
    startSaving(async () => {
      const result = await saveContentAction(snapshot);
      if (result.ok) {
        setSaved(snapshot);
        notify({ kind: "success", message: "Saved. The live site is up to date." });
      } else {
        notify({ kind: "error", message: result.error });
      }
    });
  }, [content, dirty, saving, notify]);

  // ⌘S / Ctrl+S saves; warn before leaving with unsaved edits.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    const onLeave = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [save, dirty]);

  const onChange = useCallback((path: Path, value: unknown) => {
    setContent((current) => {
      const apply = (node: unknown, rest: Path): unknown => {
        if (rest.length === 0) return value;
        const [head, ...tail] = rest;
        const clone = (Array.isArray(node) ? [...node] : { ...(node as object) }) as Record<string | number, unknown>;
        clone[head] = apply(clone[head], tail);
        return clone;
      };
      return apply(current, path) as SiteContent;
    });
  }, []);

  const section = SECTIONS.find((s) => s.key === active);

  return (
    <div className="min-h-screen bg-bg lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="border-b border-line bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <span className="grid size-8 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
              FO
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">{content.settings.name}</p>
              <p className="text-xs text-soft">Site dashboard</p>
            </div>
          </div>
          <nav
            aria-label="Sections"
            className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-y-auto"
          >
            <NavItem
              icon={LayoutDashboard}
              label="Overview"
              active={active === "overview"}
              onClick={() => setActive("overview")}
            />
            {SECTIONS.map((item) => (
              <NavItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={active === item.key}
                changed={JSON.stringify(content[item.key]) !== JSON.stringify(saved[item.key])}
                onClick={() => setActive(item.key)}
              />
            ))}
          </nav>
          <div className="hidden border-t border-line p-3 lg:block">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-soft transition-colors hover:bg-tint hover:text-ink"
            >
              <ExternalLink className="size-4" /> View site
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-soft transition-colors hover:bg-tint hover:text-ink"
              >
                <LogOut className="size-4" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-bg/85 px-5 py-3.5 backdrop-blur-xl md:px-10">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-[-0.02em]">
              {section?.label ?? "Overview"}
            </h1>
            <p className="truncate text-xs text-soft">
              {section?.note ?? "Everything on the site, editable in one place."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span
              aria-live="polite"
              className={cn(
                "hidden items-center gap-1.5 text-xs font-semibold sm:flex",
                dirty ? "text-amber-600" : "text-soft",
              )}
            >
              <span className={cn("size-1.5 rounded-full", dirty ? "bg-amber-500" : "bg-live")} />
              {dirty ? "Unsaved changes" : "All changes saved"}
            </span>
            {dirty && (
              <button
                type="button"
                onClick={() => setContent(saved)}
                className="h-10 rounded-full px-3.5 text-sm font-semibold text-soft transition-colors hover:text-ink"
              >
                Discard
              </button>
            )}
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saving}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white shadow-ink transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
            >
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              Save
              <kbd className="hidden rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold md:inline">⌘S</kbd>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-[820px] px-5 py-8 md:px-10 md:py-10">
          {active === "overview" ? (
            <Overview content={content} onOpen={setActive} />
          ) : (
            <div className="flex flex-col gap-5">
              {(() => {
                const value = content[active];
                if (Array.isArray(value)) {
                  return (
                    <Field value={value as never} path={[active]} defaults={defaultContent as never} onChange={onChange} />
                  );
                }
                return Object.entries(value).map(([key, child]) => (
                  <Field
                    key={key}
                    value={child as never}
                    path={[active, key]}
                    defaults={defaultContent as never}
                    onChange={onChange}
                  />
                ));
              })()}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          role={toast.kind === "error" ? "alert" : "status"}
          className={cn(
            "fixed bottom-5 left-1/2 z-50 flex w-[min(92vw,460px)] -translate-x-1/2 items-start gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold shadow-float",
            toast.kind === "success" ? "bg-ink text-white" : "bg-red-600 text-white",
          )}
        >
          <span className="flex-1">{toast.message}</span>
          <button type="button" onClick={() => setToast(null)} className="shrink-0 opacity-70 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  changed,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  changed?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
        active ? "bg-ink text-white" : "text-soft hover:bg-tint hover:text-ink",
      )}
    >
      <Icon className="size-4" />
      <span className="flex-1 text-left">{label}</span>
      {changed && <span className="size-1.5 rounded-full bg-amber-500" aria-label="Unsaved changes" />}
    </button>
  );
}

function Overview({
  content,
  onOpen,
}: {
  content: SiteContent;
  onOpen: (key: SectionKey) => void;
}) {
  const stats: { label: string; value: number; key: SectionKey }[] = [
    { label: "Projects", value: content.projects.length, key: "projects" },
    { label: "Featured on home", value: content.projects.filter((p) => p.featured).length, key: "projects" },
    { label: "Blog articles", value: content.blog.posts.length, key: "blog" },
    { label: "Testimonials", value: content.testimonials.items.length, key: "testimonials" },
    { label: "FAQ entries", value: content.faq.items.length, key: "faq" },
    { label: "Client logos", value: content.logos.length, key: "logos" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[2rem] font-medium leading-tight tracking-[-0.03em]">
          <span className="text-muted">Welcome back,</span> {content.settings.name.split(" ")[0]}.
        </h2>
        <p className="mt-2 max-w-[520px] text-sm text-soft">
          Pick a section on the left, edit, then press Save. Changes go live immediately — no
          rebuild needed.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <li key={stat.label}>
            <button
              type="button"
              onClick={() => onOpen(stat.key)}
              className="w-full rounded-2xl bg-white p-5 text-left shadow-card transition-transform hover:-translate-y-0.5"
            >
              <p className="text-[2rem] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold text-soft">{stat.label}</p>
            </button>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-white p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-soft">Live right now</p>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold text-soft">Availability badge</dt>
            <dd className="mt-1 font-semibold">{content.settings.availability}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-soft">Subscription price</dt>
            <dd className="mt-1 font-semibold">
              {content.pricing.subscription.price} {content.pricing.subscription.period}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-soft">Contact email</dt>
            <dd className="mt-1 break-all font-semibold">{content.settings.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-soft">Booking link</dt>
            <dd className="mt-1 break-all font-semibold">{content.settings.calUrl}</dd>
          </div>
        </dl>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-soft">Sections</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {SECTIONS.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onOpen(item.key)}
                className="flex w-full items-start gap-3 rounded-2xl border border-line bg-white/60 p-4 text-left transition-colors hover:border-ink"
              >
                <item.icon className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-soft">{item.note}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
