"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Light obfuscation against scrapers. The address is never one string in the
 * HTML: user, "@" and domain sit in separate elements, and the `mailto:` href
 * only exists after hydration. A person sees, selects and copies it normally.
 */
export function EmailLink({
  user,
  domain,
  className = "",
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  return (
    <a
      href={hydrated ? `mailto:${user}@${domain}` : undefined}
      className={`link ${className}`}
    >
      <span>{user}</span>
      <span>@</span>
      <span>{domain}</span>
    </a>
  );
}
