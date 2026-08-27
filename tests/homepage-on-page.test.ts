import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { guideMetadata } from '../config/seo';
import { getPageByRoute } from '../content/pages';

const projectFile = (path: string) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const wordCount = (value: string) => value.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;
const openGraphType = (metadata: Awaited<ReturnType<typeof guideMetadata>>) => (metadata.openGraph as { type?: string } | undefined)?.type;

test('the homepage owns a substantial direct-answer guide body', async () => {
  const home = getPageByRoute('/');
  const body = home.sections.flatMap((section) => [section.title, section.intro ?? '', ...(section.paragraphs ?? []), ...(section.steps ?? []), ...(section.bullets ?? [])]).join(' ');
  const lighthouse = home.sections.find((section) => section.id === 'lighthouse-chapter');

  assert.ok(wordCount(body) >= 1200 && wordCount(body) <= 1800, `homepage guide body has ${wordCount(body)} words`);
  assert.ok(lighthouse, 'homepage needs a Lighthouse first-chapter section');
  assert.ok(wordCount([lighthouse.title, lighthouse.intro ?? '', ...(lighthouse.paragraphs ?? []), ...(lighthouse.steps ?? []), ...(lighthouse.bullets ?? [])].join(' ')) >= 600, 'Lighthouse chapter needs at least 600 words');
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

test('inner guide metadata remains an article and homepage social alt is honest', async () => {
  const walkthrough = guideMetadata(getPageByRoute('/walkthrough/'));
  const [home, pages, layout] = await Promise.all([
    projectFile('components/wiki/HomePage.tsx'),
    projectFile('content/pages.ts'),
    projectFile('app/layout.tsx'),
  ]);
  assert.equal(openGraphType(walkthrough), 'article');
  assert.match(home, /Community-sourced · Updating daily/);
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
