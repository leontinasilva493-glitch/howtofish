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

test('legacy template routes redirect with HTTP 301 to final MVP intents', async () => {
  const nextConfig = await import('../next.config.js');
  const redirectsFn = nextConfig.default.redirects;
  assert.equal(typeof redirectsFn, 'function');
  assert.equal(nextConfig.default.trailingSlash, true);
  const redirects = await redirectsFn!();
  assert.deepEqual(redirects, [
    { source: '/wiki', destination: '/', statusCode: 301 },
    { source: '/guide', destination: '/', statusCode: 301 },
    { source: '/guides', destination: '/walkthrough/', statusCode: 301 },
    { source: '/guides/:path*', destination: '/walkthrough/', statusCode: 301 },
    { source: '/gear', destination: '/fish/', statusCode: 301 },
    { source: '/gambling', destination: '/tips/', statusCode: 301 },
    { source: '/calculator', destination: '/tips/', statusCode: 301 },
    { source: '/checklist', destination: '/achievements/', statusCode: 301 },
    { source: '/codes', destination: '/tips/', statusCode: 301 },
    { source: '/maps', destination: '/islands/', statusCode: 301 },
    { source: '/map', destination: '/islands/', statusCode: 301 },
    { source: '/entities/verity', destination: '/bosses/', statusCode: 301 },
    { source: '/entities/bosses', destination: '/bosses/', statusCode: 301 },
    { source: '/weapons', destination: '/tips/', statusCode: 301 },
    { source: '/updates', destination: '/', statusCode: 301 },
    { source: '/community', destination: '/multiplayer/', statusCode: 301 },
    { source: '/tools', destination: '/tips/', statusCode: 301 },
    { source: '/privacy', destination: '/privacy-policy/', statusCode: 301 },
  ]);
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

test('the sitemap publishes exactly the fifteen canonical MVP routes', async () => {
  const { default: sitemap } = await import('../app/sitemap');
  const urls = sitemap().map((entry) => new URL(entry.url).pathname);
  assert.deepEqual(urls, ['/', '/walkthrough/', '/islands/', '/islands/lighthouse/', '/islands/forest/', '/islands/desert/', '/islands/rocks/', '/islands/volcano/', '/bosses/', '/bosses/mutated-bowhead-whale/', '/achievements/', '/fish/', '/tips/', '/multiplayer/', '/fixes/']);
});
