import type { Decision, Diagram, StackEntry } from "./types";

/** Copy for the "How this site is built" page. */
export const colophon = {
  title: "How this site is built",
  lead: "A static site with no backend. Every push is linted, typechecked, built, link-checked and measured before it is allowed to deploy.",
};

export const stack: StackEntry[] = [
  {
    label: "Framework",
    value: "Next.js (App Router), exported as static files",
  },
  { label: "Language", value: "TypeScript in strict mode" },
  {
    label: "Styling",
    value: "Tailwind CSS v4, with design tokens as CSS custom properties",
  },
  {
    label: "Type",
    value: "JetBrains Mono and Geist, self-hosted at build time",
  },
  {
    label: "Diagrams",
    value: "Hand-written SVG, laid out from typed data. No chart library",
  },
  { label: "CI and deploy", value: "GitHub Actions" },
  { label: "Hosting", value: "GitHub Pages" },
];

/**
 * The delivery pipeline, mirroring `.github/workflows/deploy.yml`.
 * Keep the two in step: if a job or step changes there, change it here.
 */
export const pipeline: Diagram = {
  title: "Delivery pipeline: from push to deploy",
  initial: "output-checks",
  roleLabels: { built: "Pipeline step", context: "Trigger" },
  caption: "Each step runs only if the one before it passed.",
  nodes: [
    {
      id: "push",
      label: "Push",
      role: "context",
      detail:
        "A push or a pull request starts the workflow. Pull requests run every check but never deploy.",
      tech: ["git"],
    },
    {
      id: "static-checks",
      label: "Static checks",
      role: "built",
      detail:
        "ESLint, then the TypeScript compiler in strict mode with no emit.",
      tech: ["ESLint", "tsc"],
    },
    {
      id: "build",
      label: "Build",
      role: "built",
      detail:
        "A static export to plain HTML, CSS and JavaScript. The commit SHA and run id are read here for the footer, and resume.json is generated.",
      tech: ["next build"],
    },
    {
      id: "output-checks",
      label: "Output checks",
      role: "built",
      detail:
        "Run against the built files, not the source: every internal link and fragment must resolve, external links must answer, and Lighthouse must score 95 or more in performance, accessibility, best practices and SEO.",
      tech: ["Link check", "Lighthouse CI"],
    },
    {
      id: "deploy",
      label: "Deploy",
      role: "built",
      detail:
        "Only on main, and only if everything before it passed. The files that were checked are the files that are published.",
      tech: ["GitHub Pages"],
    },
  ],
  edges: [
    { from: "push", to: "static-checks" },
    { from: "static-checks", to: "build" },
    { from: "build", to: "output-checks" },
    { from: "output-checks", to: "deploy", label: "main" },
  ],
};

export const decisions: Decision[] = [
  {
    title: "One source of content",
    reason:
      "The page, the printed CV and resume.json all render from the same typed files. A fact is written once, and a missing field is a compile error rather than a blank on the page.",
  },
  {
    title: "Static export, no server",
    reason:
      "There is nothing to run, patch or pay for: the site is files on a CDN. Anything that looks dynamic, such as the build details in the footer or resume.json, is computed once at build time.",
  },
  {
    title: "Diagrams from data",
    reason:
      "The architecture diagram and the pipeline diagram on this page are one component given two graphs. Positions are computed from the edges, so adding a node is a data change. Writing the SVG by hand keeps it small and fully keyboard accessible.",
  },
  {
    title: "Deploy what was tested",
    reason:
      "The checks run against the real build output, and that same output is what gets published. There is no second build between testing and deploying that could differ.",
  },
  {
    title: "A budget that fails the build",
    reason:
      "Lighthouse runs five times and the median must reach 95 in all four categories. A regression blocks the deploy instead of being noticed later.",
  },
  {
    title: "A small link checker",
    reason:
      "Under 200 lines with no dependencies. It resolves links against the exported files and also checks that fragment targets exist. On its first run it found header anchors that broke on every page except the home page.",
  },
  {
    title: "Print stylesheet, not a PDF",
    reason:
      "Printing the home page gives a one-page A4 CV, so the CV can never be out of date with the site. Every size is in rem, which lets one root font size scale the whole sheet for paper.",
  },
  {
    title: "Provenance in the footer",
    reason:
      "Each page states the commit it was built from, when, and by which CI run, so what is live can always be traced back to source.",
  },
];
