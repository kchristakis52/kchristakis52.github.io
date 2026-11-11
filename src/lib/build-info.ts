import { execSync } from "node:child_process";
import { site } from "@/content";

/**
 * Build provenance, resolved once when the static export is generated.
 * GitHub Actions sets GITHUB_SHA and GITHUB_RUN_ID on every run; a local
 * build falls back to the checked-out commit and has no run to link to.
 * Server-only: importing this from a client component would break the build.
 */
function localSha(): string | null {
  try {
    return execSync("git rev-parse HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return null;
  }
}

const sha = process.env.GITHUB_SHA || localSha();
const runId = process.env.GITHUB_RUN_ID || null;
const builtAt = new Date();

export const buildInfo = {
  sha,
  shortSha: sha ? sha.slice(0, 7) : null,
  commitUrl: sha ? `${site.repo}/commit/${sha}` : null,
  runId,
  runUrl: runId ? `${site.repo}/actions/runs/${runId}` : null,
  /** Full ISO timestamp, for `datetime` attributes and resume.json. */
  builtAtIso: builtAt.toISOString(),
  /** "2026-11-11 14:02 UTC" */
  builtAtLabel: `${builtAt.toISOString().slice(0, 16).replace("T", " ")} UTC`,
};
