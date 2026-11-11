import type { Education, SpokenLanguage } from "./types";

export const education: Education[] = [
  {
    institution: "National Technical University of Athens",
    // TODO: degree title (e.g. Diploma, MEng).
    field: "Electrical and Computer Engineering",
    startYear: 2019,
    endYear: 2024,
    major: "Computer Software and Computer Systems",
    minor: "Computer Networks",
    grade: { value: "8.50", scale: "10" },
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  { language: "Greek", level: "native" },
  { language: "English", level: "C2" },
];
