"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

function format(timezone: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timezone,
    }).format(new Date());
  } catch {
    return null;
  }
}

/** Live local time in the given IANA time zone, e.g. "4:58:16 PM". */
export function Clock({ timezone }: { timezone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format(timezone),
    () => null,
  );
  return (
    <time className="cv-mono leading-[22.4px] print:hidden" suppressHydrationWarning>
      {time ?? " "}
    </time>
  );
}
