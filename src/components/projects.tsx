import type { ReactNode } from "react";
import { architecture, projects, type Project } from "@/content";
import { ArchitectureDiagram } from "./architecture-diagram";
import { TextLink } from "./text-link";
import { Chips, Window } from "./window";

function Links({ project }: { project: Project }) {
  if (!project.links?.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.8125rem]">
      {project.links.map((link) => (
        <li key={link.href}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}

/** One labelled part of a project write-up. Renders nothing when the content has no such part. */
function Part({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-0.5 max-w-[60ch] text-[0.9375rem] leading-[1.6] text-pretty">
        {children}
      </dd>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-mono text-2xl leading-tight font-bold tracking-[-0.03em] text-balance">
      {children}
    </h3>
  );
}

function ProjectBody({ project }: { project: Project }) {
  const { publication } = project;
  return (
    <article className="flex h-full flex-col gap-5">
      <Title>{project.title}</Title>
      <dl
        className={`grid gap-x-8 gap-y-4 ${project.featured ? "md:grid-cols-3 print:grid-cols-3" : ""}`}
      >
        {project.summary ? (
          <Part label="summary">{project.summary}</Part>
        ) : null}
        {project.problem ? (
          <Part label="problem">{project.problem}</Part>
        ) : null}
        {project.built ? <Part label="built">{project.built}</Part> : null}
        {project.result ? <Part label="result">{project.result}</Part> : null}
        {publication ? (
          <Part label="published">
            <TextLink href={publication.url} className="no-print-url">
              {publication.title}
            </TextLink>
            <span className="meta text-muted mt-1.5 block">
              {publication.venue}, {publication.authorship}, doi:
              {publication.doi}
            </span>
          </Part>
        ) : null}
      </dl>
      {project.featured ? (
        <div className="border-rule border-t pt-5 print:hidden">
          <ArchitectureDiagram diagram={architecture} />
        </div>
      ) : null}
      <div className="mt-auto space-y-3">
        <Links project={project} />
        <Chips items={project.stack} />
      </div>
    </article>
  );
}

export function Projects() {
  const total = projects.length;
  const tiled = projects.filter((project) => !project.featured);

  return (
    <>
      {projects.map((project, index) => {
        // Smaller projects tile two to a row; a last one left on its own takes the full row.
        const alone =
          tiled.length % 2 === 1 && project === tiled[tiled.length - 1];
        const wide = project.featured || alone;
        return (
          <Window
            key={project.id}
            id={index === 0 ? "projects" : `project-${project.id}`}
            title="project"
            meta={`${index + 1}/${total}`}
            className={
              wide
                ? "md:col-span-12 print:col-span-12"
                : "md:col-span-6 print:col-span-6"
            }
          >
            <ProjectBody project={project} />
          </Window>
        );
      })}
    </>
  );
}
