import assert from 'node:assert/strict';
import test from 'node:test';

const wikiTemplatePromise = import('../lib/wiki-template').catch(() => ({}));

test('resolveHomeSections keeps configured sections with publishable data in order', async () => {
  const wikiTemplate = await wikiTemplatePromise;
  const resolveHomeSections = (wikiTemplate as Record<string, unknown>).resolveHomeSections;
  assert.equal(typeof resolveHomeSections, 'function');

  assert.deepEqual(
    (resolveHomeSections as Function)(
      ['overview', 'guides', 'videos', 'faq'],
      { overview: true, guides: 3, videos: 0, faq: 5 },
    ),
    ['overview', 'guides', 'faq'],
  );
});

test('searchWikiEntries matches title, summary, and keywords with a stable limit', async () => {
  const wikiTemplate = await wikiTemplatePromise;
  const searchWikiEntries = (wikiTemplate as Record<string, unknown>).searchWikiEntries;
  assert.equal(typeof searchWikiEntries, 'function');

  const entries = [
    { title: 'Beginner route', summary: 'Start safely', href: '/one', keywords: ['first night'] },
    { title: 'Map notes', summary: 'Backrooms transition', href: '/two', keywords: ['routes'] },
    { title: 'Team guide', summary: 'Callout roles', href: '/three', keywords: ['co-op'] },
  ];

  assert.deepEqual((searchWikiEntries as Function)(entries, 'backrooms', 4), [entries[1]]);
  assert.deepEqual((searchWikiEntries as Function)(entries, 'route', 1), [entries[0]]);
  assert.deepEqual((searchWikiEntries as Function)(entries, '  ', 4), []);
});

test('nextWikiTheme switches only between the How to Fish presets', async () => {
  const wikiTemplate = await wikiTemplatePromise;
  const nextWikiTheme = (wikiTemplate as Record<string, unknown>).nextWikiTheme;
  assert.equal(typeof nextWikiTheme, 'function');
  assert.equal((nextWikiTheme as Function)('reef-dark'), 'editorial-light');
  assert.equal((nextWikiTheme as Function)('editorial-light'), 'reef-dark');
  assert.equal((nextWikiTheme as Function)('unknown'), 'reef-dark');
});
