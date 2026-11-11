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

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-rule grid grid-cols-[6.5rem_1fr] gap-x-4 border-t py-2.5 text-sm leading-6">
      <dt className="label">{label}</dt>
      <dd className="min-w-0">{children}</dd>
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
    <section aria-labelledby="name" className="pt-12 md:pt-20 print:pt-0">
      <h1
        id="name"
        className="text-[clamp(2.75rem,10.5vw,6rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance [font-stretch:112%] print:text-[2.6rem]"
      >
        {profile.name}
      </h1>

      <div className="border-rule mt-10 grid grid-cols-1 gap-x-6 gap-y-12 border-t pt-8 md:mt-14 lg:grid-cols-12 print:mt-3 print:block print:pt-3">
        <div className="lg:col-span-7 print:col-span-7">
          <p className="max-w-[30ch] text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.25] font-medium tracking-[-0.015em] text-pretty print:max-w-none print:text-[1.2rem]">
            {headline}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm print:mt-2">
            <li className="hidden print:block">
              {profile.location.city}, {profile.location.country}
            </li>
            <li className="hidden print:block">
              {site.url.replace("https://", "")}
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
            <li className="print:hidden">
              <PrintButton />
            </li>
          </ul>
        </div>

        <dl className="border-rule border-b lg:col-span-5 print:hidden">
          <Fact label="Location">
            {profile.location.city}, {profile.location.country}
          </Fact>
          {current ? (
            <>
              <Fact label="Current role">
                <span className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-[0.55rem] size-1.5 shrink-0"
                  />
                  <span>
                    {current.title}, {current.organisation}
                  </span>
                </span>
              </Fact>
              <Fact label="Since">
                <time dateTime={current.start}>
                  {formatMonth(current.start)}
                </time>
              </Fact>
            </>
          ) : null}
          {degree ? (
            <Fact label="Education">
              {degree.field}, {degree.institution}, {degree.endYear}
            </Fact>
          ) : null}
          {programming ? (
            <Fact label="Programming">{programming.items.join(", ")}</Fact>
          ) : null}
          <Fact label="Languages">
            {spokenLanguages
              .map((l) => `${l.language} (${l.level})`)
              .join(", ")}
          </Fact>
        </dl>
      </div>
    </section>
  );
}
