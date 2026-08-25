const TRACKER_SCHEMA_VERSION = 1;

export function readTrackerProgress(rawValue: string | null, validIds: readonly string[]) {
  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue) as { version?: unknown; completed?: unknown };
    if (parsed.version !== TRACKER_SCHEMA_VERSION || !Array.isArray(parsed.completed)) return [];
    const valid = new Set(validIds);
    return Array.from(new Set(parsed.completed.filter((id): id is string => typeof id === 'string' && valid.has(id))));
  } catch {
    return [];
  }
}

export function toggleTrackerProgress(completed: readonly string[], itemId: string) {
  const unique = Array.from(new Set(completed));
  return unique.includes(itemId) ? unique.filter((id) => id !== itemId) : [...unique, itemId];
}

export function serializeTrackerProgress(completed: readonly string[]) {
  return JSON.stringify({ version: TRACKER_SCHEMA_VERSION, completed: Array.from(new Set(completed)) });
}

export type TrackerItemLike = { title: string; description: string; category: string };

export function filterTrackerItems<T extends TrackerItemLike>(items: readonly T[], query: string, category: string) {
  const normalized = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const matchesCategory = category === 'ALL' || item.category === category;
    const matchesQuery = !normalized || `${item.title} ${item.description} ${item.category}`.toLocaleLowerCase().includes(normalized);
    return matchesCategory && matchesQuery;
  });
}
