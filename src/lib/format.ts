/** "2026-08-16" → "August 16, 2026" or "16 août 2026". Falls back to the raw value. */
export function formatDate(iso: string, locale: "en" | "fr" = "en"): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
