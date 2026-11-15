"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import { LOCALES, type Locale } from "@/i18n/types";
import { cn } from "@/lib/cn";

export function LanguageSwitch({
  locale,
  label,
  names,
  className,
}: {
  locale: Locale;
  label: string;
  names: Record<Locale, string>;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex shrink-0 items-center rounded-full bg-tint p-0.5",
        pending && "opacity-60",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const selected = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            aria-label={names[code]}
            onClick={() => choose(code)}
            className={cn(
              "h-7 rounded-full px-2.5 text-[12px] font-semibold",
              selected ? "bg-ink text-white" : "text-muted hover:text-ink",
            )}
          >
            {code === "fr" ? "FR" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
