import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/`,
  // which is what GitHub Pages serves. No server runtime exists.
  output: "export",
  // The image optimizer needs a server; with a static export it must be off.
  images: { unoptimized: true },
  // Emit `route/index.html` instead of `route.html`, so deep links resolve on
  // GitHub Pages without relying on its extension-less URL fallback.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
