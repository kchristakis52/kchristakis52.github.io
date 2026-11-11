import {
  education,
  experience,
  headline,
  profile,
  projects,
  site,
  skills,
  spokenLanguages,
} from "@/content";
import { buildInfo } from "./build-info";

const SCHEMA_URL =
  "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json";

/** Drops undefined and empty-array fields so absent content is absent in the output too. */
function compact<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(
      ([, v]) =>
        v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0),
    ),
  ) as Partial<T>;
}

/**
 * The same content as the page, in JSON Resume v1.0.0 shape.
 *
 * The email is left out on purpose: the page only shows it obfuscated, and a
 * plain-text copy in a predictable JSON file would undo that. `basics.url`
 * and the profiles are the contact routes here.
 */
export function buildResume() {
  const profiles = [
    profile.links.github && {
      network: "GitHub",
      username: profile.links.github.split("/").pop(),
      url: profile.links.github,
    },
    profile.links.linkedin && {
      network: "LinkedIn",
      url: profile.links.linkedin,
    },
  ].filter(Boolean);

  return {
    $schema: SCHEMA_URL,
    basics: compact({
      name: profile.name,
      label: profile.role,
      url: site.url,
      summary: headline,
      location: {
        city: profile.location.city,
        countryCode: profile.location.countryCode,
      },
      profiles,
    }),
    work: experience.map((role) =>
      compact({
        name: role.organisation,
        position: role.title,
        location: role.location,
        startDate: role.start,
        endDate: role.end ?? undefined,
        highlights: role.highlights,
      }),
    ),
    education: education.map((entry) =>
      compact({
        institution: entry.institution,
        area: entry.field,
        startDate: String(entry.startYear),
        endDate: String(entry.endYear),
        score: `${entry.grade.value}/${entry.grade.scale}`,
        // Not in the schema, which allows extra properties.
        major: entry.major,
        minor: entry.minor,
      }),
    ),
    publications: projects.flatMap((project) =>
      project.publication
        ? [
            {
              name: project.publication.title,
              publisher: project.publication.venue,
              releaseDate: String(project.publication.year),
              url: project.publication.url,
              summary: `Published as ${project.publication.authorship}.`,
            },
          ]
        : [],
    ),
    skills: skills.map((group) => ({
      name: group.label,
      keywords: group.items,
    })),
    languages: spokenLanguages.map((entry) => ({
      language: entry.language,
      fluency: entry.level,
    })),
    projects: projects.map((project) =>
      compact({
        name: project.title,
        description: project.summary ?? project.built,
        highlights: [project.problem, project.result].filter(
          (line): line is string => Boolean(line),
        ),
        keywords: project.stack,
        url: project.links?.find((link) => link.href.startsWith("http"))?.href,
      }),
    ),
    meta: compact({
      canonical: `${site.url}/resume.json`,
      version: buildInfo.shortSha ?? undefined,
      lastModified: buildInfo.builtAtIso,
    }),
  };
}
