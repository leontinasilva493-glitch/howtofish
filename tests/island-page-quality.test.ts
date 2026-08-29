import assert from 'node:assert/strict';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { IslandGuidePage } from '../components/guide/IslandGuidePage';
import { getPageByRoute } from '../content/pages';
import { resolveSources } from '../content/sources';
import type { GuidePage } from '../content/types';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

type EnrichedIslandPage = GuidePage & {
  evidenceRows?: Array<{ topic: string; official: string; community: string; guidance: string }>;
  failureBranches?: Array<{ symptom: string; likelyState: string; nextStep: string }>;
  media?: { gallery: Array<{ src: string; alt: string; caption: string; sourceId: string }> };
};

function pageCopy(page: EnrichedIslandPage) {
  return [
    page.quickAnswer,
    ...page.sections.flatMap((section) => [section.title, section.intro, ...(section.paragraphs ?? []), ...(section.steps ?? []), ...(section.bullets ?? []), section.callout?.title, section.callout?.text]),
    ...(page.evidenceRows ?? []).flatMap((row) => [row.topic, row.official, row.community, row.guidance]),
    ...(page.failureBranches ?? []).flatMap((row) => [row.symptom, row.likelyState, row.nextStep]),
    ...page.faqs.flatMap((item) => [item.question, item.answer]),
  ].filter(Boolean).join(' ');
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('the five enriched island pages expose their August 29 Patch 1.0.10 review baseline', () => {
  for (const route of ['/islands/lighthouse/', '/islands/forest/', '/islands/desert/', '/islands/rocks/', '/islands/volcano/']) {
    const page = getPageByRoute(route);
    assert.equal(page.lastUpdated, '2026-08-29', `${route} review date is stale`);
    assert.equal(page.verifiedPatch, '1.0.10', `${route} patch baseline is stale`);
    assert.ok(page.sources.includes('patch110'), `${route} needs the official current-patch source`);
  }
});

test('Lighthouse explains the complete hand-in chain, failure tree, facilities, evidence, and real media', () => {
  const page = getPageByRoute('/islands/lighthouse/') as EnrichedIslandPage;
  const copy = pageCopy(page);

  assert.ok(wordCount(copy) >= 500, 'Lighthouse needs a materially deeper route, not another short chapter summary');
  assert.ok(page.sections.length >= 6);
  assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 5);
  assert.ok((page.evidenceRows?.length ?? 0) >= 3);
  assert.ok((page.failureBranches?.length ?? 0) >= 4);
  assert.ok(page.faqs.length >= 3);
  assert.ok((page.media?.gallery.length ?? 0) >= 2);
  assert.ok(page.media?.gallery.every((item) => item.sourceId === 'steamMedia' && item.src.startsWith('/assets/how-to-fish/steam-')));
  for (const sourceId of ['steamAchievements', 'destructoidWalkthrough', 'islandsGuide', 'steamMedia']) {
    assert.ok(page.sources.includes(sourceId), `Lighthouse needs ${sourceId}`);
  }
  assert.equal(resolveSources(page.sources).length, page.sources.length);
  for (const detail of ['Lighthouse Keeper', 'Beer Can', 'Empty Beer Can', 'Spider Crab shell', 'Boat Keys', 'northwest', 'green Radar marker']) {
    assert.match(copy, new RegExp(detail, 'i'), `Lighthouse is missing ${detail}`);
  }

  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));
  assert.match(markup, /What is official, and what is community-documented\?/);
  assert.match(markup, /Why has the next island not unlocked\?/);
  for (const item of page.media?.gallery ?? []) assert.match(markup, new RegExp(item.alt));
});

test('Forest explains the leech quest, Giant Piranha hand-in, Desert coordinate, facilities, evidence, and real media', () => {
  const page = getPageByRoute('/islands/forest/') as EnrichedIslandPage;
  const copy = pageCopy(page);

  assert.ok(wordCount(copy) >= 500, 'Forest needs a materially deeper route, not another short chapter summary');
  assert.ok(page.sections.length >= 6);
  assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 5);
  assert.ok((page.evidenceRows?.length ?? 0) >= 3);
  assert.ok((page.failureBranches?.length ?? 0) >= 4);
  assert.ok(page.faqs.length >= 3);
  assert.ok((page.media?.gallery.length ?? 0) >= 2);
  assert.ok(page.media?.gallery.every((item) => item.sourceId === 'steamMedia' && item.src.startsWith('/assets/how-to-fish/steam-')));
  for (const sourceId of ['steamAchievements', 'destructoidWalkthrough', 'islandsGuide', 'leechDiscussion', 'steamMedia']) {
    assert.ok(page.sources.includes(sourceId), `Forest needs ${sourceId}`);
  }
  assert.equal(resolveSources(page.sources).length, page.sources.length);
  for (const detail of ['lady by the lake', 'three leeches', 'Modified Leech', 'Giant Piranha', 'tail', 'skeleton', 'yellow Radar marker', 'west']) {
    assert.match(copy, new RegExp(detail, 'i'), `Forest is missing ${detail}`);
  }

  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));
  assert.match(markup, /What is official, and what is community-documented\?/);
  assert.match(markup, /Why has the next island not unlocked\?/);
  for (const item of page.media?.gallery ?? []) assert.match(markup, new RegExp(item.alt));
});

test('Desert separates the grill route from the Pufferfish route and documents the Rocks coordinate, evidence, and real media', () => {
  const page = getPageByRoute('/islands/desert/') as EnrichedIslandPage;
  const copy = pageCopy(page);

  assert.ok(wordCount(copy) >= 500, 'Desert needs a materially deeper route, not another short chapter summary');
  assert.ok(page.sections.length >= 6);
  assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 5);
  assert.ok((page.evidenceRows?.length ?? 0) >= 3);
  assert.ok((page.failureBranches?.length ?? 0) >= 4);
  assert.ok(page.faqs.length >= 3);
  assert.ok((page.media?.gallery.length ?? 0) >= 2);
  assert.ok(page.media?.gallery.every((item) => item.sourceId === 'steamMedia' && item.src.startsWith('/assets/how-to-fish/steam-')));
  for (const sourceId of ['steamAchievements', 'patch104', 'destructoidWalkthrough', 'islandsGuide', 'pcGamerPufferfish', 'steamMedia']) {
    assert.ok(page.sources.includes(sourceId), `Desert needs ${sourceId}`);
  }
  assert.equal(resolveSources(page.sources).length, page.sources.length);
  for (const detail of ['tourist under the tree', 'Grillmaster', 'Blue Shark', 'lighter', 'endangered', 'Carrot', 'Pufferfish fin', 'red Radar marker', 'west']) {
    assert.match(copy, new RegExp(detail, 'i'), `Desert is missing ${detail}`);
  }

  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));
  assert.match(markup, /What is official, and what is community-documented\?/);
  assert.match(markup, /Why has the next island not unlocked\?/);
  for (const item of page.media?.gallery ?? []) assert.match(markup, new RegExp(item.alt));
});

test('Rocks explains the Tuna-to-Albatross trigger, head hand-in, Volcano coordinate, facilities, evidence, and real media', () => {
  const page = getPageByRoute('/islands/rocks/') as EnrichedIslandPage;
  const copy = pageCopy(page);

  assert.ok(wordCount(copy) >= 500, 'Rocks needs a materially deeper route, not another short chapter summary');
  assert.ok(page.sections.length >= 6);
  assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 5);
  assert.ok((page.evidenceRows?.length ?? 0) >= 3);
  assert.ok((page.failureBranches?.length ?? 0) >= 4);
  assert.ok(page.faqs.length >= 3);
  assert.ok((page.media?.gallery.length ?? 0) >= 2);
  assert.ok(page.media?.gallery.every((item) => item.sourceId === 'steamMedia' && item.src.startsWith('/assets/how-to-fish/steam-')));
  for (const sourceId of ['steamAchievements', 'patch104', 'destructoidWalkthrough', 'islandsGuide', 'steamMedia']) {
    assert.ok(page.sources.includes(sourceId), `Rocks needs ${sourceId}`);
  }
  assert.equal(resolveSources(page.sources).length, page.sources.length);
  for (const detail of ['scared islanders', 'Professional Boss Lure', 'Tuna', 'place', 'Albatross', 'cover', 'head', 'pink Radar marker', 'north']) {
    assert.match(copy, new RegExp(detail, 'i'), `Rocks is missing ${detail}`);
  }

  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));
  assert.match(markup, /What is official, and what is community-documented\?/);
  assert.match(markup, /Why has the next island not unlocked\?/);
  for (const item of page.media?.gallery ?? []) assert.match(markup, new RegExp(item.alt));
});

test('Volcano explains the scientist and military route through the mainland ending with evidence, failures, and real media', () => {
  const page = getPageByRoute('/islands/volcano/') as EnrichedIslandPage;
  const copy = pageCopy(page);

  assert.ok(wordCount(copy) >= 600, 'Volcano needs a materially deeper final route, not another short chapter summary');
  assert.ok(page.sections.length >= 7);
  assert.ok(page.sections.filter((section) => section.title.endsWith('?')).length >= 6);
  assert.ok((page.evidenceRows?.length ?? 0) >= 4);
  assert.ok((page.failureBranches?.length ?? 0) >= 5);
  assert.ok(page.faqs.length >= 3);
  assert.ok((page.media?.gallery.length ?? 0) >= 2);
  assert.ok(page.media?.gallery.every((item) => item.sourceId === 'steamMedia' && item.src.startsWith('/assets/how-to-fish/steam-')));
  for (const sourceId of ['steamAchievements', 'patch104', 'destructoidWalkthrough', 'islandsGuide', 'steamMedia']) {
    assert.ok(page.sources.includes(sourceId), `Volcano needs ${sourceId}`);
  }
  assert.equal(resolveSources(page.sources).length, page.sources.length);
  for (const detail of ['yellow hazmat', 'five fish', 'Scientific Lure', 'Fish Bucket', 'Bowhead Whale body', 'wooden planks', 'Mutated Bowhead Whale', 'tail', 'fin', 'RHIB', 'mainland']) {
    assert.match(copy, new RegExp(detail, 'i'), `Volcano is missing ${detail}`);
  }

  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));
  assert.match(markup, /What is official, and what is community-documented\?/);
  assert.match(markup, /Why has the ending route not unlocked\?/);
  for (const item of page.media?.gallery ?? []) assert.match(markup, new RegExp(item.alt));
});
