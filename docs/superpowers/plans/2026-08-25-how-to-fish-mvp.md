# How to Fish MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the fifteen-route evidence-labelled How to Fish guide/wiki MVP on the existing Next.js template.

**Architecture:** Static typed content modules feed a shared server-rendered guide shell and focused client components for checklist and filtering. Canonical metadata, schemas, redirects, and sitemap rules are generated from the same route registry.

**Tech Stack:** Next.js 13 App Router, React 18, TypeScript 5, Tailwind CSS, Node test runner, Tabbit Browser.

**Spec:** `docs/superpowers/specs/2026-08-25-how-to-fish-mvp-design.md`

## Global Constraints

- Use exactly the fifteen SEO routes in the PRD; do not create `/guide/` or `/wiki/` acquisition pages.
- Preserve `official`, `verified-in-game`, `community`, and `unconfirmed` as distinct evidence states.
- Write Patch 1.0.9 save work as an attempted fix, never a guaranteed recovery.
- Describe multiplayer as intended for 1–4 players with technical support for lobbies up to eight after Patch 1.0.4.
- Do not publish a total creature count or absolute `only found on` location without first-hand evidence.
- Canonical and internal URLs use trailing slashes.
- No task may claim a pass without a fresh test, build, or browser assertion.

---

### Task 1: Content contracts and evidence registry

**Files:**
- Create: `tests/mvp-content.test.ts`
- Create: `content/types.ts`
- Create: `content/sources.ts`
- Create: `content/pages.ts`
- Create: `content/achievements.ts`
- Create: `content/creatures.ts`

**Interfaces:**
- Produces: `seoPages: GuidePage[]`, `getPageByRoute(route: string): GuidePage`, `achievements: Achievement[]`, `creatures: Creature[]`, and `sources: Record<string, SourceReference>`.

- [ ] Write tests asserting the exact fifteen-route set, unique title/description/H1, answer/source/update contracts, the sensitive Patch and multiplayer wording, 28 official achievements, and non-absolute creature fields.
- [ ] Run `npm.cmd test -- tests/mvp-content.test.ts` and confirm failure because the content modules do not exist.
- [ ] Add the shared types and official/community source registry.
- [ ] Add the fifteen page records, official achievement records, and evidence-labelled creature records.
- [ ] Run `npm.cmd test -- tests/mvp-content.test.ts` and confirm it passes.

### Task 2: Shared guide UI, metadata, and home dashboard

**Files:**
- Create: `components/guide/GuidePage.tsx`
- Create: `components/guide/Evidence.tsx`
- Create: `components/guide/IslandProgression.tsx`
- Rewrite: `components/wiki/HomePage.tsx`
- Modify: `components/wiki/SiteHeader.tsx`
- Modify: `components/wiki/SiteFooter.tsx`
- Modify: `components/wiki/WikiSearchDialog.tsx`
- Modify: `config/site.ts`
- Modify: `config/seo.ts`
- Modify: `app/schema.ts`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `GuidePage`, `seoPages`, source records, and `siteConfig`.
- Produces: `GuidePageView({ page, children? })`, `guideMetadata(page)`, and a dashboard-style home page.

- [ ] Extend the content test with file-level assertions for visible Quick Answer, evidence labels, current status, and final navigation.
- [ ] Run the targeted test and confirm it fails against the legacy UI.
- [ ] Implement the shared shell, schema helpers, canonical metadata, final navigation, search registry, and home sections.
- [ ] Extend reef styles with sonar grid, route timeline, media captions, responsive tables, and accessible interaction states.
- [ ] Run the targeted content and template tests and confirm they pass.

### Task 3: P0/P1 route implementation

**Files:**
- Create: `app/walkthrough/page.tsx`
- Rewrite: `app/islands/page.tsx`
- Create: `app/bosses/page.tsx`
- Create: `app/bosses/mutated-bowhead-whale/page.tsx`
- Create: `app/achievements/page.tsx`
- Rewrite: `app/fish/page.tsx`
- Create: `app/fixes/page.tsx`
- Create: `components/guide/AchievementChecklist.tsx`
- Create: `components/guide/CreatureExplorer.tsx`
- Create: `components/guide/IssueStatusTable.tsx`

**Interfaces:**
- Consumes: page registry, achievements, creatures.
- Produces: rendered P0/P1 pages, persisted checklist state under `how-to-fish-achievements-v1`, and filterable creature results.

- [ ] Add tests for P0/P1 route files, localStorage key, fish canonical behavior, and visible status language.
- [ ] Run the targeted test and confirm the missing route/component failures.
- [ ] Implement the route files and the three focused data components.
- [ ] Run `npm.cmd test` and resolve only task-related failures.

### Task 4: Island detail, tips, multiplayer, and basic pages

**Files:**
- Create: `components/guide/IslandGuidePage.tsx`
- Create: `app/islands/lighthouse/page.tsx`
- Create: `app/islands/forest/page.tsx`
- Create: `app/islands/desert/page.tsx`
- Create: `app/islands/rocks/page.tsx`
- Create: `app/islands/volcano/page.tsx`
- Create: `app/tips/page.tsx`
- Create: `app/multiplayer/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/privacy-policy/page.tsx`
- Modify: `app/terms/page.tsx`

**Interfaces:**
- Consumes: the shared guide shell and island records.
- Produces: five linked island guides, two second-batch support pages, and four public trust/legal pages.

- [ ] Add route and internal-link assertions for the five-island sequence and legal footer.
- [ ] Run the targeted test and confirm failure for missing routes.
- [ ] Implement all routes with independent Quick Answers, source lists, update logs, previous/next links, and official media where relevant.
- [ ] Run `npm.cmd test` and confirm the full suite passes.

### Task 5: Canonical routing, assets, build, and visual QA

**Files:**
- Modify: `next.config.js`
- Rewrite: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Create: `public/assets/how-to-fish/fish-hook.svg`
- Use: `public/assets/how-to-fish/steam-*.jpg`
- Remove: `.tabbit-research.js`

**Interfaces:**
- Produces: trailing-slash canonicals, legacy 301 redirects, a fifteen-route sitemap, active How to Fish imagery, and browser-verified output.

- [ ] Update route tests to assert every legacy page redirects to one canonical MVP route and the sitemap contains exactly the fifteen SEO paths.
- [ ] Run the route tests and confirm they fail against the legacy redirect/sitemap setup.
- [ ] Implement trailing slashes, redirects, sitemap, robots, and active icon/OG assets.
- [ ] Run `npm.cmd test` and `npm.cmd run build`; both must exit zero.
- [ ] Run the built site locally and use Tabbit to verify desktop and mobile home layouts, navigation, one guide page, checklist persistence, fish filtering, canonical tags, JSON-LD, and zero console errors.
- [ ] Finish the Tabbit task once and report the exact verification evidence.
