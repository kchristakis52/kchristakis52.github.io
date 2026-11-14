import type { ReactNode } from "react";
import {
  education,
  emailAddress,
  experience,
  headline,
  profile,
  site,
  skills,
  spokenLanguages,
} from "@/content";
import { formatMonth } from "@/lib/format";
import { EmailLink } from "./email-link";
import { PrintButton } from "./print-button";
import { TextLink } from "./text-link";
import { Window } from "./window";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-x-3 py-1 font-mono text-[0.8125rem] leading-6">
      <dt className="text-accent">{label}</dt>
      <dd className="text-ink-2 min-w-0">{children}</dd>
    </div>
  );
}

export function Hero() {
  const current = experience.find((role) => role.end === null);
  const degree = education[0];
  const programming = skills[0];
  // Only used to decide whether to render; the address itself is assembled client-side.
  const hasEmail = emailAddress().length > 1;

  return (
    <>
      <Window
        id="about"
        title="about"
        meta={`${profile.location.city}, ${profile.location.country}`}
        className="md:col-span-12 lg:col-span-7 print:col-span-12"
      >
        <div className="flex h-full flex-col justify-between gap-10">
          <h1 className="font-mono text-[clamp(2.25rem,9vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance print:text-[2.4rem]">
            {profile.name}
          </h1>
          <div>
            <p className="text-ink-2 max-w-[34ch] text-[clamp(1.25rem,2.2vw,1.625rem)] leading-[1.3] font-medium tracking-[-0.01em] text-pretty print:max-w-none print:text-[1.15rem]">
              {headline}
            </p>
            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[0.8125rem] print:mt-2">
              <li className="hidden print:block">
                {profile.location.city}, {profile.location.country}
              </li>
              <li className="hidden print:block">
                {site.url.replace("https://", "")}
              </li>
              <li className="print:hidden">
                <PrintButton />
              </li>
              {profile.links.github ? (
                <li>
                  <TextLink href={profile.links.github}>GitHub</TextLink>
                </li>
              ) : null}
              {profile.links.linkedin ? (
                <li>
                  <TextLink href={profile.links.linkedin}>LinkedIn</TextLink>
                </li>
              ) : null}
              {hasEmail ? (
                <li>
                  <EmailLink
                    user={profile.email.user}
                    domain={profile.email.domain}
                  />
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </Window>

      <Window
        id="summary"
        title="summary"
        className="md:col-span-12 lg:col-span-5 print:hidden"
      >
        <dl>
          {current ? (
            <>
              <Fact label="role">{current.title}</Fact>
              <Fact label="at">{current.organisation}</Fact>
              <Fact label="since">
                <time dateTime={current.start}>
                  {formatMonth(current.start)}
                </time>
              </Fact>
            </>
          ) : null}
          {degree ? (
            <Fact label="education">
              {degree.field}, {degree.endYear}
            </Fact>
          ) : null}
          {programming ? (
            <Fact label="writes">{programming.items.join(", ")}</Fact>
          ) : null}
          <Fact label="speaks">
            {spokenLanguages
              .map((l) => `${l.language} (${l.level})`)
              .join(", ")}
          </Fact>
        </dl>
      </Window>
    </>
  );
}
