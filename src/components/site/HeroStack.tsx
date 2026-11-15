"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";

type Card = { src: string; title: string };

const SLOTS = [
  { rotate: 7, x: 0, y: 0, scale: 1 },
  { rotate: -5, x: -34, y: -18, scale: 0.95 },
  { rotate: 13, x: 44, y: 4, scale: 0.9 },
];

/**
 * The fanned deck of project covers in the hero. It shuffles on a timer (or on
 * click) and leans toward the pointer.
 */
export function HeroStack({
  cards,
  shuffleLabel = "Shuffle featured projects",
}: {
  cards: Card[];
  shuffleLabel?: string;
}) {
  const reduce = useReducedMotion();
  const deck = cards.slice(0, 3);
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce || paused || deck.length < 2) return;
    const id = setInterval(() => setFront((f) => (f + 1) % deck.length), 3400);
    return () => clearInterval(id);
  }, [reduce, paused, deck.length]);

  if (deck.length === 0) return null;

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-[min(100%,380px)] [perspective:1200px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        px.set(0);
        py.set(0);
      }}
    >
      <motion.button
        type="button"
        aria-label={shuffleLabel}
        onClick={() => setFront((f) => (f + 1) % deck.length)}
        className="absolute inset-0 cursor-pointer [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateX, rotateY }}
      >
        {deck.map((card, i) => {
          const slotIndex = (i - front + deck.length) % deck.length;
          const slot = SLOTS[slotIndex];
          return (
            <motion.span
              key={card.src}
              className="absolute inset-0 block overflow-hidden rounded-[18px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
              initial={false}
              animate={{ ...slot, zIndex: deck.length - slotIndex }}
              transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.9 }}
            >
              <Image
                src={card.src}
                alt={slotIndex === 0 ? `${card.title} project preview` : ""}
                width={760}
                height={570}
                sizes="380px"
                priority={i === 0}
                className="size-full object-cover"
              />
            </motion.span>
          );
        })}
      </motion.button>
    </div>
  );
}
