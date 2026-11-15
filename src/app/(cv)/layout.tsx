import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "@/i18n/locale";
import { ui } from "@/i18n/ui";

export const instant = false;

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

/** Bare layout for the CV sub-site: its own typeface, no nav pill, no dock, no marketing footer. */
export default async function CvLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  return (
    <div className={`cv-page ${geist.variable} ${geistMono.variable}`}>
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-(--cv-fg) px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 print:hidden"
      >
        {ui[locale].skip}
      </a>
      {children}
    </div>
  );
}
