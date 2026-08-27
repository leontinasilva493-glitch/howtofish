import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { HomePage } from '../components/wiki/HomePage';
import { guideMetadata } from '../config/seo';
import { getPageByRoute } from '../content/pages';
import { resolveSources } from '../content/sources';

const projectFile = (path: string) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const openGraphType = (metadata: Awaited<ReturnType<typeof guideMetadata>>) => (metadata.openGraph as { type?: string } | undefined)?.type;
(globalThis as typeof globalThis & { React: typeof React }).React = React;

test('the homepage owns an answer-first guide with the required player-task sections', () => {
  const home = getPageByRoute('/');
  const sectionIds = new Set(home.sections.map((section) => section.id));

  assert.ok(home.quickAnswer.length >= 100, 'homepage needs a useful quick answer');
  for (const sectionId of ['quick-start', 'fishing-basics', 'lighthouse-chapter', 'next-steps', 'verification']) {
    assert.ok(sectionIds.has(sectionId), `homepage needs the ${sectionId} section`);
  }
});

test('the homepage renders its quick answer and one-click section navigation after the hero', () => {
  const home = getPageByRoute('/');
  const markup = renderToStaticMarkup(React.createElement(HomePage));

  assert.match(markup, /data-home-section="hero"[\s\S]*data-home-section="quick-answer"[\s\S]*data-home-section="status"/);
  assert.ok(markup.includes(home.quickAnswer), 'rendered homepage needs the data-backed quick answer');
  assert.match(markup, /aria-label="Jump to guide sections"/);
  for (const target of ['quick-start', 'lighthouse-chapter', 'island-progression', 'common-problems', 'faq']) {
    assert.match(markup, new RegExp(`href="#${target}"`), `quick navigation needs #${target}`);
    assert.match(markup, new RegExp(`id="${target}"`), `homepage needs the #${target} target`);
  }
});

test('homepage sources cover its official and community-documented claims', () => {
  const sourceLevels = new Set(resolveSources(getPageByRoute('/').sources).map((source) => source.sourceLevel));

  assert.ok(sourceLevels.has('official'), 'homepage needs an official source');
  assert.ok(sourceLevels.has('community'), 'homepage community route needs a community source');
});

test('the homepage renders direct guide content and no incomplete fish preview', async () => {
  const home = await projectFile('components/wiki/HomePage.tsx');
  assert.match(home, /HomeGuideBody/);
  assert.doesNotMatch(home, /CreaturePreview/);
  assert.doesNotMatch(home, /Verified in-game/);
  assert.doesNotMatch(home, /AI-generated/);
});

test('homepage metadata targets the complete guide query and uses a website OG type', () => {
  const home = getPageByRoute('/');
  const metadata = guideMetadata(home);
  assert.equal(metadata.title, 'How to Fish Game Guide – Walkthrough, Bosses & All Islands');
  assert.equal(metadata.description, 'The complete How to Fish game guide: full walkthrough, all 5 island routes, boss strategies, fish & bait data, all 28 achievements, and patch fixes.');
  assert.equal(openGraphType(metadata), 'website');
});

test('homepage, walkthrough, and achievements retain separate search intent ownership', () => {
  const home = getPageByRoute('/');
  const walkthrough = getPageByRoute('/walkthrough/');
  const achievements = getPageByRoute('/achievements/');

  assert.equal(home.primaryKeyword, 'how to fish game guide');
  assert.equal(walkthrough.primaryKeyword, 'how to fish game walkthrough');
  assert.equal(achievements.primaryKeyword, 'how to fish all achievements');
  assert.ok(!home.secondaryKeywords.includes(walkthrough.primaryKeyword));
  assert.ok(!home.secondaryKeywords.includes(achievements.primaryKeyword));
});

test('inner guide metadata remains an article and homepage social alt is honest', async () => {
  const walkthrough = guideMetadata(getPageByRoute('/walkthrough/'));
  const [home, pages, layout] = await Promise.all([
    projectFile('components/wiki/HomePage.tsx'),
    projectFile('content/pages.ts'),
    projectFile('app/layout.tsx'),
  ]);
  assert.equal(openGraphType(walkthrough), 'article');
  assert.match(home, /Castaway fishing beside a washed-up boat on a tropical island in How to Fish/);
  assert.match(pages, /Castaway fishing beside a washed-up boat on a tropical island in How to Fish/);
  assert.doesNotMatch(layout, /favicon16|favicon32/);
});

test('homepage hero keeps an explicit aspect-ratio layout reservation', async () => {
  const css = await projectFile('app/globals.css');
  assert.match(css, /\.home-hero-media[^}]*aspect-ratio:\s*4\s*\/\s*3/);
});

test('theme color uses the App Router viewport export', async () => {
  const layout = await projectFile('app/layout.tsx');
  assert.match(layout, /import type \{ Metadata, Viewport \} from 'next'/);
  assert.match(layout, /export const viewport: Viewport = \{ themeColor: siteConfig\.metadata\.themeColor \}/);
});
