import { experience } from "@/content";
import { formatMonth } from "@/lib/format";
import { Window } from "./window";

// The current role gets the wide tile; earlier roles sit beside it.
const SPANS = ["md:col-span-12 lg:col-span-8", "md:col-span-12 lg:col-span-4"];

export function Experience() {
  return (
    <>
      {experience.map((role, index) => (
        <Window
          key={role.id}
          // The first window carries the section anchor the bar links to.
          id={index === 0 ? "experience" : `experience-${role.id}`}
          title="experience"
          meta={
            <>
              <time dateTime={role.start}>{formatMonth(role.start)}</time>
              {" to "}
              {role.end ? (
                <time dateTime={role.end}>{formatMonth(role.end)}</time>
              ) : (
                "present"
              )}
            </>
          }
          className={`${SPANS[index] ?? "md:col-span-12 lg:col-span-6"} print:col-span-12`}
        >
          <article>
            <h3 className="font-mono text-2xl leading-tight font-bold tracking-[-0.03em] text-balance">
              {role.organisation}
            </h3>
            <p className="text-ink-2 mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              {role.title}
              <span className="meta text-muted">{role.location}</span>
              {role.end === null ? (
                <span className="meta text-accent flex items-center gap-1.5">
                  <span aria-hidden="true" className="bg-accent size-1.5" />
                  current
                </span>
              ) : null}
            </p>
            <ul className="mt-5 max-w-[70ch] space-y-2.5 text-[0.9375rem] leading-[1.6]">
              {role.highlights.map((item) => (
                <li key={item} className="relative pl-5 text-pretty">
                  <span
                    aria-hidden="true"
                    className="bg-edge absolute top-[0.62em] left-0 size-1.5"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Window>
      ))}
    </>
  );
}
