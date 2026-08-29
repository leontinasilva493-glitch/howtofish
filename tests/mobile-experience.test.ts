import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { SiteHeader } from '../components/wiki/SiteHeader';
import { AchievementChecklist } from '../components/guide/AchievementChecklist';
import { CreatureExplorer } from '../components/guide/CreatureExplorer';
import { IslandGuidePage } from '../components/guide/IslandGuidePage';
import { IssueStatusTable } from '../components/guide/IssueStatusTable';
import { getPageByRoute, seoPages } from '../content/pages';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const require = createRequire(import.meta.url);
const nextConfig = require('../next.config.js') as {
  redirects: () => Promise<Array<{ source: string; destination: string; statusCode: number }>>;
  headers?: () => Promise<Array<{ source: string; headers: Array<{ key: string; value: string }> }>>;
};

test('permanent redirect sources do not also ship App Router pages', async () => {
  const redirects = await nextConfig.redirects();
  const exactDuplicates = redirects
    .filter(({ source }) => !source.includes(':') && !source.endsWith('.html'))
    .map(({ source }) => source.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .map((route) => `../app/${route}/page.tsx`)
    .filter((relativePath) => existsSync(new URL(relativePath, import.meta.url)))
    .map((relativePath) => relativePath.replace('../app/', '/').replace('/page.tsx', '/'));

  const wildcardDuplicates = redirects
    .filter(({ source }) => source.endsWith('/:path*'))
    .flatMap(({ source }) => {
      const root = source.replace('/:path*', '').replace(/^\/+|\/+$/g, '');
      const directory = new URL(`../app/${root}/`, import.meta.url);
      if (!existsSync(directory)) return [];
      return readdirSync(directory, { recursive: true })
        .map(String)
        .filter((relativePath) => relativePath.endsWith('page.tsx'))
        .map((relativePath) => `/${root}/${relativePath.replaceAll('\\', '/').replace('/page.tsx', '').replace('page.tsx', '')}`);
    });

  const duplicatePages = Array.from(new Set([...exactDuplicates, ...wildcardDuplicates]));

  assert.deepEqual(
    duplicatePages,
    [],
    `Redirect-owned routes must not also be built as pages: ${duplicatePages.join(', ')}`,
  );
});

test('the global header renders search, theme, and an accessible mobile drawer trigger', () => {
  let markup = '';
  assert.doesNotThrow(() => {
    markup = renderToStaticMarkup(React.createElement(SiteHeader));
  });

  assert.match(markup, />Search wiki</);
  assert.match(markup, /aria-label="Switch to editorial light theme"/);
  assert.match(markup, /aria-label="Open navigation"/);
  assert.match(markup, /aria-haspopup="dialog"/);
});

test('the fish database renders a result summary and a semantic mobile disclosure list', () => {
  const markup = renderToStaticMarkup(React.createElement(CreatureExplorer));

  assert.match(markup, /aria-live="polite"[^>]*>45 documented creatures</);
  assert.match(markup, /class="creature-mobile-list"/);
  assert.match(markup, /<details[^>]*class="creature-mobile-card"/);
  assert.match(markup, /<summary[^>]*>[^<]*Rock Crab/);
});

test('achievement and issue modules expose mobile result and field labels', () => {
  const achievements = renderToStaticMarkup(React.createElement(AchievementChecklist));
  const issues = renderToStaticMarkup(React.createElement(IssueStatusTable));

  assert.match(achievements, /aria-live="polite"[^>]*>28 achievements shown</);
  assert.match(achievements, /class="progress-backup"/);
  assert.match(achievements, />Create backup</);
  assert.match(achievements, />Restore backup</);
  assert.match(issues, /data-label="Status"/);
  assert.match(issues, /data-label="What that means"/);
});

test('shared guide pages render mobile section navigation and labelled editorial rows', () => {
  const page = getPageByRoute('/islands/lighthouse/');
  const markup = renderToStaticMarkup(React.createElement(IslandGuidePage, { page }));

  assert.match(markup, /class="mobile-page-nav"/);
  assert.match(markup, />On this page</);
  assert.match(markup, /data-label="Official fact"/);
  assert.match(markup, /data-label="Community route"/);
  assert.match(markup, /data-label="Next safe step"/);
});

test('active official screenshots use bounded WebP assets and explicit cache headers', async () => {
  const screenshotPaths = Array.from(new Set(seoPages.flatMap((page) => [page.image, ...(page.media?.gallery.map((item) => item.src) ?? [])]).filter((path): path is string => Boolean(path?.includes('/steam-')))));
  assert.ok(screenshotPaths.length >= 7);
  for (const assetPath of screenshotPaths) {
    assert.match(assetPath, /\.webp$/);
    assert.ok(statSync(new URL(`../public${assetPath}`, import.meta.url)).size < 180_000, `${assetPath} must stay below 180 KB`);
  }

  const headers = await nextConfig.headers?.();
  const assetHeaders = headers?.find((entry) => entry.source === '/assets/:path*');
  assert.match(assetHeaders?.headers.find((header) => header.key.toLowerCase() === 'cache-control')?.value ?? '', /max-age=86400/);
  assert.match(assetHeaders?.headers.find((header) => header.key.toLowerCase() === 'cache-control')?.value ?? '', /stale-while-revalidate=604800/);
});

test('GitHub CI enforces public builds and the manifest does not promise offline app behavior', () => {
  const workflowUrl = new URL('../.github/workflows/ci.yml', import.meta.url);
  assert.ok(existsSync(workflowUrl), 'GitHub CI workflow must exist');
  const workflow = readFileSync(workflowUrl, 'utf8');
  for (const command of ['npm ci', 'npm test', 'npx tsc --noEmit', 'npm run lint', 'npm run build', 'npm run cf:build']) assert.match(workflow, new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(workflow, /REQUIRE_PUBLIC_SITE_URL:\s*['"]?true['"]?/);
  assert.match(workflow, /NEXT_PUBLIC_SITE_URL:\s*https:\/\//);

  const manifest = JSON.parse(readFileSync(new URL('../public/assets/site.webmanifest', import.meta.url), 'utf8')) as { display?: string };
  assert.equal(manifest.display, 'browser');
});
