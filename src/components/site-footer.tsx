import { profile, site } from "@/content";
import { buildInfo } from "@/lib/build-info";
import { TextLink } from "./text-link";

/** The status line: which commit this page was built from, when, and by which CI run. */
export function SiteFooter() {
  return (
    <footer className="meta border-edge bg-ground text-muted mt-2.5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-2 px-4 py-2.5">
      <p>{profile.name}</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-1">
        <li>
          {buildInfo.shortSha && buildInfo.commitUrl ? (
            <>
              rev{" "}
              <TextLink href={buildInfo.commitUrl} className="no-print-url">
                {buildInfo.shortSha}
              </TextLink>
            </>
          ) : (
            "local build"
          )}
        </li>
        <li>
          built{" "}
          <time dateTime={buildInfo.builtAtIso}>{buildInfo.builtAtLabel}</time>
        </li>
        {buildInfo.runId && buildInfo.runUrl ? (
          <li className="print:hidden">
            <TextLink href={buildInfo.runUrl}>run {buildInfo.runId}</TextLink>
          </li>
        ) : null}
        <li className="print:hidden">
          <TextLink href={site.repo}>Source</TextLink>
        </li>
        <li className="hidden print:block">
          {site.url.replace("https://", "")}
        </li>
      </ul>
    </footer>
  );
}
