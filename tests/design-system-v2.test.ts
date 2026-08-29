import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { WalkthroughPageView } from '../components/guide/WalkthroughPage';
import { getPageByRoute } from '../content/pages';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const projectFile = (path: string) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const channels = hex.slice(1).match(/../g)?.map((value) => Number.parseInt(value, 16) / 255) ?? [];
    const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const left = luminance(foreground);
  const right = luminance(background);
  return (Math.max(left, right) + 0.05) / (Math.min(left, right) + 0.05);
}

test('reef-dark v2 exposes the authoritative tokens and flat card geometry', async () => {
  const css = await projectFile('app/globals.css');
  const tokens = [
    ['--bg-primary', '#081C2A'], ['--bg-secondary', '#0B2536'], ['--bg-card', '#0F2E42'],
    ['--bg-elevated', '#15405A'], ['--bg-footer', '#051521'], ['--border', '#1D4358'],
    ['--border-strong', '#2E5D78'], ['--text-primary', '#E9F3F8'], ['--text-secondary', '#A3C0CE'],
    ['--amber', '#FFB84D'], ['--coral', '#FF7A59'],
    ['--teal', '#2DD4BF'], ['--sky', '#38BDF8'], ['--danger', '#F05A5A'],
  ];
  for (const [name, value] of tokens) assert.match(css, new RegExp(`${name}:\\s*${value}`, 'i'));
  const muted = css.match(/--text-muted:\s*(#[0-9A-F]{6})/i)?.[1];
  assert.ok(muted && contrastRatio(muted, '#0F2E42') >= 4.5, 'muted text must meet WCAG AA on reef cards');
  assert.match(css, /--wiki-container:\s*1200px/);
  assert.match(css, /\[data-theme='reef-dark'\][\s\S]*--wiki-shadow:\s*none/);
  assert.match(css, /\.wiki-card-link:hover[\s\S]*translateY\(-2px\)/);
});

test('the shared v2 components and font weights are wired before page composition', async () => {
  const [layout, components] = await Promise.all([
    projectFile('app/layout.tsx'),
    projectFile('components/guide/DesignSystem.tsx'),
  ]);
  assert.match(layout, /weight:\s*\['500',\s*'600',\s*'700'\]/);
  for (const name of ['VerificationBadge', 'IssueStatusTag', 'QuickAnswer', 'KeyFacts', 'GuideCallout', 'ProgressBar', 'FaqAccordion', 'SourceLine']) {
    assert.match(components, new RegExp(`export function ${name}`));
  }
});

test('homepage keeps its commissioned art while island guides may use source-labelled official screenshots', async () => {
  const [home, site, sourceRegistry] = await Promise.all([
    projectFile('components/wiki/HomePage.tsx'),
    projectFile('config/site.ts'),
    projectFile('content/sources.ts'),
  ]);
  for (const source of [home, site]) assert.doesNotMatch(source, /\/assets\/how-to-fish\/steam-[^'"\s]+/);
  for (const file of ['hero-island-v2.webp', 'mutated-whale-v2.webp', 'guide-fishing-v2.webp']) {
    const info = await stat(new URL(`../public/assets/how-to-fish/${file}`, import.meta.url));
    assert.ok(info.size > 20_000, `${file} must be a real project asset`);
  }
  const lighthouse = getPageByRoute('/islands/lighthouse/');
  assert.match(lighthouse.image ?? '', /^\/assets\/how-to-fish\/steam-[^/]+\.webp$/);
  assert.ok(lighthouse.sources.includes('steamMedia'));
  assert.match(sourceRegistry, /steamMedia[\s\S]*sourceLevel:\s*'official'/);
  assert.match(site, /hero-island-v2\.webp/);
});

test('the global shell matches the compact HTF WIKI reference', async () => {
  const [header, footer] = await Promise.all([
    projectFile('components/wiki/SiteHeader.tsx'),
    projectFile('components/wiki/SiteFooter.tsx'),
  ]);
  assert.match(header, /HTF WIKI/);
  assert.match(header, /usePathname/);
  assert.match(header, /aria-current/);
  assert.match(header, /ThemeToggle/);
  assert.match(header, /WikiSearchDialog/);
  assert.match(header, /SheetContent/);
  assert.match(footer, /footer-inline-links/);
  assert.doesNotMatch(footer, /title:\s*'PROGRESS'|title:\s*'COMPLETE'|title:\s*'SUPPORT'/);
});

test('the home page follows the authoritative dashboard section order', async () => {
  const home = await projectFile('components/wiki/HomePage.tsx');
  const sections = ['hero', 'status', 'stuck', 'featured', 'guide-content', 'islands', 'problems', 'faq'];
  let previous = -1;
  for (const section of sections) {
    const index = home.indexOf(`data-home-section="${section}"`);
    assert.ok(index > previous, `${section} must appear in the prescribed order`);
    previous = index;
  }
  assert.match(home, /HomeGuideBody/);
  assert.doesNotMatch(home, /CreaturePreview/);
  assert.match(home, /IssueStatusTag/);
  assert.doesNotMatch(home, /title="Browse the How to Fish Wiki"|title="How to Fish Boss Guides"/);
});

test('Walkthrough renders its five chapter cards and every authored detail section', async () => {
  const route = await projectFile('app/walkthrough/page.tsx');
  const page = getPageByRoute('/walkthrough/');
  const markup = renderToStaticMarkup(React.createElement(WalkthroughPageView, { page }));

  assert.equal((markup.match(/class="chapter-card(?: |")/g) ?? []).length, 5);
  assert.match(markup, /chapter-card-final/);
  for (const section of page.sections) {
    assert.match(markup, new RegExp(`id="${section.id}"`), `${section.id} must be rendered`);
  }
  assert.match(markup, /Back up the save before experimenting with community workarounds/);
  assert.equal((markup.match(/id="blockers"/g) ?? []).length, 1, 'the blocker section must not be duplicated');
  assert.match(route, /WalkthroughPageView/);
  assert.doesNotMatch(route, /GuidePageView/);
});

test('the final boss page follows the five-fact cinematic reference', async () => {
  const [component, route] = await Promise.all([
    projectFile('components/guide/BossFeaturePage.tsx'),
    projectFile('app/bosses/mutated-bowhead-whale/page.tsx'),
  ]);
  assert.match(component, /mutated-whale-v2\.webp/);
  assert.match(component, /columns=\{5\}/);
  assert.match(component, /How to Summon the Mutated Bowhead Whale/);
  assert.match(component, /summon-step/);
  assert.match(component, /Handyman Achievement/);
  assert.match(component, /variant="version"/);
  assert.match(route, /BossFeaturePage/);
  assert.doesNotMatch(route, /GuidePageView/);
});

test('the Fish page is database-first with persisted documented progress', async () => {
  const [component, explorer, route] = await Promise.all([
    projectFile('components/guide/FishDatabasePage.tsx'),
    projectFile('components/guide/CreatureExplorer.tsx'),
    projectFile('app/fish/page.tsx'),
  ]);
  assert.match(component, /CreatureExplorer/);
  assert.match(explorer, /how-to-fish-creatures-v2/);
  assert.match(explorer, /ProgressBar/);
  assert.match(explorer, /Collector progress/);
  assert.match(explorer, /Fishipedia Drip progress/);
  assert.match(explorer, /All types/);
  assert.match(explorer, /Missing only/);
  assert.match(explorer, /Data accuracy rule/i);
  assert.match(route, /FishDatabasePage/);
  assert.doesNotMatch(route, /GuidePageView/);
});

test('remaining routes use the simplified shared v2 guide template', async () => {
  const [guide, achievements, issues] = await Promise.all([
    projectFile('components/guide/GuidePage.tsx'),
    projectFile('components/guide/AchievementChecklist.tsx'),
    projectFile('components/guide/IssueStatusTable.tsx'),
  ]);
  for (const component of ['GuideHeader', 'KeyFacts', 'FaqAccordion', 'SourceLine', 'GuideStructuredData']) assert.match(guide, new RegExp(component));
  assert.doesNotMatch(guide, /guide-toc|official-media/);
  assert.match(achievements, /ProgressBar/);
  assert.match(issues, /IssueStatusTag/);
  assert.doesNotMatch(issues, /Official Diagnostic/);
});

test('responsive CSS follows the 1280, tablet and mobile rules', async () => {
  const css = await projectFile('app/globals.css');
  assert.match(css, /@media\s*\(max-width:\s*1279px\)/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)/);
  assert.match(css, /\.core-page[\s\S]*padding/);
  assert.match(css, /\.v2-card[\s\S]*box-shadow:\s*none/);
  assert.match(css, /\.boss-hero-image[\s\S]*aspect-ratio:\s*16\s*\/\s*9/);
  assert.match(css, /\.table-scroll[\s\S]*overflow-x:\s*auto/);
  assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.guide-media-gallery\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
