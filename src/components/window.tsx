import type { ReactNode } from "react";

/**
 * One tiled window. `title` is its label and the section heading; `meta` is a
 * short line of derived or dated information on the right of the label row.
 * Placement on the 12-column grid comes from `className`.
 */
export function Window({
  id,
  title,
  meta,
  children,
  className = "",
}: {
  id: string;
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`window ${className}`}
    >
      <header className="window-bar">
        <h2 id={`${id}-title`} className="window-title">
          {title}
        </h2>
        {meta ? <p className="window-meta">{meta}</p> : null}
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}

/** One key/value row. */
export function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-rule grid grid-cols-1 gap-x-4 border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[7.5rem_1fr]">
      <dt className="label">{label}</dt>
      <dd className="min-w-0 leading-6">{children}</dd>
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
