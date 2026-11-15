import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline markup used by the CV greeting and bio:
 * `[text](url)` is a link and `{avatar}` is the small portrait.
 */
export type Token =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "avatar" };

const SAFE_HREF = /^(https?:\/\/|mailto:|\/|#)/;

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\{avatar\}/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source))) {
    if (match.index > last) tokens.push({ type: "text", text: source.slice(last, match.index) });
    if (match[1] === undefined) tokens.push({ type: "avatar" });
    else if (SAFE_HREF.test(match[2])) tokens.push({ type: "link", text: match[1], href: match[2] });
    else tokens.push({ type: "text", text: match[1] });
    last = pattern.lastIndex;
  }
  if (last < source.length) tokens.push({ type: "text", text: source.slice(last) });
  return tokens;
}

/** The markup with links flattened to their text and the avatar dropped. */
export function plainText(tokens: Token[]): string {
  return tokens
    .map((token) => (token.type === "avatar" ? "" : token.text))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

/** Internal paths use the router; everything else opens in a new tab. */
export function TextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const web = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      target={web ? "_blank" : undefined}
      rel={web ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
