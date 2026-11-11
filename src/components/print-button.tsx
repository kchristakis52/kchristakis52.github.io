"use client";

export function PrintButton() {
  return (
    <button type="button" className="control" onClick={() => window.print()}>
      Print CV
    </button>
  );
}
