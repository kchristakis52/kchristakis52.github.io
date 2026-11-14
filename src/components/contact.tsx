import { profile, site } from "@/content";
import { EmailLink } from "./email-link";
import { TextLink } from "./text-link";
import { Window } from "./window";

export function Contact() {
  return (
    <Window
      id="contact"
      title="contact"
      meta={`${profile.location.city}, ${profile.location.country}`}
      className="md:col-span-12 print:hidden"
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-[clamp(1.25rem,5.4vw,2.75rem)] leading-tight font-bold tracking-[-0.04em]">
            <EmailLink
              user={profile.email.user}
              domain={profile.email.domain}
            />
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.8125rem]">
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
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-muted text-sm">
            Also available as{" "}
            <a href="/resume.json" className="link">
              JSON Resume
            </a>
            , generated from the same content:
          </p>
          <pre className="meta border-rule bg-deep text-ink-2 mt-2 overflow-x-auto border px-3 py-2">
            <code>curl {site.url}/resume.json</code>
          </pre>
        </div>
      </div>
    </Window>
  );
}
