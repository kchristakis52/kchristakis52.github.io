import { buildResume } from "@/lib/resume";

// With `output: "export"` a route handler must be static: it runs once at
// build time and its response is written to `out/resume.json`.
export const dynamic = "force-static";

export function GET() {
  return new Response(`${JSON.stringify(buildResume(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
