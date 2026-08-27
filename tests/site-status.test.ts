import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import sitemap from '../app/sitemap';
import { HomePage } from '../components/wiki/HomePage';
import { getPageByRoute } from '../content/pages';
import { sources } from '../content/sources';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

test('homepage status UI reads the current page version and verification date', () => {
  const home = getPageByRoute('/');
  const originalPatch = home.verifiedPatch;
  const originalLastUpdated = home.lastUpdated;

  try {
    home.verifiedPatch = '9.9.9';
    home.lastUpdated = '2099-12-31';
    const markup = renderToStaticMarkup(React.createElement(HomePage));

    assert.match(markup, /9\.9\.9/);
    assert.match(markup, /Dec 31, 2099/);
    assert.match(markup, /Community-sourced · Last checked Dec 31, 2099/);
    assert.doesNotMatch(markup, /Updating daily/);
  } finally {
    home.verifiedPatch = originalPatch;
    home.lastUpdated = originalLastUpdated;
  }
});

test('sitemap lastModified follows each page instead of a global build date', () => {
  const home = getPageByRoute('/');
  const originalLastUpdated = home.lastUpdated;

  try {
    home.lastUpdated = '2099-12-31';
    const homepageEntry = sitemap().find((entry) => entry.url.endsWith('/'));

    assert.ok(homepageEntry, 'sitemap needs the homepage');
    assert.equal(homepageEntry.lastModified, '2099-12-31T00:00:00.000Z');
  } finally {
    home.lastUpdated = originalLastUpdated;
  }
});

test('source access dates match the homepage verification date', () => {
  const lastUpdated = getPageByRoute('/').lastUpdated;

  for (const source of Object.values(sources)) {
    assert.equal(source.accessedAt, lastUpdated, `${source.id} has a stale accessedAt date`);
  }
});

test('generated llms files are synchronized with the canonical site status', () => {
  const projectRoot = fileURLToPath(new URL('..', import.meta.url));
  const result = spawnSync(process.execPath, ['--import', 'tsx', 'scripts/generate-llms.ts', '--check'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
});
