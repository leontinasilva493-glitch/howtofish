import assert from 'node:assert/strict';
import test from 'node:test';

import * as guideData from '../components/wiki/data';

test('every public guide has an answer-first article contract', () => {
  const allGuides = (guideData as Record<string, unknown>).allGuides;
  assert.ok(Array.isArray(allGuides), 'allGuides must be exported');
  assert.ok(allGuides.length > 0);

  for (const guide of allGuides) {
    assert.ok(guide.quickAnswer.length >= 40, `${guide.slug} needs a useful quick answer`);
    assert.ok(guide.sections.length >= 2, `${guide.slug} needs navigable sections`);
    assert.ok(guide.sources.length >= 1, `${guide.slug} needs at least one source`);
    assert.equal(new Set(guide.sections.map((section: { id: string }) => section.id)).size, guide.sections.length);
  }
});

test('the initial guide library contains only the six planned How to Fish guides', () => {
  const allGuides = (guideData as Record<string, unknown>).allGuides as Array<{
    slug: string;
    sources: Array<{ url: string }>;
    communityNote?: string;
  }>;

  assert.deepEqual(allGuides.map((guide) => guide.slug), [
    'beginner-guide',
    'how-to-make-money',
    'gear-upgrade-guide',
    'boss-fights-guide',
    'gambling-guide',
    'co-op-guide',
  ]);

  for (const guide of allGuides) {
    assert.deepEqual(guide.sources.map((source) => source.url), [
      'https://store.steampowered.com/app/4001890/How_to_Fish/',
      '/updates',
    ]);
    assert.match(guide.communityNote ?? '', /still being documented|unconfirmed/i);
  }
});
