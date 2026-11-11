import { site } from "./site";
import type { Project } from "./types";

/** In display order. Each full project reads: problem, what I built, stack, result. */
export const projects: Project[] = [
  {
    id: "timeseries-platform",
    title: "Time series data platform",
    featured: true,
    problem:
      "Research partners needed reliable, access-controlled smart meter data from 100+ households",
    built:
      "MQTT ingestion, TimescaleDB storage, Go REST API with authentication, role based access and an OpenAPI 3.1 spec",
    stack: ["Go", "Gin", "pgx", "TimescaleDB", "MQTT", "OpenAPI 3.1"],
    result: "Used by research partners and reused at a second replication site",
    // TODO: metric (e.g. rows or readings stored, ingest rate, API consumers, uptime).
  },
  {
    id: "iot-middleware",
    title: "IoT middleware on Kubernetes",
    // TODO: problem statement.
    built:
      "Middleware for smart buildings handling MQTT ingestion, streaming and device identifier mapping, deployed on Kubernetes",
    // TODO: full stack. Only the technologies confirmed so far are listed.
    stack: ["MQTT", "Kubernetes"],
    // TODO: metric (e.g. devices or buildings connected, message throughput).
    publication: {
      title:
        "A Scalable Data Access and Control Manager for Interoperable IoT-Based Smart Building Systems",
      venue: "IEEE IISA 2026",
      year: 2026,
      authorship: "first author",
      doi: "10.1109/IISA71656.2026.11705475",
      url: "https://doi.org/10.1109/IISA71656.2026.11705475",
    },
  },
  {
    id: "cluster-cicd",
    title: "Cluster operations and CI/CD",
    // TODO: problem statement.
    built:
      "Operate an on-prem Kubernetes cluster; GitLab CI/CD pipelines build and deploy the team's services to it",
    stack: ["Kubernetes", "GitLab CI/CD"],
    // TODO: metric: number of services, deploy time before/after.
  },
  {
    id: "law-firm-site",
    title: "Law firm website",
    compact: true,
    summary: "Production Next.js + Sanity CMS website for a law firm in Athens",
    stack: ["Next.js", "Sanity CMS"],
  },
  {
    id: "this-site",
    title: "This site",
    compact: true,
    // TODO: one-line summary.
    stack: ["Next.js", "TypeScript", "Tailwind"],
    links: [
      { label: "Source", href: site.repo },
      { label: "How this site is built", href: site.colophonPath },
    ],
  },
];
