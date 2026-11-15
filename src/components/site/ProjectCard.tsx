"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { Media } from "./ui";

/**
 * Project tile. On fine pointers a "View project" chip trails the cursor over
 * the cover; the static label under the image stays for touch and keyboard.
 */
export function ProjectCard({
  slug,
  title,
  tagline,
  cover,
  priority = false,
  viewLabel = "View project",
}: {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  priority?: boolean;
  viewLabel?: string;
}) {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tint"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left);
          y.set(e.clientY - rect.top);
        }}
      >
        <Media
          src={cover}
          alt={`${title} — ${tagline}`}
          width={968}
          height={726}
          sizes="(min-width: 768px) 484px, 100vw"
          priority={priority}
          className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <motion.span
          aria-hidden
          className="t-cap pointer-events-none absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/85 px-3.5 py-2.5 shadow-float backdrop-blur-md"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-140%" }}
          animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {viewLabel}
          <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
        </motion.span>
      </div>
      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <h3 className="t-body-lg">{title}</h3>
          <p className="t-cap mt-1.5 text-soft">{tagline}</p>
        </div>
        <span className="t-cap flex items-center gap-1.5 pt-1.5 text-soft transition-colors group-hover:text-ink">
          <ArrowUpRight
            className="size-4 text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
          {viewLabel}
        </span>
      </div>
    </Link>
  );
}
