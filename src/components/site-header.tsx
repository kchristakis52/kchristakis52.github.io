import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

// Rooted at "/" so the anchors also work from pages other than the home page.
const NAV = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-ink flex items-center justify-between gap-6 border-t-[3px] py-4 print:hidden">
      <nav aria-label="Sections" className="min-w-0">
        <ul className="hidden gap-x-6 text-sm sm:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-muted hover:text-ink transition-colors duration-100 motion-reduce:transition-none"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}
