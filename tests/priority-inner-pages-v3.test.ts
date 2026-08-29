import assert from 'node:assert/strict';
import test from 'node:test';

import sitemap from '../app/sitemap';
import { getInnerStaticParams } from '../content/inner-pages';
import { getPageByRoute, seoPages } from '../content/pages';
import { resolveSources } from '../content/sources';
import { siteStatus } from '../content/site-status';
import type { GuidePage } from '../content/types';

type PriorityGuidePage = GuidePage & {
  evidenceRows?: Array<{ topic: string; official: string; community: string; guidance: string }>;
  failureBranches?: Array<{ symptom: string; likelyState: string; nextStep: string }>;
  media?: {
    gallery: Array<{ src: string; alt: string; caption: string; sourceId: string }>;
    video?: { href: string; embedUrl: string; title: string; description: string; sourceId: string };
  };
};

const wordCount = (value: string) => value.trim().split(/\s+/).length;

const p0Routes = [
  '/bosses/mutated-bowhead-whale/',
  '/bosses/pufferfish/',
  '/achievements/im-the-bird-now/',
  '/achievements/bean/',
] as const;

const p1Routes = [
  '/fixes/leeches-not-spawning/',
  '/fixes/black-screen/',
  '/multiplayer/',
  '/platforms/',
] as const;

const p2DraftRoutes = [
  '/achievements/fishipedia/',
  '/fixes/audio-glitch/',
  '/tips/bing-bong/',
  '/tips/coconut-bait/',
  '/tips/cooking/',
  '/tips/killscore/',
] as const;

test('the current content baseline is official Patch 1.0.10 checked on August 29', () => {
  assert.deepEqual(siteStatus, { verifiedPatch: '1.0.10', lastChecked: '2026-08-29' });
});

test('P0 and P1 routes follow the answer, evidence, failure-branch, and question-H2 contract', () => {
  const expected = [...p0Routes.map((route) => [route, 'P0'] as const), ...p1Routes.map((route) => [route, 'P1'] as const)];

  for (const [route, priority] of expected) {
    const page = getPageByRoute(route) as PriorityGuidePage;
    assert.equal(page.priority, priority, `${route} priority drifted`);
    assert.equal(page.indexable, true, `${route} must be indexable`);
    assert.equal(page.lastUpdated, '2026-08-29');
    assert.ok(wordCount(page.quickAnswer) >= 40 && wordCount(page.quickAnswer) <= 60, `${route} needs a 40–60 word direct answer`);
    assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 4, `${route} needs question-led H2s`);
    assert.ok((page.evidenceRows?.length ?? 0) >= 2, `${route} needs official-versus-community evidence rows`);
    assert.ok((page.failureBranches?.length ?? 0) >= 3, `${route} needs a failure-branch table`);
    assert.equal(resolveSources(page.sources).length, page.sources.length, `${route} contains an unresolved source`);
  }
});

test('both P0 boss pages use real official media with a video and a two-to-four-image gallery', () => {
  for (const route of ['/bosses/mutated-bowhead-whale/', '/bosses/pufferfish/']) {
    const page = getPageByRoute(route) as PriorityGuidePage;
    assert.match(page.image ?? '', /^\/assets\/how-to-fish\/steam-[^/]+\.jpg$/);
    assert.ok(page.media?.video?.href.startsWith('https://www.youtube.com/watch?v='));
    assert.match(page.media?.video?.embedUrl ?? '', /^https:\/\/www\.youtube-nocookie\.com\/embed\//);
    assert.ok((page.media?.gallery.length ?? 0) >= 2 && (page.media?.gallery.length ?? 0) <= 4);
    assert.ok(page.media?.gallery.every((item) => item.src.startsWith('/assets/how-to-fish/steam-')));
  }
});

test('P1 black-screen intent has one canonical route and preserves the old URL with a 301', async () => {
  assert.equal(seoPages.some((page) => page.route === '/fixes/multiplayer-black-screen/'), false);
  assert.equal(getPageByRoute('/fixes/black-screen/').primaryKeyword, 'how to fish game black screen');

  const nextConfig = await import('../next.config.js');
  const redirects = await nextConfig.default.redirects!();
  assert.deepEqual(redirects.find((entry) => entry.source === '/fixes/multiplayer-black-screen'), {
    source: '/fixes/multiplayer-black-screen',
    destination: '/fixes/black-screen/',
    statusCode: 301,
  });
});

test('polluted fix terms stay merged into the hub instead of creating indexable pages', () => {
  const fixes = getPageByRoute('/fixes/');
  const copy = [fixes.quickAnswer, ...fixes.sections.flatMap((section) => [section.title, ...(section.paragraphs ?? []), ...(section.bullets ?? []), ...(section.steps ?? [])])].join(' ');

  assert.match(copy, /How to Fish game: fish not biting \(in-game\)/i);
  assert.match(copy, /cooked weapon/i);
  assert.match(copy, /FPS drops|high GPU/i);
  for (const route of ['/fixes/fish-not-biting/', '/fixes/cooked-weapon/', '/fixes/fps-drops-high-gpu/']) {
    assert.equal(seoPages.some((page) => page.route === route), false, `${route} must not become a standalone SEO page`);
  }
});

test('P2 evidence-threshold drafts render but remain noindex and outside the sitemap', () => {
  const sitemapRoutes = new Set(sitemap().map((entry) => new URL(entry.url).pathname));

  for (const route of p2DraftRoutes) {
    const page = getPageByRoute(route) as PriorityGuidePage;
    assert.equal(page.priority, 'P2');
    assert.equal(page.indexable, false, `${route} must remain a draft`);
    assert.equal(page.lastUpdated, '2026-08-29');
    assert.match([page.quickAnswer, ...page.sections.flatMap((section) => section.paragraphs ?? [])].join(' '), /unconfirmed|evidence|not verified|not confirmed/i);
    assert.ok(page.sources.length >= 2);
    assert.equal(resolveSources(page.sources).length, page.sources.length);
    assert.ok((page.evidenceRows?.length ?? 0) >= 2, `${route} needs the official-versus-community draft table`);
    assert.ok((page.failureBranches?.length ?? 0) >= 3, `${route} needs the draft failure-branch table`);
    assert.equal(sitemapRoutes.has(route), false, `${route} leaked into the sitemap`);
  }

  assert.ok(getInnerStaticParams('tips').some(({ slug }) => slug === 'bing-bong'));
});

test('P3 red lines and homepage intent remain unchanged', () => {
  assert.equal(getPageByRoute('/').primaryKeyword, 'how to fish game guide');
  for (const route of ['/codes/', '/cheats/', '/mods/', '/best-weapons/']) {
    assert.equal(seoPages.some((page) => page.route === route), false);
  }
});

test('gambling is restored as the canonical Roulette, Drip, and GOLD page', async () => {
  const page = getPageByRoute('/gambling/');
  assert.equal(page.indexable, true);
  assert.equal(page.priority, 'P1');
  assert.match([page.quickAnswer, ...page.sections.flatMap((section) => [section.title, ...(section.paragraphs ?? [])])].join(' '), /Roulette[\s\S]*Drip[\s\S]*GOLD GOLD GOLD/i);

  const nextConfig = await import('../next.config.js');
  const redirects = await nextConfig.default.redirects!();
  assert.equal(redirects.some((entry) => entry.source === '/gambling'), false);
  assert.deepEqual(redirects.find((entry) => entry.source === '/guides/money-and-gambling.html'), {
    source: '/guides/money-and-gambling.html',
    destination: '/gambling/',
    statusCode: 301,
  });
});
