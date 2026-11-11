import type { Profile } from "./types";

export const profile: Profile = {
  name: "Konstantinos Christakis",
  role: "Backend and platform engineer",
  pitch: "I build data platforms, APIs and the infrastructure they run on.",
  location: { city: "Athens", country: "Greece", countryCode: "GR" },
  email: { user: "kxristakis", domain: "outlook.com" },
  links: {
    // Derived from the repo name (a user site lives at <username>.github.io).
    // TODO: confirm.
    github: "https://github.com/kchristakis52",
    // TODO: LinkedIn profile URL.
    linkedin: null,
  },
};

/** The hero line: role and pitch as one statement. Also the meta description. */
export const headline = `${profile.role}. ${profile.pitch}`;

/** Joins the two stored halves. Call it where the address is needed, not at module scope. */
export function emailAddress(p: Profile = profile): string {
  return `${p.email.user}@${p.email.domain}`;
}
