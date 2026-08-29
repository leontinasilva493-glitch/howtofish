import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SourceLine } from '../components/guide/DesignSystem';
import { seoPages } from '../content/pages';
import { resolveSources } from '../content/sources';
import type { SourceReference } from '../content/types';

Object.assign(globalThis, { React });

function source(overrides: Partial<SourceReference> & Pick<SourceReference, 'id' | 'label' | 'url'>): SourceReference {
  return {
    publisher: 'Test publisher',
    sourceLevel: 'community',
    sourceType: 'steam-discussion',
    accessedAt: '2026-08-29',
    notes: 'Test source.',
    ...overrides,
  };
}

test('source line shows at most three official or authoritative-media links with latest-update verification copy', () => {
  const sources: SourceReference[] = [
    source({ id: 'forum', label: 'Steam forum thread', url: 'https://example.com/forum' }),
    source({ id: 'media-one', label: 'PC Gamer guide', url: 'https://example.com/media-one', sourceType: 'media-guide' }),
    source({ id: 'official-one', label: 'Official achievements', url: 'https://steamcommunity.com/stats/example', sourceLevel: 'official', sourceType: 'steam-achievements' }),
    source({ id: 'video', label: 'YouTube route', url: 'https://example.com/video', sourceType: 'youtube' }),
    source({ id: 'official-two', label: 'Official patch notes', url: 'https://steamcommunity.com/games/example/announcements', sourceLevel: 'official', sourceType: 'steam-patch' }),
    source({ id: 'official-mirror', label: 'Unofficial patch mirror', url: 'https://steamdb.info/patchnotes/example', sourceLevel: 'official', sourceType: 'steam-patch' }),
    source({ id: 'official-duplicate', label: 'Duplicate patch notes', url: 'https://steamcommunity.com/games/example/announcements', sourceLevel: 'official', sourceType: 'steam-patch' }),
    source({ id: 'media-two', label: 'Destructoid guide', url: 'https://example.com/media-two', sourceType: 'media-guide' }),
  ];

  const html = renderToStaticMarkup(React.createElement(SourceLine, { sources, lastUpdated: '2026-08-29' }));

  assert.equal((html.match(/<a /g) || []).length, 3);
  assert.match(html, /Information is sourced from the official channels and authoritative media below and cross-verified across multiple references\./);
  assert.match(html, /Verification date:/);
  assert.match(html, /<time dateTime="2026-08-29">2026-08-29<\/time>/);
  assert.match(html, /based on this page(?:&#x27;|')s latest update/);
  assert.ok(html.indexOf('Official achievements') < html.indexOf('PC Gamer guide'), 'official sources must be displayed before media sources');
  assert.match(html, /Official achievements/);
  assert.match(html, /Official patch notes/);
  assert.match(html, /PC Gamer guide/);
  assert.doesNotMatch(html, /Steam forum thread|YouTube route|Unofficial patch mirror|Duplicate patch notes|Destructoid guide/);
  assert.doesNotMatch(html, />Sources:</);
  assert.doesNotMatch(html, /Last verified/);
});

test('global footer points readers to the page-level verified official and media sources', async () => {
  const footer = await readFile(new URL('../components/wiki/SiteFooter.tsx', import.meta.url), 'utf8');

  assert.match(footer, /official channels and authoritative media sources listed on each guide/i);
  assert.doesNotMatch(footer, /Sources:|Steam community/i);
});

test('every guide source section uses eligible links and the page latest-update date', () => {
  const officialDomains = ['steampowered.com', 'steamcommunity.com', 'dazed.games', 'microsoft.com'];

  for (const page of seoPages) {
    const resolvedSources = resolveSources(page.sources);
    const eligibleUrls = new Set(resolvedSources
      .filter((item) => {
        const hostname = new URL(item.url).hostname.toLowerCase();
        const isOfficialChannel = item.sourceLevel === 'official'
          && officialDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
        return isOfficialChannel || item.sourceType === 'media-guide';
      })
      .map((item) => item.url));
    const html = renderToStaticMarkup(React.createElement(SourceLine, { sources: resolvedSources, lastUpdated: page.lastUpdated }));
    const displayedUrls: string[] = [];
    const linkPattern = /<a href="([^"]+)"/g;
    let linkMatch: RegExpExecArray | null;
    while ((linkMatch = linkPattern.exec(html)) !== null) displayedUrls.push(linkMatch[1]);
    const latestUpdateDate = [...page.updateLog].map((item) => item.date).sort().at(-1);

    assert.ok(displayedUrls.length > 0 && displayedUrls.length <= 3, `${page.route} must show 1–3 source links`);
    assert.ok(displayedUrls.every((url) => eligibleUrls.has(url)), `${page.route} must only show official or authoritative-media links`);
    assert.equal(page.lastUpdated, latestUpdateDate, `${page.route} verification date must match its latest update`);
  }
});
