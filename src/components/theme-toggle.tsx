"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

/** Must match the inline script in layout.tsx. */
const STORAGE_KEY = "theme";

// The attribute on <html> is the source of truth. Subscribing to it (rather
// than mirroring it in React state) keeps the button right even when the
// inline script or another tab changed it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="control"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Storage can be blocked; the choice then lasts for this page view.
        }
      }}
    >
      {next === "light" ? "Light theme" : "Dark theme"}
    </button>
  );
}
