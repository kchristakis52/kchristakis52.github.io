import { skills } from "@/content";
import { plural } from "@/lib/format";
import { Section } from "./section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" meta={plural(skills.length, "group")}>
      <table className="border-rule w-full border-collapse border-b text-left">
        <caption className="sr-only">Skills by area</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Area</th>
            <th scope="col">Technologies</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((group) => (
            <tr
              key={group.label}
              className="border-rule grid grid-cols-1 gap-x-6 border-t py-3 first:border-t-0 first:pt-0 md:grid-cols-12 print:grid-cols-12"
            >
              <th scope="row" className="label md:col-span-3 print:col-span-3">
                {group.label}
              </th>
              <td className="leading-6 md:col-span-9 print:col-span-9">
                {group.items.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
