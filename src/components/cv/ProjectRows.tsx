"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ProjectRow = { href: string; name: string; text: string; cover: string };

const CARD_WIDTH = 320;
const CARD_HEIGHT = 200;
const OFFSET = 18;

/** Project list with a screenshot card that follows the cursor (mouse only). */
export function ProjectRows({ items }: { items: ProjectRow[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  const follow = (event: React.MouseEvent) => {
    if (!card.current) return;
    const flipX = event.clientX + OFFSET + CARD_WIDTH > window.innerWidth - 8;
    const flipY = event.clientY + OFFSET + CARD_HEIGHT > window.innerHeight - 8;
    const x = flipX ? event.clientX - OFFSET - CARD_WIDTH : event.clientX + OFFSET;
    const y = flipY ? event.clientY - OFFSET - CARD_HEIGHT : event.clientY + OFFSET;
    card.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <>
      <ul onMouseEnter={() => setArmed(true)} onMouseMove={follow} onMouseLeave={() => setActive(null)}>
        {items.map((item, i) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
              className="cv-row cv-row--entity group"
            >
              <span aria-hidden className="cv-logo cv-logo--dark">
                {item.name.charAt(0)}
              </span>
              <span className="cv-name">{item.name}</span>
              <span className="cv-role">{item.text}</span>
              <span aria-hidden className="cv-arrow">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={card}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block print:!hidden"
      >
        <div
          className={cn(
            "relative origin-top-left overflow-hidden rounded-lg bg-[#f4f4f4] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            active === null ? "scale-[0.96] opacity-0" : "scale-100 opacity-100",
          )}
          style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        >
          {armed &&
            items.map((item, i) =>
              item.cover ? (
                <Image
                  key={item.href}
                  src={item.cover}
                  alt=""
                  fill
                  sizes={`${CARD_WIDTH}px`}
                  unoptimized={!item.cover.startsWith("/images/")}
                  className={cn(
                    "object-cover object-top transition-opacity duration-150",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
              ) : null,
            )}
        </div>
      </div>
    </>
  );
}
