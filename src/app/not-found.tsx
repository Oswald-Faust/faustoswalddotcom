import Link from "next/link";
import { getLocalizedContent } from "@/i18n/locale";

export const instant = false;

export default async function NotFound() {
  const { ui } = await getLocalizedContent();
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="t-cap text-muted">{ui.notFoundKicker}</p>
        <h1 className="t-display mt-4">
          <span className="block text-muted">{ui.notFoundLead}</span>
          <span className="block">{ui.notFoundEnd}</span>
        </h1>
        <p className="t-body-lg mx-auto mt-6 max-w-[380px] text-soft">{ui.notFoundText}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="t-label inline-flex h-11 items-center rounded-full bg-ink px-[18px] text-white shadow-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {ui.backHome}
          </Link>
          <Link
            href="/projects"
            className="t-label inline-flex h-11 items-center rounded-full bg-bg px-[18px] shadow-card transition-transform duration-300 hover:-translate-y-0.5"
          >
            {ui.seeProjects}
          </Link>
        </div>
      </div>
    </main>
  );
}
