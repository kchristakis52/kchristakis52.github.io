#!/usr/bin/env node
// Link check for the static export. No dependencies.
//
//   node scripts/check-links.mjs             internal and external links
//   node scripts/check-links.mjs --internal  internal links only (offline)
//
// Internal links (paths, #fragments, and absolute URLs on the site's own
// origin) are resolved against the files in out/, including that a fragment's
// id exists in the target page. External links are requested once each.
// Exits 1 and lists every broken link with the page it was found on.

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const SITE_ORIGIN = "https://kchristakis52.github.io";
const INTERNAL_ONLY = process.argv.includes("--internal");
const TIMEOUT_MS = 20_000;

// These hosts answer automated clients with 403/418/999 even for valid
// pages. For them any HTTP response counts: it still proves the host
// resolves and the URL is well formed. A dead domain or a typo in the host
// still fails.
const BOT_BLOCKING_HOSTS = new Set([
  "doi.org",
  "ieeexplore.ieee.org",
  "www.linkedin.com",
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const exists = (path) =>
  stat(path).then(
    (s) => s.isFile(),
    () => false,
  );

/** Maps a site path to the exported file GitHub Pages would serve for it. */
async function resolveFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = pathname.endsWith("/")
    ? [join(OUT, clean, "index.html")]
    : [
        join(OUT, clean),
        join(OUT, `${clean}.html`),
        join(OUT, clean, "index.html"),
      ];
  for (const candidate of candidates) {
    if (await exists(candidate)) return candidate;
  }
  return null;
}

const htmlCache = new Map();
async function readHtml(file) {
  if (!htmlCache.has(file)) htmlCache.set(file, await readFile(file, "utf8"));
  return htmlCache.get(file);
}

function extractLinks(html) {
  const links = new Set();
  // The export is machine-generated and always double-quotes attributes, so a
  // pattern is enough here; this is not a general HTML parser.
  for (const match of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    links.add(match[1].replaceAll("&amp;", "&"));
  }
  return links;
}

async function checkExternal(url) {
  const lenient = BOT_BLOCKING_HOSTS.has(new URL(url).hostname);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "link-check" },
      });
      // Drain nothing: the status is all that is needed.
      await response.body?.cancel();
      if (response.ok || lenient) return null;
      if (attempt === 2) return `HTTP ${response.status}`;
    } catch (error) {
      if (attempt === 2)
        return error.cause?.code ?? error.name ?? "request failed";
    }
  }
  return null;
}

const pages = (await walk(OUT)).filter((file) => file.endsWith(".html"));
if (pages.length === 0) {
  console.error("No HTML files in out/. Run `npm run build` first.");
  process.exit(1);
}

const broken = [];
const external = new Map(); // url -> pages it appears on
let internalCount = 0;

for (const page of pages) {
  const pageName = relative(OUT, page).split(sep).join("/");
  const pageUrl = new URL(
    pageName.replace(/index\.html$/, ""),
    `${SITE_ORIGIN}/`,
  );

  for (const raw of extractLinks(await readHtml(page))) {
    if (/^(mailto:|tel:|data:|javascript:)/i.test(raw) || raw === "") continue;

    let url;
    try {
      url = new URL(raw, pageUrl);
    } catch {
      broken.push({ page: pageName, link: raw, reason: "not a valid URL" });
      continue;
    }

    if (url.origin !== SITE_ORIGIN) {
      if (url.protocol === "http:" || url.protocol === "https:") {
        url.hash = "";
        external.set(url.href, [...(external.get(url.href) ?? []), pageName]);
      }
      continue;
    }

    internalCount++;
    const file = await resolveFile(url.pathname);
    if (!file) {
      broken.push({
        page: pageName,
        link: raw,
        reason: "no such page or file in out/",
      });
      continue;
    }
    if (url.hash.length > 1 && file.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!(await readHtml(file)).includes(`id="${id}"`)) {
        broken.push({
          page: pageName,
          link: raw,
          reason: `no element with id "${id}"`,
        });
      }
    }
  }
}

if (!INTERNAL_ONLY) {
  const results = await Promise.all(
    [...external.keys()].map(async (url) => [url, await checkExternal(url)]),
  );
  for (const [url, reason] of results) {
    if (reason)
      broken.push({ page: external.get(url).join(", "), link: url, reason });
  }
}

const externalNote = INTERNAL_ONLY
  ? "external skipped"
  : `${external.size} external`;
console.log(
  `Checked ${pages.length} pages: ${internalCount} internal links, ${externalNote}.`,
);

if (broken.length > 0) {
  console.error(
    `\n${broken.length} broken link${broken.length === 1 ? "" : "s"}:`,
  );
  for (const { page, link, reason } of broken) {
    console.error(`  ${link}\n    on ${page}: ${reason}`);
  }
  process.exit(1);
}
console.log("All links resolve.");
