"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { TextLink, type Token } from "./rich";

const LINK =
  "underline decoration-[#d4d4d4] decoration-1 underline-offset-[3px] transition-[text-decoration-color] duration-150 hover:decoration-(--cv-fg)";

/** Splits text into user-perceived characters, so emoji with modifiers stay whole. */
function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

function Avatar({ src }: { src: string }) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt=""
      width={36}
      height={36}
      className="mx-px inline-block size-[18px] rounded-[4px] object-cover object-top align-[-0.25em]"
    />
  );
}

/**
 * The greeting line, typed out once on load. The full sentence is always in the
 * DOM (hidden while typing) so the layout never jumps and print gets the text.
 */
export function Greeting({ tokens, avatar, label }: { tokens: Token[]; avatar: string; label: string }) {
  const units = useMemo(
    () => tokens.map((token) => (token.type === "avatar" ? [""] : graphemes(token.text))),
    [tokens],
  );
  const total = useMemo(() => units.reduce((sum, unit) => sum + unit.length, 0), [units]);
  const [count, setCount] = useState(0);
  const done = count >= total;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(
      () => {
        if (reduced) return setCount(total);
        interval = setInterval(() => setCount((current) => Math.min(total, current + 1)), 34);
      },
      reduced ? 0 : 350,
    );
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [total]);

  const render = (limit: number): ReactNode[] => {
    const nodes: ReactNode[] = [];
    let left = limit;
    tokens.forEach((token, i) => {
      if (left <= 0) return;
      const shown = units[i].slice(0, left);
      left -= shown.length;
      if (token.type === "avatar") nodes.push(<Avatar key={i} src={avatar} />);
      else if (token.type === "link") {
        nodes.push(
          <TextLink key={i} href={token.href} className={LINK}>
            {shown.join("")}
          </TextLink>,
        );
      } else nodes.push(<span key={i}>{shown.join("")}</span>);
    });
    return nodes;
  };

  return (
    <h1 aria-label={label} className="relative text-[15px] leading-[1.6] text-pretty print:text-[12px]">
      <span className={done ? undefined : "invisible print:visible"}>{render(total)}</span>
      {!done && (
        <span aria-hidden className="absolute inset-0 print:hidden">
          {render(count)}
          <span className="cv-caret" />
        </span>
      )}
    </h1>
  );
}
