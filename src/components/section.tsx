import type { ReactNode } from "react";

/**
 * Every section opens the same way: a 2px ink rule, the heading on the left
 * and one line of derived metadata on the right.
 */
export function Section({
  id,
  title,
  meta,
  children,
  className = "",
}: {
  id: string;
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mt-24 md:mt-32 ${className}`}
    >
      <header className="border-ink flex items-baseline justify-between gap-6 border-t-2 pt-3">
        <h2
          id={`${id}-title`}
          className="text-lg font-semibold tracking-[-0.01em]"
        >
          {title}
        </h2>
        {meta ? <p className="meta text-muted">{meta}</p> : null}
      </header>
      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}

/** One labelled row of a ruled definition list. */
export function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-rule grid grid-cols-1 gap-x-6 border-t py-3 sm:grid-cols-[6.5rem_1fr]">
      <dt className="label">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}
