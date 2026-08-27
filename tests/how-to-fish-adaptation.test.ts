import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { siteConfig } from '../config/site';

const projectFile = (path: string) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('site identity and official destinations are configured for How to Fish', () => {
  assert.equal(siteConfig.shortName, 'HTF WIKI');
  assert.equal(siteConfig.developer, 'Dazed Games');
  assert.equal(siteConfig.launchDate, '2026-08-20');
  assert.equal(siteConfig.visualPreset, 'reef-dark');
  assert.equal(siteConfig.links.game, 'https://store.steampowered.com/app/4001890/How_to_Fish/');
  assert.equal(siteConfig.links.group, 'https://discord.gg/N9bfGzNP4J');
  assert.equal(siteConfig.metadata.themeColor, '#081C2A');
  assert.equal(siteConfig.images.og, '/assets/how-to-fish/hero-island-v2.webp');
});

test('every observed legacy live route redirects with HTTP 301 to its closest canonical intent', async () => {
  const nextConfig = await import('../next.config.js');
  const redirectsFn = nextConfig.default.redirects;
  assert.equal(typeof redirectsFn, 'function');
  assert.equal(nextConfig.default.trailingSlash, true);
  const redirects = await redirectsFn!();
  const redirectMap = new Map(redirects.map((entry) => [entry.source, entry] as const));
  const expectedLegacyRoutes = [
    ['/guides', '/walkthrough/'],
    ['/guides/beginner-guide.html', '/'],
    ['/guides/multiplayer.html', '/multiplayer/'],
    ['/guides/system-requirements.html', '/'],
    ['/guides/first-hour.html', '/islands/lighthouse/'],
    ['/guides/solo-guide.html', '/walkthrough/'],
    ['/guides/troubleshooting.html', '/fixes/'],
    ['/guides/achievements.html', '/achievements/'],
    ['/media', '/'],
    ['/guides/controls.html', '/tips/'],
    ['/guides/progression.html', '/walkthrough/'],
    ['/guides/how-to-fish.html', '/tips/'],
    ['/guides/money-and-gambling.html', '/tips/'],
    ['/wiki', '/'],
    ['/wiki/fish.html', '/fish/'],
    ['/wiki/weapons.html', '/tips/'],
    ['/wiki/bosses.html', '/bosses/'],
    ['/wiki/islands.html', '/islands/'],
    ['/faq.html', '/#faq'],
    ['/about.html', '/about/'],
    ['/contact.html', '/contact/'],
    ['/privacy.html', '/privacy-policy/'],
    ['/disclaimer.html', '/terms/'],
  ] as const;

  for (const [source, destination] of expectedLegacyRoutes) {
    assert.deepEqual(redirectMap.get(source), { source, destination, statusCode: 301 }, `${source} must preserve its search intent`);
  }
});

test('the reef theme and Fredoka display font are wired into the app shell', async () => {
  const [css, layout] = await Promise.all([
    projectFile('app/globals.css'),
    projectFile('app/layout.tsx'),
  ]);
  assert.match(css, /\[data-theme='reef-dark'\]/);
  assert.match(css, /--amber:\s*#FFB84D/i);
  assert.match(css, /--wiki-accent:\s*var\(--amber\)/i);
  assert.doesNotMatch(css, /content-visibility:\s*auto/);
  assert.match(layout, /Fredoka/);
  assert.match(layout, /reef-dark/);
});

test('fish earnings calculator uses ceiling division and a trick-shot scenario', async () => {
  const calculator = await import('../lib/fishing-calculator');
  assert.deepEqual(calculator.calculateFishingTrips(120, 500, 90), {
    trips: 5,
    trickShotTrips: 3,
  });
  assert.deepEqual(calculator.calculateFishingTrips(500, 500, 90), {
    trips: 0,
    trickShotTrips: 0,
  });
  assert.equal(calculator.calculateFishingTrips(0, 500, 0), null);
});

test('the sitemap publishes the thirty-one canonical P0-P2 routes', async () => {
  const { default: sitemap } = await import('../app/sitemap');
  const urls = sitemap().map((entry) => new URL(entry.url).pathname);
  assert.deepEqual(urls, [
    '/', '/walkthrough/', '/islands/', '/islands/lighthouse/', '/islands/forest/', '/islands/desert/', '/islands/rocks/', '/islands/volcano/',
    '/bosses/', '/bosses/mutated-bowhead-whale/', '/achievements/', '/fish/', '/tips/', '/multiplayer/', '/fixes/',
    '/bosses/spider-crab/', '/bosses/giant-piranha/', '/bosses/pufferfish/', '/bosses/albatross/', '/bosses/bowhead-whale/',
    '/fixes/leeches-not-spawning/', '/fixes/missing-radar/', '/fixes/multiplayer-black-screen/', '/fixes/save-autosave/', '/fixes/error-0x11c7/',
    '/achievements/bean/', '/achievements/fishipedia/', '/achievements/rich-millionaire/', '/achievements/360-no-scope/', '/achievements/handyman/', '/achievements/everyones-dream/',
  ]);
});
