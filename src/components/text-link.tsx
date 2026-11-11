import Link from "next/link";
import type { ReactNode } from "react";

/** Marks links that leave the site. Drawn, not a glyph, so it inherits colour and weight. */
export function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      className="ml-1 inline-block size-[0.6em] align-baseline"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={`link ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} rel="noreferrer" className={`link ${className}`}>
      {children}
      <ExternalMark />
    </a>
  );
}
