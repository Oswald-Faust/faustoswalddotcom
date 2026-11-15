"use client";

import { Award, CalendarDays, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** Bottom contact dock (appears after the hero) and the fixed award badge. */
export function Dock({
  email,
  calUrl,
  awardTitle,
  awardSubtitle,
  talkTitle,
  talkText,
  emailLabel,
  callLabel,
}: {
  email: string;
  calUrl: string;
  awardTitle: string;
  awardSubtitle: string;
  talkTitle: string;
  talkText: string;
  emailLabel: string;
  callLabel: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          >
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/55 p-3 pl-6 ring-1 ring-black/[0.05] backdrop-blur-xl backdrop-saturate-150">
              <div className="pr-3">
                <p className="t-label">{talkTitle}</p>
                <p className="t-cap mt-1 text-soft">{talkText}</p>
              </div>
              <a
                href={`mailto:${email}`}
                aria-label={emailLabel}
                className="grid size-10 place-items-center rounded-full bg-ink text-white shadow-ink transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                <Mail className="size-[18px]" strokeWidth={2.2} />
              </a>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={callLabel}
                className="grid size-10 place-items-center rounded-full bg-bg text-ink shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                <CalendarDays className="size-[18px]" strokeWidth={2.2} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://www.awwwards.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2.5 rounded-[14px] bg-white py-2.5 pl-3 pr-4 shadow-float transition-transform duration-300 hover:-translate-y-0.5 lg:flex"
      >
        <Award className="size-5" strokeWidth={1.8} />
        <span>
          <span className="block text-xs font-bold leading-tight">{awardTitle}</span>
          <span className="block text-[10px] leading-tight text-soft">{awardSubtitle}</span>
        </span>
      </a>
    </>
  );
}
