# Mobile Experience Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the canonical How to Fish wiki mobile-first, storage-resilient, asset-efficient, and release-gated without changing its evidence or SEO ownership.

**Architecture:** Preserve Server Components and static generation. Isolate browser-only storage in `lib/client-storage.ts`, keep global mobile controls inside the existing client header, and add semantic mobile representations beside desktop tables. Release guarantees live in route tests and one GitHub Actions workflow.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript, Tailwind/global CSS, Radix Dialog/Sheet, Node test runner, OpenNext Cloudflare Workers.

**Spec:** `docs/superpowers/specs/2026-08-29-mobile-experience-remediation.md`

## Global Constraints

- Preserve homepage target `how to fish game guide` and the existing 31 canonical sitemap routes.
- Preserve official, community, version-sensitive, and unconfirmed evidence boundaries.
- Do not add accounts, databases, analytics, deployment, PR, or merge actions.
- Keep `wrangler.jsonc.name`, package name, and `WORKER_SELF_REFERENCE.service` equal to `howtofish`.
- Preserve unrelated user changes and stage only audited files.

---

### Task 1: Release and route regression contracts

**Files:**
- Create: `tests/mobile-experience.test.ts`
- Modify: `tests/how-to-fish-adaptation.test.ts`
- Delete: redirect-owned `app/**/page.tsx` files identified by the route contract

**Interfaces:**
- Consumes: `next.config.js` redirect entries and the filesystem `app` routes.
- Produces: a test that rejects redirect-owned filesystem pages and validates canonical mobile component markup.

- [ ] Write a failing test proving redirect-owned pages still coexist with 301 sources.
- [ ] Run `npm.cmd test -- tests/mobile-experience.test.ts` and confirm the expected failure.
- [ ] Remove only redirect-owned App Router pages; keep redirect rules and canonical pages.
- [ ] Re-run the targeted test and the full suite.

### Task 2: Accessible responsive header

**Files:**
- Modify: `components/wiki/SiteHeader.tsx`
- Modify: `components/wiki/WikiSearchDialog.tsx`
- Modify: `components/wiki/ThemeToggle.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-experience.test.ts`

**Interfaces:**
- Consumes: canonical navigation links, `Sheet`, `WikiSearchDialog`, and `ThemeToggle`.
- Produces: desktop utilities plus a viewport-bounded mobile sheet with focus/Escape/outside-click behavior.

- [ ] Add a failing rendered-markup test for search/theme controls and canonical mobile navigation.
- [ ] Verify RED with the targeted test.
- [ ] Replace the inline 531px mobile navigation with a Radix sheet and add labelled utility controls.
- [ ] Verify GREEN and manually exercise portrait/landscape open, close, and navigation behavior.

### Task 3: Mobile data presentation and long-page navigation

**Files:**
- Modify: `components/guide/CreatureExplorer.tsx`
- Modify: `components/guide/AchievementChecklist.tsx`
- Modify: `components/guide/EditorialBlocks.tsx`
- Modify: `components/guide/IssueStatusTable.tsx`
- Modify: `components/guide/GuidePage.tsx`
- Modify: `components/guide/WalkthroughPage.tsx`
- Modify: `components/guide/FishDatabasePage.tsx`
- Modify: `app/globals.css`
- Test: `tests/mobile-experience.test.ts`

**Interfaces:**
- Produces: `MobilePageNav`, mobile creature details/cards, labelled responsive editorial/issue rows, result counts, and empty states.

- [ ] Add failing render tests for mobile navigation, result messaging, and labelled mobile data structures.
- [ ] Verify RED.
- [ ] Implement semantic mobile data views and 44px controls; retain desktop tables.
- [ ] Add 16px mobile form controls, one-column media gallery, and contrast-safe muted tokens.
- [ ] Verify GREEN and visually inspect all affected routes.

### Task 4: Resilient local progress and portable backups

**Files:**
- Create: `lib/client-storage.ts`
- Create: `components/guide/ProgressBackup.tsx`
- Modify: `components/guide/CreatureExplorer.tsx`
- Modify: `components/guide/AchievementChecklist.tsx`
- Modify: `components/wiki/ThemeToggle.tsx`
- Test: `tests/client-storage.test.ts`

**Interfaces:**
- Produces: `readStoredIds`, `writeStoredIds`, `removeStoredIds`, `encodeProgressBackup`, and `decodeProgressBackup` with explicit success results.

- [ ] Write failing tests for unavailable storage, invalid JSON, invalid IDs, backup version mismatch, and valid round-trip restore.
- [ ] Verify RED.
- [ ] Implement the minimal safe-storage and backup functions.
- [ ] Verify GREEN.
- [ ] Wire session-only fallback, status copy, reset, export, and restore into both trackers.
- [ ] Re-run component and full tests.

### Task 5: Mobile image and cache delivery

**Files:**
- Create: `public/assets/how-to-fish/steam-*.webp` optimized derivatives
- Modify: `content/pages.ts`
- Modify: `next.config.js`
- Modify: `app/globals.css`
- Test: `tests/mobile-experience.test.ts`

**Interfaces:**
- Produces: active 1280px WebP screenshot paths and `/assets/:path*` cache headers.

- [ ] Add failing tests that active official screenshots use WebP assets below the agreed size ceiling and that asset caching is configured.
- [ ] Verify RED.
- [ ] Generate the WebP derivatives and update active content references.
- [ ] Add bounded browser cache and stale-while-revalidate headers.
- [ ] Verify GREEN and compare rendered/natural dimensions in production preview.

### Task 6: CI and non-offline product boundary

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `public/assets/site.webmanifest`
- Modify: `app/privacy-policy/page.tsx`
- Test: `tests/mobile-experience.test.ts`

**Interfaces:**
- Produces: a GitHub CI gate for tests/type/lint/Next/OpenNext and a browser-mode manifest with explicit local-only progress copy.

- [ ] Add failing tests for CI commands, public URL enforcement, and the browser display mode.
- [ ] Verify RED.
- [ ] Add the workflow and update the manifest/privacy explanation.
- [ ] Verify GREEN.

### Task 7: Full verification, commit, and push

**Files:** all files changed above, staged by explicit allowlist.

- [ ] Run `npm.cmd test`.
- [ ] Run `npx.cmd tsc --noEmit` and `npm.cmd run lint`.
- [ ] Run `NEXT_PUBLIC_SITE_URL=https://howtofish.wiki REQUIRE_PUBLIC_SITE_URL=true npm.cmd run build`.
- [ ] Run `npm.cmd run cf:build` and confirm `.open-next/worker.js` exists.
- [ ] Start a production preview and complete mobile browser checks at all four viewports.
- [ ] Audit `git diff`, `git diff --check`, secrets, staged files, and staged diff.
- [ ] Create conventional commits for mobile behavior and release gates.
- [ ] Push `codex/skiils`, verify local SHA equals `origin/codex/skiils`, and report the GitHub URLs without creating a PR or deploying.
