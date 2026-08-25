# Reef Dark v2 Front-End Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the active How to Fish MVP front end to match the authoritative reef-dark v2 design system and the four PDF core-page references.

**Architecture:** Keep the existing Next.js App Router, typed content registry, metadata, and route behavior. Add a focused visual-primitives layer, use custom page compositions for Home, Walkthrough, Mutated Bowhead Whale, and Fish, and let the remaining routes reuse a simplified shared guide template.

**Tech Stack:** Next.js 13 App Router, React 18, TypeScript 5, Tailwind CSS, CSS custom properties, next/font Fredoka and Inter, Pillow-converted WebP assets, Node test runner, Tabbit Browser.

**Spec:** `../HowToFish-设计系统规范.md` (authoritative) and `../How to Fish 攻略站 — 设计系统与核心页面.pdf` (visual reference)

## Global Constraints

- Use reef-dark v2 tokens exactly; retain legacy theme variables only for compatibility.
- Content width is 1200px; section padding is 64px desktop and 40px/20px mobile.
- Cards use 1px borders, 14px radius, no shadow, and a 2px hover lift.
- Fredoka weights are Medium, SemiBold, and Bold; body copy remains Inter.
- Amber is the only primary action color; coral is reserved for Boss and warnings; teal is verified/progress; sky is Official/information.
- Every guide keeps breadcrumb, verification badges, Quick Answer, Last Updated, Verified Patch, and a compact source line.
- Do not use Steam screenshots. Project imagery must be AI-generated WebP without text, logos, or watermarks.
- Preserve all evidence and SEO constraints from the existing MVP tests.
- The directory is not a Git repository, so no commit step is available.

---

### Task 1: Design tokens, imagery, and visual primitives

**Files:**
- Create: `components/guide/DesignSystem.tsx`
- Create: `public/assets/how-to-fish/hero-island-v2.webp`
- Create: `public/assets/how-to-fish/mutated-whale-v2.webp`
- Create: `public/assets/how-to-fish/guide-fishing-v2.webp`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `config/site.ts`
- Modify: `content/pages.ts`
- Test: `tests/design-system-v2.test.ts`

**Interfaces:**
- Produces: `VerificationBadge`, `IssueStatusTag`, `QuickAnswer`, `KeyFacts`, `GuideCallout`, `ProgressBar`, `FaqAccordion`, and `SourceLine`.

- [ ] Write a failing static contract test for exact v2 variables, 1200px width, no active card shadows, Fredoka 500/600/700, reusable primitives, WebP references, and no active Steam image references.
- [ ] Run `node --import tsx --test tests/design-system-v2.test.ts` and confirm the old design fails.
- [ ] Convert the three generated PNGs to quality-88 WebP and copy them into `public/assets/how-to-fish/`.
- [ ] Implement the visual primitives and v2 token aliases.
- [ ] Update font weights, metadata image, and all active page image references.
- [ ] Run the targeted test and confirm it passes.

### Task 2: Global shell and home dashboard

**Files:**
- Rewrite: `components/wiki/SiteHeader.tsx`
- Rewrite: `components/wiki/SiteFooter.tsx`
- Rewrite: `components/wiki/HomePage.tsx`
- Create: `components/guide/CreaturePreview.tsx`
- Modify: `app/globals.css`
- Test: `tests/design-system-v2.test.ts`

**Interfaces:**
- Consumes: route registry, creatures, new visual primitives, AI hero WebP.
- Produces: active-route header, compact footer, and exact PDF-section home dashboard.

- [ ] Extend the failing test with exact header identity, home section order, five quick-start steps, fish preview, six status-labelled problem cards, and absence of superseded home sections.
- [ ] Implement the flat 1200px header/footer and compact home composition.
- [ ] Implement functional home creature search/type chips with a four-column preview table.
- [ ] Run the targeted and existing MVP tests.

### Task 3: Core page compositions

**Files:**
- Create: `components/guide/WalkthroughPage.tsx`
- Create: `components/guide/BossFeaturePage.tsx`
- Create: `components/guide/FishDatabasePage.tsx`
- Rewrite: `components/guide/CreatureExplorer.tsx`
- Modify: `app/walkthrough/page.tsx`
- Modify: `app/bosses/mutated-bowhead-whale/page.tsx`
- Modify: `app/fish/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/design-system-v2.test.ts`

**Interfaces:**
- Consumes: `GuidePage`, `creatures`, visual primitives, AI Boss/article WebPs.
- Produces: five-card walkthrough, full-width Boss feature page, and database-first Fish page with local progress.

- [ ] Extend the failing test for five chapter cards with a coral final chapter, five Boss facts, three summon steps, Handyman warning, dual Fish progress, filter chips, and accuracy callout.
- [ ] Implement all three custom page compositions without duplicating metadata/schema logic.
- [ ] Persist Collector/Fishipedia progress under `how-to-fish-creatures-v2` and keep filters client-only.
- [ ] Run targeted tests and the complete test suite.

### Task 4: Shared guide template, responsive QA, build, and review links

**Files:**
- Rewrite: `components/guide/GuidePage.tsx`
- Modify: `components/guide/AchievementChecklist.tsx`
- Modify: `components/guide/IssueStatusTable.tsx`
- Modify: `components/guide/IslandProgression.tsx`
- Modify: `components/guide/IslandGuidePage.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: the unified 02-style guide template across all remaining MVP routes.

- [ ] Simplify the generic template to one 1200px content column with compact sources and no sticky sidebar or rotated media.
- [ ] Apply v2 progress, table, badge, callout, and mobile behaviors to Achievements, Fixes, Islands, Bosses, Tips, and Multiplayer.
- [ ] Run `npm.cmd test` and `npm.cmd run build` and require exit code zero.
- [ ] Start the production build on a free local port and use Tabbit to verify desktop 1440px, tablet 1024px, and mobile 390px on Home, Walkthrough, final Boss, Fish, Achievements, and Fixes.
- [ ] Verify no horizontal overflow, no console errors, localStorage persistence, filter behavior, active navigation, and redirects.
- [ ] Keep the local server running and list every review URL in the final response.
