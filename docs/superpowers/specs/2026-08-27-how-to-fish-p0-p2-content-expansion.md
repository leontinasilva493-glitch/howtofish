# How to Fish P0-P2 Content Expansion Design

## Goal

Turn the current evidence-labelled 15-page guide into a launch-week player-help system without copying unverified competitor data. Preserve the existing reef-dark design, keep every factual claim source-bounded, and make each search intent own one canonical route.

## Approved scope

The user approved the previously proposed P0-P2 sequence on 2026-08-27:

1. P0: preserve the live site's legacy URL intent with exact HTTP 301 redirects.
2. P1: add five boss pages and five troubleshooting pages.
3. P2: expand the Fishipedia database, add six difficult-achievement pages, and improve the homepage stuck-state router.
4. Finish with tests, TypeScript, lint, production build, HTTP checks, browser checks, and persistent local review URLs.

No deployment, push, PR, or merge is authorized.

## Evidence rules

- Official Steam store, Steam achievements, and Dazed Games patch notes define identity, patch status, difficulty modifiers, lobby support, and exact achievement wording.
- Steam discussions establish reported symptoms and possible community steps, never guaranteed fixes.
- PC Gamer and Destructoid supply attributed first-hand route observations.
- G2A and AllThings.How independently publish the same 34 regular catches and 10 bosses/mini-bosses. Their intersection may enter the database as `community` evidence; it is not promoted to `verified-in-game`.
- Competitor sites may reveal search intent and useful information architecture, but are not sufficient evidence for gameplay facts.
- Exact HP, damage, spawn exclusivity, recovery guarantees, and universal loadouts remain unpublished unless official or independently verified in-game.

## Source matrix

| Topic | Primary authority | Cross-check | Allowed conclusion |
| --- | --- | --- | --- |
| Patch 1.0.4 | Dazed Games notes via SteamDB | Steam reports | Up to 8-player lobby support; Pufferfish/Whale nerfs; join black-screen fix was cautiously worded |
| Patch 1.0.5 | Dazed Games notes via SteamDB | Steam achievements/discussions | Old skip-any-island route closed; Fishipedia unlock condition fixed |
| Patch 1.0.9 | Dazed Games notes via SteamDB | Steam reports | Difficulty modifiers, Steam Relay diagnostic, attempted save-corruption fix |
| Spider Crab | PC Gamer | Destructoid, Steam achievement | Empty Beer Can route, missed-charge punish window, quest hand-in for boat access |
| Giant Piranha | Destructoid | Steam guide/discussion, AllThings.How | Three-leeches quest, Modified Leech, add pressure, required hand-in |
| Pufferfish | PC Gamer | Destructoid, Patch 1.0.4 | Endangered-fish exchange, Carrot trigger, keep moving; no fixed HP claim |
| Albatross | Destructoid | AllThings.How, Steam achievement | Tuna trigger, ranged/cover approach, required head hand-in |
| Bowhead Whale | Destructoid | AllThings.How, Patch 1.0.4 | Fish Bucket trigger, keep body for volcano sequence; no fixed HP claim |
| Leeches | Steam discussion | Destructoid, AllThings.How | Three ground pickups after quest dialogue; reload is community-only if missing |
| Missing Radar | Steam discussion | Destructoid | Replacement is reported on later-island shop boards; preserve save first |
| Multiplayer black screen | Patch 1.0.4/1.0.9 | Steam discussion | Align versions, recreate lobby, inspect Steam Relay; fix is not guaranteed |
| Save/autosave | Patch 1.0.9 | Developer Steam reply, player reports | Inventory/ground distinction and attempted corruption fix; no recovery promise |
| Error 0x11C7 | Microsoft Support | How to Fish Steam report | Diagnose Smart App Control/App Control; update/verify/report before changing protection |
| Fish database | G2A full table | AllThings.How full table | Publish their 44-record intersection as community cross-checked data |
| Achievements | Steam global achievements | Patch notes and version-labelled community guide | Exact names/descriptions; tactics remain version-sensitive |

## Canonical route ownership

- `/islands/[area]/`: progression order, local quests, and navigation.
- `/bosses/[boss]/`: trigger, preparation, fight loop, hand-in, and boss-specific troubleshooting.
- `/fixes/[issue]/`: symptom-led, reversible diagnostic steps and escalation.
- `/achievements/[achievement]/`: the literal official requirement and a patch-aware attempt plan.
- `/fish/`: searchable cross-checked database and local completion state. No individual fish pages in this phase because the records are not independently verified in-game.

## New routes

Bosses: Spider Crab, Giant Piranha, Pufferfish, Albatross, Bowhead Whale.

Fixes: Leeches Not Spawning, Missing Radar, Multiplayer Black Screen, Save & Autosave, Error 0x11C7.

Achievements: Bean, Fishipedia, Rich! Millionaire, 360 No Scope, Handyman, Everyone's Dream.

## UI approach

Reuse `GuidePageView`, `GuideHeader`, evidence badges, FAQ, related chips, and source lines. Add no new visual system. The homepage stuck-state cards become direct links to the most urgent child pages. Fishipedia retains localStorage-only progress and gains cross-checked lure/rod/area coverage.

## Acceptance criteria

- Every legacy live URL maps to the closest canonical intent with HTTP 301.
- Every new page has a unique title, description, H1, quick answer, at least four content sections, at least two resolvable sources, FAQs, update log, and related links.
- No new page claims fixed HP, guaranteed recovery, exclusive spawn areas, or a universal best loadout.
- The sitemap includes all indexable canonical routes and no legacy routes.
- Fishipedia contains exactly the 44-record cross-source intersection plus the separately labelled Seagull achievement entity; unsupported placeholder entities are removed.
- All 28 achievements stay in the tracker, while six difficult intents receive canonical child pages.
- The site builds and key routes return HTTP 200 locally; legacy routes return the intended 301 target.
