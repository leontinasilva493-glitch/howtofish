import assert from 'node:assert/strict';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomePage } from '../components/wiki/HomePage';
import { AchievementChecklist } from '../components/guide/AchievementChecklist';
import { achievements } from '../content/achievements';
import { creatures } from '../content/creatures';
import { seoPages } from '../content/pages';
import { resolveSources } from '../content/sources';
import * as innerData from '../content/inner-pages';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const p1Routes = [
  '/bosses/spider-crab/',
  '/bosses/giant-piranha/',
  '/bosses/pufferfish/',
  '/bosses/albatross/',
  '/bosses/bowhead-whale/',
  '/fixes/leeches-not-spawning/',
  '/fixes/missing-radar/',
  '/fixes/multiplayer-black-screen/',
  '/fixes/save-autosave/',
  '/fixes/error-0x11c7/',
] as const;

test('P1 publishes five boss and five symptom-led troubleshooting routes', () => {
  const byRoute = new Map(seoPages.map((page) => [page.route, page]));

  for (const route of p1Routes) {
    const page = byRoute.get(route);
    assert.ok(page, `${route} must be a canonical SEO page`);
    assert.equal(page.indexable, true);
    assert.equal(page.lastUpdated, '2026-08-27');
    assert.ok(page.quickAnswer.length >= 100, `${route} needs an answer-first summary`);
    assert.ok(page.sections.length >= 4, `${route} needs four independent sections`);
    assert.ok(page.sources.length >= 2, `${route} needs two independent sources`);
    assert.equal(resolveSources(page.sources).length, page.sources.length, `${route} has an unresolved source id`);
  }
});

test('P1 child pages have unique metadata and stay inside the evidence boundary', () => {
  const pages = seoPages.filter((page) => p1Routes.includes(page.route as typeof p1Routes[number]));
  assert.equal(pages.length, p1Routes.length);
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.h1)).size, pages.length);

  for (const page of pages) {
    const copy = [page.quickAnswer, ...page.sections.flatMap((section) => [section.intro, ...(section.paragraphs || []), ...(section.steps || []), ...(section.bullets || []), section.callout?.text])]
      .filter(Boolean)
      .join(' ');
    assert.doesNotMatch(copy, /\b(?:has|with)\s+\d{3,6}\s*(?:hp|health)\b/i, `${page.route} must not publish unverified HP`);
    assert.doesNotMatch(copy, /guaranteed recovery|guaranteed fix|only spawns on|universal best/i, `${page.route} overstates the evidence`);
  }
});

test('P1 route ownership separates progression, combat, and recovery intent', () => {
  const byRoute = new Map(seoPages.map((page) => [page.route, page]));
  for (const route of p1Routes.slice(0, 5)) assert.equal(byRoute.get(route)?.pageType, 'boss-guide');
  for (const route of p1Routes.slice(5)) assert.equal(byRoute.get(route)?.pageType, 'troubleshooting-guide');

  assert.equal(byRoute.get('/bosses/pufferfish/')?.primaryKeyword, 'how to beat pufferfish how to fish');
  assert.equal(byRoute.get('/fixes/leeches-not-spawning/')?.primaryKeyword, 'how to fish leeches not spawning');
  assert.equal(byRoute.get('/fixes/multiplayer-black-screen/')?.contentStatus, 'still-reported');
  assert.equal(byRoute.get('/fixes/save-autosave/')?.contentStatus, 'attempted-fix');
});

test('inner route helpers resolve known slugs and exclude unknown pages', () => {
  const api = innerData as typeof innerData & {
    getInnerRoutePage?: (group: 'bosses' | 'fixes' | 'achievements', slug: string) => (typeof seoPages)[number] | undefined;
    getInnerStaticParams?: (group: 'bosses' | 'fixes' | 'achievements') => Array<{ slug: string }>;
  };
  assert.equal(typeof api.getInnerRoutePage, 'function');
  assert.equal(typeof api.getInnerStaticParams, 'function');
  assert.equal(api.getInnerRoutePage?.('bosses', 'pufferfish')?.route, '/bosses/pufferfish/');
  assert.equal(api.getInnerRoutePage?.('fixes', 'save-autosave')?.contentStatus, 'attempted-fix');
  assert.equal(api.getInnerRoutePage?.('bosses', 'not-a-boss'), undefined);
  assert.deepEqual(api.getInnerStaticParams?.('bosses'), [
    { slug: 'spider-crab' },
    { slug: 'giant-piranha' },
    { slug: 'pufferfish' },
    { slug: 'albatross' },
    { slug: 'bowhead-whale' },
  ]);
});

const crossCheckedCreatureNames = [
  'Rock Crab', 'Shrimp', 'Lobster',
  'Piranha', 'Mackerel', 'Gar', 'Pike', 'Cod', 'Goldfish', 'Perch', 'Triggerfish',
  'Angelfish', 'Boxfish', 'Catfish', 'Sea Urchin', 'Seahorse', 'Clownfish', 'Bluegill', 'Salmon', 'Needlefish',
  'Parrotfish', 'Voxelfish', 'Bass', 'Halibut', 'Eel', 'Tigerfish', 'Flying Fish', 'Sengarat', 'Red Snapper',
  'Anglerfish', 'Blobfish', 'Oarfish', 'Superdwarf Fish', 'Stonefish',
  'Spider Crab', 'Giant Piranha', 'The Old Pike', 'Blue Shark', 'Pufferfish', 'Tuna', 'Albatross', 'Goblin Shark', 'Bowhead Whale', 'Mutated Bowhead Whale',
] as const;

test('P2 Fishipedia contains the 44-record G2A and AllThings.How intersection', () => {
  const crossChecked = creatures.filter((creature) => creature.sourceIds?.includes('allThingsFish') && creature.sourceIds?.includes('g2aFishList'));
  assert.deepEqual(crossChecked.map((creature) => creature.name), crossCheckedCreatureNames);
  assert.equal(new Set(creatures.map((creature) => creature.id)).size, creatures.length);
  assert.equal(creatures.length, 45, '44 cross-checked records plus the separately official Seagull record');
  assert.equal(creatures.find((creature) => creature.name === 'Spider Crab')?.lure, 'Empty Beer Can');
  assert.equal(creatures.find((creature) => creature.name === 'Giant Piranha')?.lure, 'Modified Leech');
  assert.equal(creatures.find((creature) => creature.name === 'Mutated Bowhead Whale')?.lure, 'Bowhead Whale');
  assert.ok(creatures.every((creature) => !/only|exclusive/i.test(creature.notes || '')));
});

const achievementRoutes = [
  '/achievements/bean/',
  '/achievements/fishipedia/',
  '/achievements/rich-millionaire/',
  '/achievements/360-no-scope/',
  '/achievements/handyman/',
  '/achievements/everyones-dream/',
] as const;

test('P2 publishes six difficult-achievement pages with official requirements', () => {
  const byRoute = new Map(seoPages.map((page) => [page.route, page]));
  for (const route of achievementRoutes) {
    const page = byRoute.get(route);
    assert.ok(page, `${route} must be published`);
    assert.equal(page.pageType, 'achievement-guide');
    assert.ok(page.sections.length >= 4);
    assert.ok(page.sources.includes('steamAchievements'));
    assert.equal(resolveSources(page.sources).length, page.sources.length);
  }
  assert.deepEqual(innerData.getInnerStaticParams('achievements'), achievementRoutes.map((route) => ({ slug: route.split('/')[2] })));
});

test('P2 uses the August 27 Steam achievement snapshot and canonical child links', () => {
  const expected = [
    ['360 no scope', [59.4, '/achievements/360-no-scope/']],
    ['Rich! Millionaire', [11.8, '/achievements/rich-millionaire/']],
    ["Everyone's dream", [4.6, '/achievements/everyones-dream/']],
    ['Handyman', [2.0, '/achievements/handyman/']],
    ['Fishipedia', [1.7, '/achievements/fishipedia/']],
    ['Bean', [1.3, '/achievements/bean/']],
  ] as const;
  for (const [name, [rate, route]] of expected) {
    const item = achievements.find((achievement) => achievement.name === name);
    assert.equal(item?.steamCompletionRate, rate, `${name} completion snapshot is stale`);
    assert.equal(item?.relatedGuide, route, `${name} needs its canonical guide`);
  }
});

test('achievement checklist exposes difficult-achievement detail links', () => {
  const markup = renderToStaticMarkup(React.createElement(AchievementChecklist));
  for (const route of achievementRoutes) assert.match(markup, new RegExp(`href="${route.replace(/\/$/, '')}"`));
});

test('homepage stuck-state cards link directly to current boss and recovery answers', () => {
  const markup = renderToStaticMarkup(React.createElement(HomePage));
  for (const route of [
    '/bosses/pufferfish/',
    '/fixes/leeches-not-spawning/',
    '/fixes/missing-radar/',
    '/fixes/multiplayer-black-screen/',
    '/fixes/save-autosave/',
    '/achievements/bean/',
  ]) assert.match(markup, new RegExp(`href="${route.replace(/\/$/, '')}"`), `homepage needs a direct route to ${route}`);
});
