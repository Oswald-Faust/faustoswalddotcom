import Image from "next/image";
import { CalendarDays, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { Cta, Media, Section } from "./ui";

const CLIENT_AVATARS = [
  "/images/people/client-1.jpg",
  "/images/people/client-2.png",
  "/images/people/client-3.png",
  "/images/people/client-4.jpg",
  "/images/people/client-5.jpg",
];

export function AvatarStack({
  label,
  ratingLabel = "Rated five stars",
  className,
}: {
  label: string;
  ratingLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex">
        {CLIENT_AVATARS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={64}
            height={64}
            className={cn(
              "size-8 rounded-full object-cover ring-2 ring-bg",
              i > 0 && "-ml-[9px]",
            )}
          />
        ))}
      </div>
      <div>
        <div className="flex gap-0.5" aria-label={ratingLabel}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-3 fill-ink" strokeWidth={0} />
          ))}
        </div>
        <p className="t-label mt-1.5 text-soft">{label}</p>
      </div>
    </div>
  );
}

/** Infinite logo ribbon. The track is duplicated once and slides by -50%. */
export function LogoMarquee({ logos }: { logos: SiteContent["logos"] }) {
  const track = [...logos, ...logos];
  return (
    <div className="fade-x min-w-0 flex-1 overflow-hidden">
      <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {track.map((logo, i) => (
          <li key={i} aria-hidden={i >= logos.length} className="px-8">
            <Media
              src={logo.src}
              alt={i < logos.length ? logo.name : ""}
              width={212}
              height={56}
              sizes="212px"
              style={{ width: "auto" }}
              className="h-10 w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-14 md:max-w-[212px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LogosStrip({
  lead,
  logos,
}: {
  lead: ReactNode;
  logos: SiteContent["logos"];
}) {
  return (
    <Section innerClassName="flex flex-col gap-6 py-8 md:flex-row md:items-center md:gap-8">
      <div className="shrink-0 md:border-r md:border-line md:pr-8">{lead}</div>
      <LogoMarquee logos={logos} />
    </Section>
  );
}

/** White "book a call" card used beside the FAQ and at the end of inner pages. */
export function CallCard({
  title,
  text,
  button,
  calUrl,
  className,
}: {
  title: string;
  text: string;
  button: string;
  calUrl: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl bg-white p-8 shadow-card", className)}>
      <Image
        src="/images/people/memoji.png"
        alt=""
        width={128}
        height={128}
        className="size-16 rounded-full bg-tint object-cover object-top"
      />
      <h3 className="t-h3 mt-6">{title}</h3>
      <p className="t-sm mt-4 max-w-[340px]">{text}</p>
      <div className="mt-8 flex items-center gap-4">
        <Cta href={calUrl} icon={<CalendarDays />}>
          {button}
        </Cta>
        <span className="t-label text-muted/70">Cal.com</span>
      </div>
    </div>
  );
}
