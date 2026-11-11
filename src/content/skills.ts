import type { SkillGroup } from "./types";

/** Group order and item order are deliberate. Do not sort. */
export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Go", "Python", "Java", "C/C++", "JavaScript", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["REST APIs", "OpenAPI", "Gin", "Flask", "Node.js"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "TimescaleDB", "MySQL", "MongoDB"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Kubernetes", "GitLab CI/CD", "GitHub Actions", "Linux"],
  },
  {
    label: "Data and IoT",
    items: ["Python ETL pipelines", "MQTT", "SAREF/SAREF4ENER"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind"],
  },
];
