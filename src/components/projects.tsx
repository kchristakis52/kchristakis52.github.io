import { architecture, projects, type Project } from "@/content";
import { ArchitectureDiagram } from "./architecture-diagram";
import { plural } from "@/lib/format";
import { Row, Section } from "./section";
import { TextLink } from "./text-link";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="meta text-muted flex flex-wrap gap-x-4 gap-y-0.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.links?.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
      {project.links.map((link) => (
        <li key={link.href}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}

/** Written as problem, built, result, stack. Any part missing from the content is simply not rendered. */
function FullProject({ project }: { project: Project }) {
  const { publication } = project;
  return (
    <article className="border-rule grid grid-cols-1 gap-x-6 gap-y-5 border-t py-10 first:border-t-0 first:pt-0 md:grid-cols-12 print:grid-cols-12">
      <h3 className="text-2xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance md:col-span-3 print:col-span-3">
        {project.title}
      </h3>
      <dl className="border-rule border-b leading-[1.6] md:col-span-9 print:col-span-9 [&>div:first-child]:border-t-0 [&>div:first-child]:pt-0 md:[&>div:first-child]:pt-1">
        {project.problem ? (
          <Row label="Problem">
            <p className="max-w-[62ch] text-pretty">{project.problem}</p>
          </Row>
        ) : null}
        {project.built ? (
          <Row label="Built">
            <p className="max-w-[62ch] text-pretty">{project.built}</p>
          </Row>
        ) : null}
        {project.result ? (
          <Row label="Result">
            <p className="max-w-[62ch] text-pretty">{project.result}</p>
          </Row>
        ) : null}
        {publication ? (
          <Row label="Published">
            <p className="max-w-[62ch] text-pretty">
              <TextLink href={publication.url} className="no-print-url">
                {publication.title}
              </TextLink>
            </p>
            <p className="meta text-muted mt-1.5">
              {publication.venue}, {publication.authorship}, doi:
              {publication.doi}
            </p>
          </Row>
        ) : null}
        {project.stack.length ? (
          <Row label="Stack">
            <div className="pt-1">
              <Stack items={project.stack} />
            </div>
          </Row>
        ) : null}
        {project.links?.length ? (
          <Row label="Links">
            <Links project={project} />
          </Row>
        ) : null}
      </dl>
      {project.featured ? (
        <div className="mt-6 md:col-span-12 print:hidden">
          <ArchitectureDiagram diagram={architecture} />
        </div>
      ) : null}
    </article>
  );
}

/** One ruled line: title, summary, stack, links. */
function CompactProject({ project }: { project: Project }) {
  return (
    <article className="border-rule grid grid-cols-1 gap-x-6 gap-y-2 border-t py-5 md:grid-cols-12 print:grid-cols-12">
      <h3 className="font-semibold md:col-span-3 print:col-span-3">
        {project.title}
      </h3>
      <div className="space-y-2 md:col-span-9 print:col-span-9">
        {project.summary ? (
          <p className="max-w-[68ch]">{project.summary}</p>
        ) : null}
        <Links project={project} />
        {project.stack.length ? <Stack items={project.stack} /> : null}
      </div>
    </article>
  );
}

export function Projects() {
  const full = projects.filter((p) => !p.compact);
  const compact = projects.filter((p) => p.compact);

  return (
    <Section
      id="projects"
      title="Projects"
      meta={plural(projects.length, "project")}
    >
      {full.map((project) => (
        <FullProject key={project.id} project={project} />
      ))}
      {compact.length ? (
        <div className="border-rule mt-6 border-b">
          {compact.map((project) => (
            <CompactProject key={project.id} project={project} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}
