"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export type TextPart = { text: string; muted?: boolean; block?: boolean };

/** Word-by-word blur-in headline, the signature text effect of the original site. */
export function RevealText({
  parts,
  as = "h2",
  className,
  mutedClassName = "text-muted",
  delay = 0,
}: {
  parts: TextPart[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  mutedClassName?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const label = parts.map((p) => p.text).join(" ");

  if (reduce) {
    return createElement(
      as,
      { className },
      parts.map((part, i) => (
        <span
          key={i}
          className={cn(part.block && "block", part.muted && mutedClassName)}
        >
          {part.text}{" "}
        </span>
      )),
    );
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      aria-label={label}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(part.block && "block", part.muted && mutedClassName)}
        >
          {part.text.split(" ").map((word, j) => (
            <motion.span
              key={j}
              variants={wordVariants}
              className="inline-block whitespace-pre will-change-transform"
            >
              {word}{" "}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

/** Generic in-view entrance used for cards, paragraphs and media. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cycles through words with a vertical blur roll. The slot animates its width,
 * so text placed after it glides instead of jumping.
 */
export function RotatingWord({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const word = words[index % words.length] ?? "";

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  useLayoutEffect(() => {
    const measure = () => {
      if (measureRef.current) setWidth(measureRef.current.offsetWidth);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [word]);

  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap align-baseline transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      style={{ width: width ?? undefined }}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span
        ref={measureRef}
        aria-hidden
        className="invisible absolute left-0 top-0 whitespace-nowrap"
      >
        {word}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          className="inline-block whitespace-nowrap"
          initial={{ y: "70%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
