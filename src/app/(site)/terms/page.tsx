import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { termsSource } from "@/content/legal";
import { getLocalizedContent } from "@/i18n/locale";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const { content, locale, ui } = await getLocalizedContent();
  return pageMetadata({
    settings: content.settings,
    locale,
    title: ui.termsTitle,
    description: ui.termsDescription,
    path: "/terms",
  });
}

export default async function TermsPage() {
  const { locale, ui } = await getLocalizedContent();
  return (
    <LegalPage
      title={ui.termsTitle}
      updated={formatDate("2026-08-16", locale)}
      updatedLabel={ui.lastUpdated}
      source={termsSource}
    />
  );
}
