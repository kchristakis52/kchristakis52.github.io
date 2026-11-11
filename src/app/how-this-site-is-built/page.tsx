import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Row, Section } from "@/components/section";
import { TextLink } from "@/components/text-link";
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
      <section aria-labelledby="page-title" className="pt-12 md:pt-20">
        <h1
          id="page-title"
          className="text-[clamp(2.25rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance [font-stretch:112%]"
        >
          {colophon.title}
        </h1>
        <div className="border-rule mt-10 border-t pt-8 md:mt-14">
          <p className="max-w-[38ch] text-[clamp(1.25rem,2.2vw,1.625rem)] leading-[1.3] font-medium tracking-[-0.015em] text-pretty">
            {colophon.lead}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <TextLink href="/">Back to the CV</TextLink>
            </li>
            <li>
              <TextLink href={site.repo}>Source</TextLink>
            </li>
          </ul>
        </div>
      </section>

      <Section id="stack" title="Stack">
        <dl className="border-rule border-b [&>div:first-child]:border-t-0 [&>div:first-child]:pt-0">
          {stack.map((entry) => (
            <Row key={entry.label} label={entry.label}>
              {entry.value}
            </Row>
          ))}
        </dl>
      </Section>

      <Section
        id="pipeline"
        title="Pipeline"
        meta={plural(pipeline.nodes.length - 1, "step")}
      >
        <ArchitectureDiagram diagram={pipeline} />
      </Section>

      <Section
        id="decisions"
        title="Decisions"
        meta={plural(decisions.length, "decision")}
      >
        {decisions.map((decision) => (
          <article
            key={decision.title}
            className="border-rule grid grid-cols-1 gap-x-6 gap-y-2 border-t py-6 first:border-t-0 first:pt-0 md:grid-cols-12"
          >
            <h3 className="text-lg leading-snug font-semibold tracking-[-0.01em] text-balance md:col-span-3">
              {decision.title}
            </h3>
            <p className="max-w-[68ch] leading-[1.6] text-pretty md:col-span-9">
              {decision.reason}
            </p>
          </article>
        ))}
      </Section>
    </>
  );
}
