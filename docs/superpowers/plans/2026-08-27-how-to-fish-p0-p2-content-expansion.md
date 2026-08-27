# How to Fish P0-P2 Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved P0-P2 redirect, inner-page, Fishipedia, achievement, and homepage expansion with source-bounded content.

**Architecture:** Keep `content/pages.ts` as the canonical core registry and append a focused `content/inner-pages.ts` registry. Three static App Router dynamic segments render the new source-backed pages through the existing server-component guide shell. The existing client-only Fishipedia and achievement tracker retain versioned localStorage state.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind/global CSS, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-27-how-to-fish-p0-p2-content-expansion.md`

## Global Constraints

- Preserve reef-dark visual identity and existing components.
- No deployment, push, PR, merge, new dependency, or unrelated refactor.
- Gameplay facts require the source hierarchy defined in the spec.
- Unknown values remain explicitly unknown; no fixed HP, damage, exclusive spawn, or recovery guarantee.
- Use TDD: each production behavior is preceded by a failing test and a targeted red run.

---

### Task 1: P0 legacy redirect preservation

**Files:**
- Modify: `tests/how-to-fish-adaptation.test.ts`
- Modify: `next.config.js`

**Interfaces:**
- Consumes: the 24 observed live sitemap paths.
- Produces: `redirects()` entries with HTTP 301 and intent-specific destinations.

- [ ] Add literal redirect expectations for `.html`, `/wiki/*.html`, `/media/`, `/faq.html`, and legal paths.
- [ ] Run the targeted test and confirm the redirect assertion fails because exact mappings are absent.
- [ ] Replace the broad guide collapse with exact legacy mappings plus narrowly scoped fallbacks.
- [ ] Re-run the targeted test and the full redirect test file.

### Task 2: Source registry and canonical inner-page contract

**Files:**
- Create: `tests/p0-p2-content-expansion.test.ts`
- Modify: `content/types.ts`
- Modify: `content/sources.ts`
- Create: `content/inner-pages.ts`
- Modify: `content/pages.ts`
- Modify: `content/site-status.ts`
- Modify: `config/site.ts`

**Interfaces:**
- Produces: `innerPages: GuidePage[]`; `getPageByRoute(route)` resolves all canonical pages.

- [ ] Test the 16 exact child routes, route ownership, unique metadata, four-section minimum, two-source minimum, and 2026-08-27 verification date.
- [ ] Run the test and confirm it fails because `innerPages` and routes do not exist.
- [ ] Register authoritative platform, patch, forum, media, and database sources.
- [ ] Implement the five boss, five fix, and six achievement records with bounded language.
- [ ] Append the records to `seoPages` and re-run the content test.

### Task 3: Dynamic inner-page rendering

**Files:**
- Create: `app/bosses/[slug]/page.tsx`
- Create: `app/fixes/[slug]/page.tsx`
- Create: `app/achievements/[slug]/page.tsx`
- Modify: `tests/p0-p2-content-expansion.test.ts`

**Interfaces:**
- Consumes: `seoPages`, `getPageByRoute`, `guideMetadata`.
- Produces: statically generated canonical child pages with 404 behavior for unknown slugs.

- [ ] Test static params, metadata resolution, and rendered H1/quick-answer output for each page family.
- [ ] Run the test and confirm missing route modules fail.
- [ ] Implement server-component route modules using `generateStaticParams`, `generateMetadata`, `notFound`, and `GuidePageView`.
- [ ] Re-run the targeted test.

### Task 4: P2 Fishipedia cross-source database

**Files:**
- Modify: `content/creatures.ts`
- Modify: `components/guide/CreatureExplorer.tsx`
- Modify: `tests/p0-p2-content-expansion.test.ts`

**Interfaces:**
- Produces: 45 labelled records: 44 cross-checked catches plus Seagull; filterable by type, rod, first area, and evidence.

- [ ] Test the literal 44-name intersection, boss bait mappings, evidence levels, and absence of unsupported total/exclusivity claims.
- [ ] Run the test and confirm the 10-row dataset fails.
- [ ] Replace placeholder records with the cross-checked dataset and add source-reference fields.
- [ ] Add a mini-boss filter and display source notes without introducing new client data fetching.
- [ ] Re-run the data tests.

### Task 5: P2 achievement routing and homepage stuck-state links

**Files:**
- Modify: `content/achievements.ts`
- Modify: `components/wiki/HomePage.tsx`
- Modify: `components/guide/AchievementChecklist.tsx`
- Modify: `tests/homepage-on-page.test.ts`
- Modify: `tests/p0-p2-content-expansion.test.ts`

**Interfaces:**
- Produces: direct canonical links for six difficult achievements and five urgent problem states.

- [ ] Test current Steam completion snapshot values, `relatedGuide` child routes, and direct homepage links.
- [ ] Run tests and confirm old values/generic links fail.
- [ ] Update the dated Steam snapshot and route links.
- [ ] Point homepage problem cards at specific fix/boss pages and keep distinct intent ownership.
- [ ] Re-run targeted tests.

### Task 6: Discovery, verification, and review server

**Files:**
- Modify: `tests/how-to-fish-adaptation.test.ts`
- Modify: `tests/mvp-content.test.ts`
- Modify: `public/llms.txt`
- Modify: `public/llms-full.txt`

**Interfaces:**
- Produces: sitemap and discovery files synchronized to every indexable route.

- [ ] Update sitemap expectations to the literal final canonical route list and confirm the old count test fails.
- [ ] Update discovery files and tests, then re-run the targeted suite.
- [ ] Run `npm.cmd test`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, and `npm.cmd run build`.
- [ ] Start the production server on port 3110 in a hidden persistent process.
- [ ] Check representative new routes return 200 and legacy paths return the exact 301 location.
- [ ] Run headless Playwright checks for desktop/mobile overflow, H1 uniqueness, interactive filter/checklist behavior, and browser console errors.
