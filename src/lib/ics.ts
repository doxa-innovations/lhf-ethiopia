// iCalendar (RFC 5545) helpers — generate an all-day VEVENT and trigger a
// download so the user's calendar app (Outlook, Google, Apple) opens it.

type Event = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  location: string;
  summary: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(yyyyMmDd: string): string {
  return yyyyMmDd.replace(/-/g, "");
}

function nextDay(yyyyMmDd: string): string {
  const d = new Date(yyyyMmDd + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

function dtStamp(): string {
  const d = new Date();
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function escapeText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcs(ev: Event): string {
  const start = toIcsDate(ev.date);
  const end = nextDay(ev.date);
  const uid = `${ev.slug}@lhfethiopia.org`;

  // CRLF is required by RFC 5545.
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LHF Ethiopia//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp()}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeText(ev.title)}`,
    `DESCRIPTION:${escapeText(ev.summary)}`,
    `LOCATION:${escapeText(ev.location)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(ev: Event): void {
  if (typeof window === "undefined") return;
  const ics = buildIcs(ev);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
