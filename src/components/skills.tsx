import { skills } from "@/content";
import { plural } from "@/lib/format";
import { Window } from "./window";

export function Skills() {
  return (
    <Window
      id="skills"
      title="skills"
      meta={plural(skills.length, "group")}
      className="md:col-span-12 lg:col-span-7 print:col-span-7"
    >
      <table className="w-full border-collapse text-left">
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
              className="border-rule grid grid-cols-1 gap-x-4 border-t py-2.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr]"
            >
              <th scope="row" className="label font-normal">
                {group.label.toLowerCase()}
              </th>
              <td className="leading-6">{group.items.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Window>
  );
}
