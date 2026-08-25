# How to Fish MVP Design

## Outcome

Turn the existing Next.js game-wiki template into an evidence-labelled English guide and wiki for Dazed Games' *How to Fish*. The site should be ready for a fast launch without publishing invented fish totals, absolute spawn claims, guaranteed save recovery, or outdated multiplayer and achievement advice.

## Information architecture

The homepage owns the broad `how to fish game guide` and `how to fish game wiki` intent. Fifteen canonical SEO routes cover walkthrough, island progression, five island guides, bosses, the final boss, achievements, creatures, tips, multiplayer, and fixes. The legacy `/wiki`, `/guides`, `/gear`, `/gambling`, calculator, checklist, maps, updates, and entity routes redirect to the closest canonical route.

Four non-acquisition pages provide about, contact, privacy, and terms content. They are available to users but excluded from the SEO sitemap.

## Content and evidence model

Page data lives in focused TypeScript content modules. Every page has a unique title, description, H1, answer-first summary, last-updated date, verified patch, content status, sections, related routes, sources, and update log. Claims use `official`, `verified-in-game`, `community`, or `unconfirmed` evidence labels.

Official facts confirmed on 2026-08-25 include the Dazed Games identity, 2026-08-20 release, intended 1–4 player positioning, 28 Steam achievements, the official gameplay loop, Patch 1.0.4 support for up to eight-player lobbies, Patch 1.0.5 island-unlock and Fishipedia fixes, and Patch 1.0.9 difficulty/Relay diagnostics plus an attempted save-corruption fix. Community route details remain visibly version-sensitive.

## Page system

`GuidePage` renders the shared breadcrumb, status badges, Quick Answer, optional official screenshot, key facts, table of contents, structured sections, FAQ, related guides, sources, and update log. `IslandGuidePage` reuses that shell with previous/next progression links. Hub pages may insert purpose-built tables or interactive modules before the shared evidence footer.

The homepage is a compact stuck-state dashboard: current status, six problem entrances, featured guides, quick-start loop, island route, wiki categories, boss summary, fish/achievement previews, real player problems, FAQ, recent updates, and verification method.

## Interactive behavior

The achievement page includes a browser-local checklist keyed by achievement ID. The fish page provides client-side text, lure, rod, area, type, Drip, and missing-only filters; URL parameters never change the canonical URL. Tables scroll horizontally on narrow screens.

## Visual direction

Use an expedition field-log aesthetic over the existing reef-dark palette: deep ocean blue, buoy yellow, coral alerts, sonar-grid lines, rounded chart cards, and Fredoka display type. Official Steam screenshots are locally stored, credited in captions, and never described as in-game verification. The legacy tactical icon is removed from active metadata and replaced with a simple fish-hook SVG mark.

## SEO and schema

All canonical routes use trailing slashes. The sitemap contains the fifteen acquisition routes only. The home page emits WebSite, VideoGame, and BreadcrumbList schemas. Guide pages emit Article and BreadcrumbList; achievements and fish add ItemList. FAQPage is emitted only when the rendered page includes visible FAQ content.

## Verification

Automated tests enforce the route set, unique metadata/H1, source and freshness contracts, sensitive-claim wording, 28-achievement completeness, non-absolute creature fields, legacy redirects, and sitemap membership. `npm test` and `npm run build` must pass. Tabbit browser checks desktop and mobile rendering, navigation, search, filters, checklist persistence, canonical tags, structured data, and console errors.
