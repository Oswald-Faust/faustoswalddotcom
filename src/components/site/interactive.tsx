"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── FAQ accordion ───────────────────────────────────────────────────── */

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="rounded-2xl bg-white shadow-card">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center gap-5 px-4 py-3.5 text-left"
              >
                <span className="t-body w-5 shrink-0 tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body flex-1 font-semibold">{item.question}</span>
                <span className="grid size-6 shrink-0 place-items-center">
                  {isOpen ? (
                    <Minus className="size-4" strokeWidth={2.5} />
                  ) : (
                    <Plus className="size-4" strokeWidth={2.5} />
                  )}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="t-sm border-t border-line px-4 py-4">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Experience: a small deck that fans out into a list ──────────────── */

export function ExperienceStack({
  items,
  seeAll = "See all",
  showLess = "Show less",
}: {
  items: { company: string; role: string; period: string }[];
  seeAll?: string;
  showLess?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const CARD_HEIGHT = 77;
  const PEEK = 10;

  return (
    <div>
      <ul className="relative">
        {items.map((item, i) => (
          <motion.li
            key={`${item.company}-${i}`}
            className="relative origin-top rounded-2xl bg-white px-[18px] py-[18px] shadow-card"
            style={{ zIndex: items.length - i, height: CARD_HEIGHT }}
            initial={false}
            animate={{
              marginTop: i === 0 ? 0 : expanded ? 8 : -(CARD_HEIGHT - PEEK),
              scale: expanded ? 1 : 1 - Math.min(i, 3) * 0.05,
              opacity: expanded || i < 3 ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="t-body">{item.company}</p>
            <div className="mt-1 flex items-center justify-between gap-4">
              <p className="t-cap text-soft">{item.role}</p>
              <p className="t-cap shrink-0 text-soft">{item.period}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      {items.length > 1 && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="t-cap inline-flex h-[30px] items-center rounded-full bg-white px-4 shadow-pill transition-transform duration-300 hover:-translate-y-0.5"
          >
            {expanded ? showLess : seeAll}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Live local time (footer) ────────────────────────────────────────── */

/** Re-renders subscribers every 15 seconds; the snapshot is a formatted string, so it is stable in between. */
function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, 15_000);
  return () => clearInterval(id);
}
const noopSubscribe = () => () => {};

function formatTime(timezone: string): string | null {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return null;
  }
}

export function LocalTime({
  timezone,
  city,
  label,
}: {
  timezone: string;
  city: string;
  label: string;
}) {
  const time = useSyncExternalStore(
    subscribeToClock,
    () => formatTime(timezone),
    () => null,
  );

  return (
    <span className={cn("inline-flex items-center gap-2 tabular-nums", !time && "opacity-0")}>
      <span className="relative grid size-1.5 place-items-center">
        <span className="absolute size-1.5 animate-ping-soft rounded-full bg-live" />
        <span className="size-1.5 rounded-full bg-live" />
      </span>
      {city} · {time ?? "00:00"} {label}
    </span>
  );
}

export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
