import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { TextLink } from "@/components/text-link";
import { Row, Window } from "@/components/window";
import { colophon, decisions, pipeline, site, stack } from "@/content";
import { plural } from "@/lib/format";

export const metadata: Metadata = {
  title: colophon.title,
  description: colophon.lead,
  alternates: { canonical: site.colophonPath },
};

export default function HowThisSiteIsBuilt() {
  return (
    <>
      <Window id="intro" title="colophon" className="md:col-span-12">
        <h1 className="font-mono text-[clamp(2rem,6.5vw,3.75rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
          {colophon.title}
        </h1>
        <p className="text-ink-2 mt-8 max-w-[40ch] text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.3] font-medium text-pretty">
          {colophon.lead}
        </p>
        <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.8125rem]">
          <li>
            <TextLink href="/">Back to the CV</TextLink>
          </li>
          <li>
            <TextLink href={site.repo}>Source</TextLink>
          </li>
        </ul>
      </Window>

      <Window
        id="pipeline"
        title="pipeline"
        meta={plural(pipeline.nodes.length - 1, "step")}
        className="md:col-span-12"
      >
        <ArchitectureDiagram diagram={pipeline} />
      </Window>

      <Window
        id="stack"
        title="stack"
        className="md:col-span-12 lg:col-span-5 lg:self-start"
      >
        <dl>
          {stack.map((entry) => (
            <Row key={entry.label} label={entry.label.toLowerCase()}>
              {entry.value}
            </Row>
          ))}
        </dl>
      </Window>

      <Window
        id="decisions"
        title="decisions"
        meta={plural(decisions.length, "decision")}
        className="md:col-span-12 lg:col-span-7"
      >
        {decisions.map((decision) => (
          <article
            key={decision.title}
            className="border-rule border-t py-5 first:border-t-0 first:pt-0 last:pb-0"
          >
            <h3 className="font-mono text-base leading-snug font-bold tracking-[-0.02em]">
              {decision.title}
            </h3>
            <p className="text-ink-2 mt-1.5 max-w-[66ch] text-[0.9375rem] leading-[1.6] text-pretty">
              {decision.reason}
            </p>
          </article>
        ))}
      </Window>
    </>
  );
}
