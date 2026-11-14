import Link from "next/link";
import { profile } from "@/content";
import { Clock } from "./clock";

// Rooted at "/" so the anchors also work from pages other than the home page.
// Numbered like workspaces: the number is the stable handle, the name explains it.
const WORKSPACES = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/#projects", label: "projects" },
  { href: "/#skills", label: "skills" },
  { href: "/#contact", label: "contact" },
];

/** The status bar: home, workspaces, local time. Stays in view while scrolling. */
export function SiteHeader() {
  return (
    <header className="border-rule bg-ground sticky top-0 z-20 border-b print:hidden">
      <div className="mx-auto flex h-11 max-w-[78rem] items-center justify-between gap-4 px-2.5">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            prefetch={false}
            aria-label={`${profile.name}, home`}
            className="flex size-8 shrink-0 items-center justify-center"
          >
            <span aria-hidden="true" className="bg-accent block size-2.5" />
          </Link>
          <nav aria-label="Sections" className="min-w-0">
            <ul className="flex font-mono text-xs">
              {WORKSPACES.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="text-muted hover:text-ink flex h-11 min-w-8 items-center justify-center gap-1.5 px-2 transition-colors duration-100 motion-reduce:transition-none"
                  >
                    <span className="text-accent">{index + 1}</span>
                    <span className="hidden md:inline">{item.label}</span>
                    <span className="sr-only md:hidden">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="hidden shrink-0 sm:block">
          <Clock place={profile.location.city} />
        </div>
      </div>
    </header>
  );
}
