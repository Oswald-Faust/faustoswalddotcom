"use client";

/** Opens the browser print dialog; the print stylesheet turns the page into a PDF-ready CV. */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer transition-[color,transform] duration-150 hover:text-(--cv-fg) active:scale-[0.97]"
    >
      {label}
    </button>
  );
}
