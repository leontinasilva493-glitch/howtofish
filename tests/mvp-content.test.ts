import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { achievements } from '../content/achievements';
import { creatures } from '../content/creatures';
import { getPageByRoute, seoPages } from '../content/pages';
import { siteStatus } from '../content/site-status';

const projectFile = (path: string) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const expectedRoutes = [
  '/',
  '/walkthrough/',
  '/islands/',
  '/islands/lighthouse/',
  '/islands/forest/',
  '/islands/desert/',
  '/islands/rocks/',
  '/islands/volcano/',
  '/bosses/',
  '/bosses/mutated-bowhead-whale/',
  '/achievements/',
  '/fish/',
  '/tips/',
  '/multiplayer/',
  '/fixes/',
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
  '/achievements/bean/',
  '/achievements/fishipedia/',
  '/achievements/rich-millionaire/',
  '/achievements/360-no-scope/',
  '/achievements/handyman/',
  '/achievements/everyones-dream/',
];

test('the P0-P2 release publishes exactly the thirty-one canonical SEO routes', () => {
  assert.deepEqual(seoPages.map((page) => page.route), expectedRoutes);
  assert.equal(new Set(seoPages.map((page) => page.title)).size, seoPages.length);
  assert.equal(new Set(seoPages.map((page) => page.description)).size, seoPages.length);
  assert.equal(new Set(seoPages.map((page) => page.h1)).size, seoPages.length);
});

test('every SEO page has answer-first content and a visible evidence trail', () => {
  for (const page of seoPages) {
    assert.ok(page.quickAnswer.length >= 100, `${page.route} needs a useful quick answer`);
    assert.ok(page.sections.length >= 4, `${page.route} needs independent page content`);
    assert.ok(page.sources.length >= 2, `${page.route} needs more than one evidence reference`);
    assert.ok(page.lastUpdated >= siteStatus.lastChecked, `${page.route} review date predates the site baseline`);
    if (page.lastUpdated === siteStatus.lastChecked) assert.equal(page.verifiedPatch, siteStatus.verifiedPatch);
    assert.ok(page.updateLog.length >= 1, `${page.route} needs an update log`);
    assert.ok(page.relatedPages.every((route) => route === '/' || route.split('#')[0].endsWith('/')));
  }
});

test('version-sensitive multiplayer and save claims stay bounded', () => {
  const multiplayer = getPageByRoute('/multiplayer/');
  assert.match(multiplayer.quickAnswer, /intended for 1–4 players/i);
  assert.match(multiplayer.quickAnswer, /up to eight/i);
  assert.doesNotMatch(multiplayer.quickAnswer, /8-player game/i);

  const fixes = getPageByRoute('/fixes/');
  assert.match(fixes.quickAnswer, /attempted fix/i);
  assert.doesNotMatch(fixes.quickAnswer, /completely fixed|guaranteed recovery/i);
});

test('the achievement checklist contains all 28 official Steam entries', () => {
  assert.equal(achievements.length, 28);
  assert.equal(new Set(achievements.map((item) => item.id)).size, 28);
  assert.deepEqual(achievements.slice(-5).map((item) => item.name), [
    "Rich! Millionaire",
    "Everyone's dream",
    'Handyman',
    'Fishipedia',
    'Bean',
  ]);
  assert.equal(achievements.find((item) => item.name === 'Handyman')?.officialDescription, 'Defeat the final boss with your bare hands');
  assert.equal(achievements.find((item) => item.name === 'Bean')?.versionSensitive, true);
});

test('creature records avoid unsupported totals and absolute spawn claims', () => {
  assert.ok(creatures.length >= 8);
  for (const creature of creatures) {
    assert.ok(creature.sourceLevel);
    assert.equal('location' in creature, false);
    assert.doesNotMatch(creature.notes ?? '', /only (found|available|spawns) on/i);
  }
});

test('the shared guide shell and home page expose the answer-first dashboard', async () => {
  const [guide, designSystem, home, header] = await Promise.all([
    projectFile('components/guide/GuidePage.tsx'),
    projectFile('components/guide/DesignSystem.tsx'),
    projectFile('components/wiki/HomePage.tsx'),
    projectFile('components/wiki/SiteHeader.tsx'),
  ]);

  assert.match(guide, /GuideHeader/);
  assert.match(guide, /SourceLine/);
  assert.match(guide, /v2-update-line/);
  assert.match(designSystem, /Quick Answer/i);
  for (const label of ['Where Are You Stuck?', 'Complete (?:How to Fish )?Island Progression', 'Common How to Fish Problems']) {
    assert.match(home, new RegExp(label, 'i'));
  }
  assert.doesNotMatch(header, /href:\s*['"]\/guides|href:\s*['"]\/wiki/);
  assert.match(header, /\/walkthrough\//);
  assert.match(header, /\/achievements\//);
});

test('P0 and P1 routes use the shared guide system and focused data tools', async () => {
  const routeFiles = [
    'app/walkthrough/page.tsx',
    'app/islands/page.tsx',
    'app/bosses/page.tsx',
    'app/bosses/mutated-bowhead-whale/page.tsx',
    'app/achievements/page.tsx',
    'app/fish/page.tsx',
    'app/fixes/page.tsx',
  ];
  const routes = await Promise.all(routeFiles.map(projectFile));
  for (const route of routes) {
    assert.match(route, /GuidePageView|IslandGuidePage|WalkthroughPageView|BossFeaturePage|FishDatabasePage/);
    assert.match(route, /guideMetadata/);
  }

  const [checklist, explorer, issues] = await Promise.all([
    projectFile('components/guide/AchievementChecklist.tsx'),
    projectFile('components/guide/CreatureExplorer.tsx'),
    projectFile('components/guide/IssueStatusTable.tsx'),
  ]);
  assert.match(checklist, /how-to-fish-achievements-v1/);
  assert.match(checklist, /localStorage/);
  assert.match(explorer, /Missing only/);
  assert.match(explorer, /firstAvailableArea/);
  assert.match(issues, /attempted-fix/);
  assert.match(issues, /still-reported/);
});

test('the second batch has five linked island guides plus support and trust pages', async () => {
  const routeFiles = [
    'app/islands/lighthouse/page.tsx',
    'app/islands/forest/page.tsx',
    'app/islands/desert/page.tsx',
    'app/islands/rocks/page.tsx',
    'app/islands/volcano/page.tsx',
    'app/tips/page.tsx',
    'app/multiplayer/page.tsx',
  ];
  const routes = await Promise.all(routeFiles.map(projectFile));
  for (const route of routes) {
    assert.match(route, /GuidePageView|IslandGuidePage/);
    assert.match(route, /guideMetadata/);
  }
  const islandTemplate = await projectFile('components/guide/IslandGuidePage.tsx');
  assert.match(islandTemplate, /Previous area/);
  assert.match(islandTemplate, /Next area/);

  const [about, contact, privacy, terms, footer] = await Promise.all([
    projectFile('app/about/page.tsx'),
    projectFile('app/contact/page.tsx'),
    projectFile('app/privacy-policy/page.tsx'),
    projectFile('app/terms/page.tsx'),
    projectFile('components/wiki/SiteFooter.tsx'),
  ]);
  for (const file of [about, contact, privacy, terms]) assert.match(file, /robots:\s*\{\s*index:\s*false/);
  assert.match(footer, /\/privacy-policy\//);
  assert.match(footer, /\/terms\//);
});

test('active public discovery files contain only final MVP routes and branding', async () => {
  const [llms, manifest, icon, notFound] = await Promise.all([
    projectFile('public/llms.txt'),
    projectFile('public/assets/site.webmanifest'),
    projectFile('public/assets/how-to-fish/fish-hook.svg'),
    projectFile('app/not-found.tsx'),
  ]);
  assert.match(llms, /\/walkthrough\//);
  assert.match(llms, /\/bosses\/mutated-bowhead-whale\//);
  assert.doesNotMatch(llms, /\/guides\b|\/wiki\b|\/gambling\b/);
  assert.match(manifest, /fish-hook\.svg/);
  assert.doesNotMatch(manifest, /android-chrome/);
  assert.match(icon, /<svg/);
  assert.doesNotMatch(notFound, /href="\/guides"/);
});
