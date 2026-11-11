/**
 * Shapes for everything under `src/content`. The page, the print CV and
 * `/resume.json` all read these same objects, so a fact is written once.
 */

/** Calendar month as `YYYY-MM`. Kept as a string so it sorts and serialises as is. */
export type YearMonth = `${number}-${number}`;

export interface Profile {
  name: string;
  /** Job label, e.g. for resume.json `basics.label`. */
  role: string;
  /** One sentence on what he builds. */
  pitch: string;
  location: { city: string; country: string; countryCode: string };
  /**
   * Stored in two parts so the full address never appears as one literal in
   * the HTML or the JS bundle. Join with `emailAddress()` at the point of use.
   */
  email: { user: string; domain: string };
  links: {
    /** `null` until the real URL is supplied. Renderers must skip null links. */
    github: string | null;
    linkedin: string | null;
  };
}

export interface Role {
  id: string;
  organisation: string;
  location: string;
  title: string;
  start: YearMonth;
  /** `null` means the role is current. */
  end: YearMonth | null;
  highlights: string[];
}

export interface Publication {
  title: string;
  venue: string;
  year: number;
  /** Author position as stated by the author, e.g. "first author". */
  authorship: string;
  doi: string;
  url: string;
}

export interface ProjectLink {
  label: string;
  /** Absolute URL, or a site-relative path starting with `/`. */
  href: string;
}

export interface Project {
  id: string;
  title: string;
  /** The featured project gets the architecture diagram. */
  featured?: boolean;
  /** Rendered as a single line: no problem/built/result breakdown. */
  compact?: boolean;
  /** One-line description, used by compact projects. */
  summary?: string;
  problem?: string;
  built?: string;
  result?: string;
  stack: string[];
  publication?: Publication;
  links?: ProjectLink[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Education {
  institution: string;
  field: string;
  startYear: number;
  endYear: number;
  major: string;
  minor: string;
  grade: { value: string; scale: string };
}

export interface SpokenLanguage {
  language: string;
  level: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  /** `built`: part of the platform I built. `context`: outside it (sources, consumers). */
  role: "built" | "context";
  /** What this node does, or what I built there. */
  detail: string;
  tech: string[];
}

export interface DiagramEdge {
  from: string;
  to: string;
  /** Protocol or interface carried on this edge. */
  label?: string;
}

export interface Diagram {
  title: string;
  /** Node shown in the detail panel before any interaction. */
  initial: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
