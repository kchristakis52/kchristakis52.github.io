"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      className="control control-primary"
      onClick={() => window.print()}
    >
      Print CV
    </button>
  );
}
