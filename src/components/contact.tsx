import { profile, site } from "@/content";
import { EmailLink } from "./email-link";
import { Section } from "./section";
import { TextLink } from "./text-link";

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      meta={`${profile.location.city}, ${profile.location.country}`}
      className="print:hidden"
    >
      <p className="text-[clamp(1.5rem,5.2vw,2.75rem)] leading-tight font-semibold tracking-[-0.025em] [font-stretch:108%]">
        <EmailLink
          user={profile.email.user}
          domain={profile.email.domain}
          className="decoration-rule underline-offset-[0.18em]"
        />
      </p>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
      <p className="border-rule text-muted mt-10 max-w-[68ch] border-t pt-3 text-sm">
        This CV is also available as{" "}
        <a href="/resume.json" className="link">
          JSON Resume
        </a>
        , generated from the same content:
      </p>
      <pre className="meta mt-2 overflow-x-auto">
        <code>curl {site.url}/resume.json</code>
      </pre>
    </Section>
  );
}
