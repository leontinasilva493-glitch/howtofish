# Mobile Experience Remediation Design

## Context

The current Next.js 15/OpenNext wiki is readable on mobile and has no page-level overflow on its canonical routes, but several interaction and release contracts still reflect a desktop-first implementation. The approved audit identified short-screen navigation, dense tables, undersized controls, oversized source imagery, fragile browser storage, long-page navigation, route duplication, and missing CI release enforcement.

## Goals

- Keep the existing reef-dark identity, homepage query ownership, evidence labels, and canonical route set.
- Make navigation usable at 320px portrait and short landscape viewports.
- Make Fish, achievement, issue, evidence, and failure data usable without precision tapping or mandatory horizontal scrolling.
- Prevent iOS form zoom, improve muted-text contrast, and expose clear empty and storage-failure states.
- Reduce the bytes used by official screenshot assets without weakening provenance.
- Keep progress private and local while allowing reset and portable text backups.
- Remove filesystem pages that are permanently owned by redirects and enforce the canonical route contract in CI.
- Preserve the OpenNext Workers identity and do not deploy, merge, or create a PR.

## Interaction design

The global header keeps the compact HTF WIKI logo. Desktop gains visible search and theme controls. Mobile uses an accessible Radix sheet with its own viewport-bounded scroll area, search and theme controls, canonical navigation, and Steam CTA. The sheet owns Escape, outside-click, scroll locking, and focus restoration.

Long canonical guides gain a mobile-only `On this page` disclosure generated from authored section IDs. Data tables use semantic tables on wider screens and compact labelled cards/details on mobile. Touch targets are at least 44px; mobile form controls render at 16px.

## State and error handling

Achievement and creature progress continues to use versioned localStorage keys. Reads, writes, and deletes go through a small safe-storage boundary that returns success/failure. UI state still updates when storage is unavailable and explains that the change is session-only. Each tracker offers reset plus a portable JSON text backup/restore flow; malformed or foreign backups are rejected without overwriting current progress.

## Performance and deployment

Official 1920px JPEG screenshots are converted to 1280px WebP delivery assets and referenced by active content. Next remains `unoptimized` for OpenNext compatibility, so asset selection is explicit. Public assets receive bounded browser caching and stale-while-revalidate headers. CI supplies a non-local public site URL, runs tests, type checking, lint, Next build, and the OpenNext adapter build.

## Verification

- Automated unit/render/route tests follow RED-GREEN cycles.
- `npm.cmd test`, `npx.cmd tsc --noEmit`, `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd run cf:build` must pass.
- Production preview is checked at 320x568, 360x800, 390x844, and 844x390.
- Canonical routes must return 200 with one H1 and no page-level horizontal overflow.
- Legacy routes must retain the intended 301 destination without a same-path App Router page.
- No commit is pushed until staged diff, secret scan, and remote branch state are verified.
