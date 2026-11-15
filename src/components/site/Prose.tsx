import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tiny, dependency-free renderer for the "markdown-lite" used by blog posts and
 * legal pages: `## h2`, `### h3`, `- list`, `> quote`, **bold**, [text](url),
 * blank line = new paragraph. Output is plain React elements, never raw HTML.
 */
type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "list"; items: string[] };

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "p", text: paragraph.join(" ") });
    if (list.length) blocks.push({ type: "list", items: list });
    paragraph = [];
    list = [];
  };

  for (const raw of source.split("\n")) {
    const line = raw.trim();
    const heading =
      (line.startsWith("### ") && ({ type: "h3", text: line.slice(4) } as const)) ||
      (line.startsWith("## ") && ({ type: "h2", text: line.slice(3) } as const)) ||
      (line.startsWith("> ") && ({ type: "quote", text: line.slice(2) } as const));

    if (!line) {
      flush();
    } else if (heading) {
      flush();
      blocks.push(heading);
    } else if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold">
          {match[1]}
        </strong>,
      );
    } else {
      const href = match[3];
      const safe = /^(https?:\/\/|mailto:|\/)/.test(href);
      nodes.push(
        safe ? (
          <a
            key={match.index}
            href={href}
            className="underline underline-offset-4 hover:text-soft"
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[2]}
          </a>
        ) : (
          match[2]
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Prose({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {parse(source).map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="t-h3 mt-14 first:mt-0">
                {inline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="t-lead mt-8 font-semibold">
                {inline(block.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote key={i} className="t-lead mt-6 border-l-2 border-ink pl-5">
                {inline(block.text)}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="t-body mt-5 flex flex-col gap-2.5 pl-5">
                {block.items.map((item, j) => (
                  <li key={j} className="list-disc pl-1 marker:text-muted">
                    {inline(item)}
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="t-body mt-5">
                {inline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
