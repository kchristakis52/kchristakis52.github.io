import { experience } from "@/content";
import { formatMonth, plural } from "@/lib/format";
import { Section } from "./section";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      meta={plural(experience.length, "role")}
    >
      {experience.map((role) => (
        <article
          key={role.id}
          className="border-rule grid grid-cols-1 gap-x-6 gap-y-3 border-t py-10 first:border-t-0 first:pt-0 md:grid-cols-12 print:grid-cols-12"
        >
          <div className="meta text-muted md:col-span-3 md:pt-2 print:col-span-3">
            <p>
              <time dateTime={role.start}>{formatMonth(role.start)}</time>
              {" to "}
              {role.end ? (
                <time dateTime={role.end}>{formatMonth(role.end)}</time>
              ) : (
                "present"
              )}
            </p>
            <p>{role.location}</p>
            {role.end === null ? (
              <p className="text-accent mt-2 flex items-center gap-2">
                <span aria-hidden="true" className="bg-accent size-1.5" />
                Current
              </p>
            ) : null}
          </div>

          <div className="md:col-span-9 print:col-span-9">
            <h3 className="text-2xl leading-tight font-semibold tracking-[-0.02em] md:text-[1.75rem]">
              {role.organisation}
            </h3>
            <p className="text-muted mt-1.5">{role.title}</p>
            <ul className="mt-6 max-w-[68ch] space-y-3 leading-[1.6]">
              {role.highlights.map((item) => (
                <li key={item} className="relative pl-6 text-pretty">
                  <span
                    aria-hidden="true"
                    className="bg-muted absolute top-[0.8em] left-0 h-px w-3"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Section>
  );
}
