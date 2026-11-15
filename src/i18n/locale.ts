import { cache } from "react";
import { cookies } from "next/headers";
import type { SiteContent } from "@/content/types";
import { getContent } from "@/lib/content";
import { french } from "./fr";
import { localize } from "./localize";
import { LOCALE_COOKIE, type Locale } from "./types";
import { ui, type UiCopy } from "./ui";

export const getLocale = cache(async (): Promise<Locale> => {
  const jar = await cookies();
  return jar.get(LOCALE_COOKIE)?.value === "fr" ? "fr" : "en";
});

export async function getLocalizedContent(): Promise<{
  content: SiteContent;
  locale: Locale;
  ui: UiCopy;
}> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    content: locale === "fr" ? localize(content, french) : content,
    locale,
    ui: ui[locale],
  };
}
