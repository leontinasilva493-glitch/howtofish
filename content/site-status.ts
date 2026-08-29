export const siteStatus = {
  verifiedPatch: '1.0.10',
  lastChecked: '2026-08-29',
} as const;

export function formatSiteStatusDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
