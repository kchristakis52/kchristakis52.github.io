import { education, spokenLanguages } from "@/content";
import { Row, Window } from "./window";

/** Two stacked windows that share the column beside Skills. */
export function Education() {
  return (
    <div className="grid content-start gap-2.5 md:col-span-12 lg:col-span-5 print:col-span-5">
      {education.map((entry) => (
        <Window
          key={entry.institution}
          id="education"
          title="education"
          meta={
            <>
              <time dateTime={String(entry.startYear)}>{entry.startYear}</time>
              {" to "}
              <time dateTime={String(entry.endYear)}>{entry.endYear}</time>
            </>
          }
        >
          <article>
            <h3 className="font-mono text-xl leading-tight font-bold tracking-[-0.03em] text-balance">
              {entry.institution}
            </h3>
            <p className="text-ink-2 mt-1.5">{entry.field}</p>
            <dl className="mt-4">
              <Row label="major">{entry.major}</Row>
              <Row label="minor">{entry.minor}</Row>
              <Row label="grade">
                <span className="tabular-nums">
                  {entry.grade.value}/{entry.grade.scale}
                </span>
              </Row>
            </dl>
          </article>
        </Window>
      ))}

      <Window id="languages" title="languages">
        <dl>
          {spokenLanguages.map((entry) => (
            <Row key={entry.language} label={entry.language.toLowerCase()}>
              {entry.level}
            </Row>
          ))}
        </dl>
      </Window>
    </div>
  );
}
