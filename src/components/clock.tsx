"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Athens",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 15_000);
  return () => window.clearInterval(id);
}

/**
 * Local time where the author is, so a visitor in another timezone can tell
 * whether it is a reasonable hour to expect a reply. Empty on the server and
 * filled in after hydration; the fixed width stops the bar from shifting.
 */
export function Clock({ place }: { place: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => "",
  );

  return (
    <p
      className="meta text-muted"
      aria-label={time ? `Local time in ${place}: ${time}` : undefined}
    >
      <span className="text-ink-2">{place}</span>
      <span className="inline-block min-w-[15ch] pl-2 text-right">{time}</span>
    </p>
  );
}
