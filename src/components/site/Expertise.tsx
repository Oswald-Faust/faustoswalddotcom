"use client";

import { Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { RevealText } from "./motion";
import { Cta, Section } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Expertise({
  title,
  items,
  bannerText,
  bannerCta,
  email,
}: {
  title: string;
  items: { title: string; text: string }[];
  bannerText: string;
  bannerCta: string;
  email: string;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const index = items[active] ? active : 0;
  const item = items[index];
  if (!item) return null;

  function move(event: KeyboardEvent<HTMLButtonElement>, from: number) {
    const last = items.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (from + 1) % items.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (from - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  return (
    <Section dark innerClassName="py-24 md:py-32">
      <RevealText parts={[{ text: title }]} className="t-h2 max-w-[540px]" />

      <div className="mt-14 grid items-start gap-10 md:mt-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
        <div role="tablist" aria-orientation="vertical" aria-label={title}>
          {items.map((offer, i) => {
            const selected = i === index;
            return (
              <button
                key={offer.title}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(event) => move(event, i)}
                className={cn(
                  "flex w-full items-center gap-4 border-t border-white/15 py-4 text-left transition-colors",
                  i === items.length - 1 && "border-b",
                  selected ? "text-white" : "text-white/40 hover:text-white/70",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-6 w-0.5 shrink-0 rounded-full transition-colors",
                    selected ? "bg-white" : "bg-transparent",
                  )}
                />
                <span className="text-[clamp(1.25rem,1rem+0.8vw,1.625rem)] font-medium leading-[1.2] tracking-[-0.03em]">
                  {offer.title}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          className="md:min-h-[240px] md:border-l md:border-white/15 md:pl-12 md:pt-5"
        >
          <OfferBody
            item={item}
            cta={bannerCta}
            email={email}
            reduce={reduce ?? false}
          />
        </div>
      </div>

      <p className="mt-14 max-w-[42ch] text-base font-medium leading-snug text-white/55 md:mt-20">
        {bannerText}
      </p>
    </Section>
  );
}

function OfferBody({
  item,
  cta,
  email,
  reduce,
}: {
  item: { title: string; text: string };
  cta: string;
  email: string;
  reduce: boolean;
}) {
  const body = (
    <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <p className="max-w-[34ch] text-[1.125rem] font-medium leading-[1.55] tracking-[-0.02em] text-white/80">
        {item.text}
      </p>
      <Cta
        href={`mailto:${email}?subject=${encodeURIComponent(item.title)}`}
        variant="paper"
        icon={<Mail />}
        className="shrink-0"
      >
        {cta}
      </Cta>
    </div>
  );

  if (reduce) return body;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        {body}
      </motion.div>
    </AnimatePresence>
  );
}
