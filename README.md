# How to Fish Wiki

An unofficial, evidence-labelled fan wiki template for the Steam game How to Fish by Dazed Games.

## Local development

```powershell
npm.cmd ci
npm.cmd run dev
```

For a production preview:

```powershell
npm.cmd run build
npm.cmd run start -- -p 3110
```

The default local URL is `http://localhost:3110`. Set `NEXT_PUBLIC_SITE_URL` before a public build so canonical URLs, Open Graph URLs, and the sitemap use the deployed origin.

## Main routes

- `/` — homepage and castaway-to-captain journey
- `/wiki` — category directory
- `/guides` — six answer-first launch guides
- `/fish` — evidence-gated fish index
- `/gear` — gear and upgrade path
- `/islands` — island progression and boss gates
- `/entities/bosses` — boss documentation boundary
- `/gambling` — trick shots, fish betting, and no-real-money notice
- `/updates` — patch notes and evidence log
- `/community` — verified Steam and Discord destinations
- `/tools` — tools directory
- `/calculator` — fish earnings calculator
- `/checklist` — local departure checklist

Legacy URLs `/codes`, `/maps`, `/entities/verity`, and `/weapons` issue HTTP 301 redirects to their semantic replacements.

## Template architecture

- Site identity, official links, evidence date, SEO keywords, and theme live in `config/site.ts`.
- The homepage uses an ordered list of evidence-gated modules; empty collections can be omitted.
- Public guides use the answer-first contract in `components/wiki/data.ts`: `quickAnswer`, sections, sources, a community evidence note, and fast routes.
- `reef-dark` is the default theme and `editorial-light` is the reader-selectable alternative.
- Images intentionally remain styled placeholders. Replace them with licensed or generated WebP assets and keep descriptive alt text.
- The checklist stores versioned completed-item IDs in local storage only.

## Verification

```powershell
npm.cmd test
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
```

This site is not affiliated with Dazed Games or Valve Corporation. Do not present unverified fish names, sale values, island details, boss stats, or upgrade costs as facts.
