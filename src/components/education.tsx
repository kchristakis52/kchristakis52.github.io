import { education, spokenLanguages } from "@/content";
import { Row, Section } from "./section";

export function Education() {
  return (
    <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-12 print:grid-cols-12">
      <Section
        id="education"
        title="Education"
        className="lg:col-span-8 print:col-span-8"
      >
        {education.map((entry) => (
          <article key={entry.institution}>
            <p className="meta text-muted">
              <time dateTime={String(entry.startYear)}>{entry.startYear}</time>
              {" to "}
              <time dateTime={String(entry.endYear)}>{entry.endYear}</time>
            </p>
            <h3 className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.02em]">
              {entry.institution}
            </h3>
            <p className="text-muted mt-1.5">{entry.field}</p>
            <dl className="border-rule mt-6 border-b">
              <Row label="Major">{entry.major}</Row>
              <Row label="Minor">{entry.minor}</Row>
              <Row label="Grade">
                <span className="tabular-nums">
                  {entry.grade.value}/{entry.grade.scale}
                </span>
              </Row>
            </dl>
          </article>
        ))}
      </Section>

      <Section
        id="languages"
        title="Languages"
        className="lg:col-span-4 print:col-span-4"
      >
        <dl className="border-rule border-b [&>div:first-child]:border-t-0 [&>div:first-child]:pt-0">
          {spokenLanguages.map((entry) => (
            <Row key={entry.language} label={entry.language}>
              {entry.level}
            </Row>
          ))}
        </dl>
      </Section>
    </div>
  );
}
