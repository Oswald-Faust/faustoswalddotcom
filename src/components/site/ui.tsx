import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import {
  AppWindow,
  Laptop,
  Smartphone,
  WandSparkles,
  Zap,
} from "lucide-react";
import {
  SiApple,
  SiDocker,
  SiExpo,
  SiFlutter,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { cn } from "@/lib/cn";

/* ── Section scaffolding ─────────────────────────────────────────────── */

/**
 * Full-width band with the 1080px column inside. Light sections draw the two
 * vertical guide lines and a hairline on top, with a small crosshair where
 * they meet.
 */
export function Section({
  id,
  children,
  className,
  innerClassName,
  dark = false,
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  dark?: boolean;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        dark ? "on-dark bg-night text-white" : divider && "border-t border-line",
        className,
      )}
    >
      <div
        className={cn(
          "shell",
          !dark && "border-x border-line",
          innerClassName,
        )}
      >
        {!dark && divider && (
          <>
            <Crosshair className="-left-[5px] -top-[5px]" />
            <Crosshair className="-right-[5px] -top-[5px]" />
          </>
        )}
        {children}
      </div>
    </section>
  );
}

function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 hidden size-[9px] md:block",
        "before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-muted/70",
        "after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-muted/70",
        className,
      )}
    />
  );
}

/* ── Buttons & pills ─────────────────────────────────────────────────── */

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: "ink" | "paper";
  icon?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function Cta({
  href,
  children,
  variant = "ink",
  icon,
  className,
  ...rest
}: CtaProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(
    "group/cta t-label inline-flex h-11 shrink-0 items-center gap-2.5 rounded-full pl-3 pr-[18px] transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    !icon && "pl-[18px]",
    variant === "ink"
      ? "bg-ink text-white shadow-ink"
      : "bg-bg text-ink shadow-card",
    className,
  );
  const content = (
    <>
      {icon && (
        <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-full [&_svg]:size-4">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function Pill({
  children,
  live = false,
  className,
}: {
  children: ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "t-cap inline-flex h-[30px] items-center gap-2.5 rounded-full bg-white px-3 text-ink shadow-pill",
        className,
      )}
    >
      {live && (
        <span className="relative grid size-2 place-items-center">
          <span className="absolute size-2 animate-ping-soft rounded-full bg-live" />
          <span className="size-2 rounded-full bg-live" />
        </span>
      )}
      {children}
    </span>
  );
}

/* ── Media ───────────────────────────────────────────────────────────── */

/**
 * Bundled images go through next/image; anything else (admin uploads served
 * from /media, external URLs) falls back to a plain <img>.
 */
export function Media({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
  style,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  if (!src) return null;
  if (src.startsWith("/images/") && !src.endsWith(".svg")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}

/* ── Icon registries (keys are editable from the admin) ──────────────── */

export const serviceIcons: Record<string, ReactNode> = {
  framer: <SiFramer />,
  mobile: <Smartphone />,
  web: <Laptop />,
  landing: <AppWindow />,
  ai: <WandSparkles />,
};

export const stackIcons: Record<string, { label: string; icon: ReactNode }> = {
  javascript: { label: "JavaScript", icon: <SiJavascript /> },
  typescript: { label: "TypeScript", icon: <SiTypescript /> },
  react: { label: "React & React Native", icon: <SiReact /> },
  nextjs: { label: "Next.js", icon: <SiNextdotjs /> },
  apple: { label: "iOS", icon: <SiApple /> },
  swift: { label: "Swift", icon: <SiSwift /> },
  supabase: { label: "Supabase", icon: <SiSupabase /> },
  docker: { label: "Docker", icon: <SiDocker /> },
  node: { label: "Node.js", icon: <SiNodedotjs /> },
  python: { label: "Python", icon: <SiPython /> },
  tailwind: { label: "Tailwind CSS", icon: <SiTailwindcss /> },
  mongodb: { label: "MongoDB", icon: <SiMongodb /> },
  expo: { label: "Expo", icon: <SiExpo /> },
  flutter: { label: "Flutter", icon: <SiFlutter /> },
  framer: { label: "Framer", icon: <SiFramer /> },
  bolt: { label: "Automation", icon: <Zap /> },
};
