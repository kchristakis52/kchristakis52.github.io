import type { Role } from "./types";

/** Most recent first. */
export const experience: Role[] = [
  {
    id: "dss-lab",
    organisation: "DSS Lab, EPU-NTUA",
    location: "Athens",
    title: "Research and Development Software Engineer",
    start: "2024-03",
    end: null,
    highlights: [
      "Designed and built the data platform for a residential pilot covering 100+ households: MQTT ingestion from smart meters, time series storage in TimescaleDB, and a Go REST API (Gin, pgx) with authentication, role based access and an OpenAPI 3.1 spec, used by research partners and a second replication site",
      "Built and maintain multiple REST APIs and Python ETL pipelines that ingest, clean and harmonize data from heterogeneous IoT devices and vendors",
      "Programmed and deployed edge devices for real-time data collection over MQTT",
      "Co-developed an IoT middleware for smart buildings (MQTT ingestion, streaming, device identifier mapping) running on Kubernetes",
      "Operate the lab's on-prem Kubernetes cluster and set up GitLab CI/CD pipelines that build and deploy the team's services to it",
      "Semantic data modelling with SAREF/SAREF4ENER for interoperability across Horizon Europe projects",
    ],
  },
  {
    id: "libra-ai",
    organisation: "Libra AI Technologies",
    location: "Athens",
    title: "Back-End Software Engineer Intern",
    start: "2023-09",
    end: "2023-10",
    highlights: [
      "IoT stream processing for the Horizon Europe project Dig_IT",
      "Developed and maintained scalable data processing pipelines",
      "Wrote project documentation",
    ],
  },
];
