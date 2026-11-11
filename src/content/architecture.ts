import type { Diagram } from "./types";

/**
 * Architecture of the time series data platform (featured project).
 * The diagram is laid out from this graph: add a node and its edges here and
 * it appears, no drawing code to touch.
 *
 * TODO: confirm whether a Kafka broker sits between ingestion and storage.
 * It is left out until confirmed; if it exists, add a node and re-point the
 * `ingestion -> timescaledb` edge through it.
 */
export const architecture: Diagram = {
  title: "Time series data platform: data flow",
  initial: "api",
  roleLabels: { built: "Built", context: "Context" },
  caption: "Data flows left to right. Dashed nodes are outside the platform.",
  nodes: [
    {
      id: "meters",
      label: "Smart meters",
      role: "context",
      detail:
        "Smart meters in 100+ households of a residential pilot publish their readings.",
      tech: ["MQTT"],
    },
    {
      id: "broker",
      label: "MQTT broker",
      role: "built",
      detail:
        "Entry point of the platform. Receives the readings published by the meters.",
      // TODO: broker product (e.g. Mosquitto, EMQX).
      tech: ["MQTT"],
    },
    {
      id: "ingestion",
      label: "Ingestion",
      role: "built",
      detail:
        "Subscribes to the broker and writes the readings to the database.",
      // TODO: language and libraries of the ingestion service.
      tech: [],
    },
    {
      id: "timescaledb",
      label: "TimescaleDB",
      role: "built",
      detail: "Time series storage for the meter readings.",
      tech: ["TimescaleDB", "PostgreSQL"],
    },
    {
      id: "api",
      label: "REST API",
      role: "built",
      detail:
        "Serves the data to consumers with authentication, role based access and aggregation. Described by an OpenAPI 3.1 spec.",
      tech: ["Go", "Gin", "pgx", "OpenAPI 3.1"],
    },
    {
      id: "consumers",
      label: "Consumers",
      role: "context",
      detail:
        "Research partners and a second replication site read the data through the API.",
      tech: [],
    },
  ],
  edges: [
    { from: "meters", to: "broker", label: "MQTT" },
    { from: "broker", to: "ingestion", label: "MQTT" },
    { from: "ingestion", to: "timescaledb", label: "SQL" },
    { from: "timescaledb", to: "api", label: "pgx" },
    { from: "api", to: "consumers", label: "REST" },
  ],
};
