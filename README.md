# kchristakis52.github.io

Personal portfolio and CV of Konstantinos Christakis, live at
<https://kchristakis52.github.io>.

A static site with no backend. The page, the printed CV and
[`/resume.json`](https://kchristakis52.github.io/resume.json) are all generated
from the same typed content files.

## Stack

- [Next.js](https://nextjs.org) (App Router) with `output: "export"`
- TypeScript, strict
- Tailwind CSS v4
- Hand-written SVG diagrams laid out from typed data, no chart library
- GitHub Actions for CI, GitHub Pages for hosting

## Local development

Requires Node 22 or newer (`.nvmrc` pins 24).

```bash
npm ci
npm run dev
```

| Command               | What it does                                                 |
| --------------------- | ------------------------------------------------------------ |
| `npm run dev`         | Dev server at <http://localhost:3000>                        |
| `npm run build`       | Static export to `out/`                                      |
| `npm run preview`     | Serve `out/` locally                                         |
| `npm run lint`        | ESLint                                                       |
| `npm run typecheck`   | Generate route types, then `tsc --noEmit`                    |
| `npm run check:links` | Link check over `out/` (add `-- --internal` to stay offline) |
| `npm run lighthouse`  | Lighthouse CI against `out/` with the budget below           |
| `npm run format`      | Prettier                                                     |

`check:links` and `lighthouse` read the built files, so run `npm run build`
first. Lighthouse needs a local Chrome.

## Layout

```
src/
  content/      All copy and data, as typed objects. Edit the site here.
  app/          Routes: the CV, "How this site is built", resume.json
  components/   Sections, the diagram, small client components
  lib/          Build info, resume.json builder, diagram layout, formatting
scripts/
  check-links.mjs   Dependency-free link checker for the export
.github/workflows/
  deploy.yml        Quality gates and the Pages deploy
```

### Editing content

Everything shown on the site lives in `src/content/`. Array order is display
order. Fields that are not known yet are left out and marked with a `TODO`
comment; the components render correctly without them.

The architecture diagram is data too: add a node and its edges to
`src/content/architecture.ts` and the layout follows.

### Print

Printing the home page produces a one-page A4 CV (the "Print CV" button calls
the browser's print dialog). After changing content or layout, print to PDF
and check that it still fits on one page.

## Pipeline

Every push and pull request runs the same job, in this order:

1. **Lint** and **typecheck**
2. **Build** the static export. The commit SHA and run id are read from the
   environment and shown in the page footer.
3. **Link check** over the built files: internal links, fragment targets and
   external links.
4. **Lighthouse budget**: five runs, and the median must score 95 or more in
   performance, accessibility, best practices and SEO.
5. **Deploy** to GitHub Pages. Only on `main`, and only if every step above
   passed. The files that were checked are the files that are published.

Pull requests run steps 1 to 4 and never deploy. Lighthouse reports are kept
as a workflow artifact for 14 days.

The reasoning behind these choices is on the site:
[How this site is built](https://kchristakis52.github.io/how-this-site-is-built/).
