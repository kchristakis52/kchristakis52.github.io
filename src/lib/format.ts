import type { YearMonth } from "@/content";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** "2024-03" -> "Mar 2024". Fixed table instead of Intl so server and client can never disagree. */
export function formatMonth(value: YearMonth): string {
  const [year, month] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

export function plural(
  count: number,
  singular: string,
  pluralForm = `${singular}s`,
): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
