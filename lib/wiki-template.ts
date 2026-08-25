export type HomeSectionId = 'overview' | 'guides' | 'journey' | 'explore' | 'media' | 'gambling' | 'faq' | 'sources';
export type WikiTheme = 'reef-dark' | 'editorial-light';

export type SearchEntry = {
  title: string;
  summary: string;
  href: string;
  keywords: string[];
  category?: string;
};

type PublishableValue = boolean | number | readonly unknown[] | null | undefined;

function hasPublishableValue(value: PublishableValue) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'number') return value > 0;
  return value === true;
}

export function resolveHomeSections(order: readonly string[], availability: Record<string, PublishableValue>) {
  return order.filter((section) => hasPublishableValue(availability[section]));
}

export function searchWikiEntries(entries: readonly SearchEntry[], query: string, limit = 8) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized || limit <= 0) return [];

  return entries
    .filter((entry) => [entry.title, entry.summary, entry.category ?? '', ...entry.keywords]
      .some((value) => value.toLocaleLowerCase().includes(normalized)))
    .slice(0, limit);
}

export function nextWikiTheme(current: string): WikiTheme {
  return current === 'reef-dark' ? 'editorial-light' : 'reef-dark';
}
