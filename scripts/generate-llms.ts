import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { seoPages } from '../content/pages';
import { siteStatus } from '../content/site-status';

const routeLabels: Record<string, string> = {
  '/': 'Home guide hub',
  '/walkthrough/': 'Full walkthrough',
  '/islands/': 'Island order',
  '/islands/lighthouse/': 'Lighthouse',
  '/islands/forest/': 'Forest',
  '/islands/desert/': 'Desert',
  '/islands/rocks/': 'Rocks',
  '/islands/volcano/': 'Volcano',
  '/bosses/': 'All bosses',
  '/bosses/mutated-bowhead-whale/': 'Mutated Bowhead Whale',
  '/achievements/': 'All 28 achievements',
  '/fish/': 'Fish, rods, bait, and lures',
  '/tips/': 'Hidden mechanics',
  '/multiplayer/': 'Multiplayer',
  '/fixes/': 'Save and launch fixes',
};

const canonicalRoutes = seoPages
  .filter((page) => page.indexable)
  .map((page) => `- ${routeLabels[page.route] ?? page.h1}: ${page.route}`)
  .join('\n');

const documents = {
  'llms.txt': `# How to Fish Game Guide & Wiki

Unofficial, evidence-labelled guide for Dazed Games' How to Fish on Steam. Current verification baseline: Patch ${siteStatus.verifiedPatch}, checked ${siteStatus.lastChecked}.

## Canonical routes

${canonicalRoutes}

## Evidence boundary

Official facts come from the Steam store, achievements, and Dazed Games patch notes. Community routes and workarounds remain labelled. The site does not claim a total creature count, exclusive island spawns, guaranteed save recovery, or a native eight-player design.
`,
  'llms-full.txt': `# How to Fish Game Guide & Wiki — full content map

This is an unofficial English guide/wiki for the Steam game How to Fish by Dazed Games. It is designed around answer-first player tasks and evidence strength. Current verification baseline: Patch ${siteStatus.verifiedPatch}, checked ${siteStatus.lastChecked}.

## Progression

- \`/walkthrough/\` owns the full Lighthouse → Forest → Desert → Rocks → Volcano route.
- \`/islands/\` owns area counting, unlock order, Radar routing, and links to five independent area guides.
- \`/bosses/\` owns the encounter table, triggers, difficulty, and spawn troubleshooting.
- \`/bosses/mutated-bowhead-whale/\` owns the final boss, post-fight hand-in, and Handyman requirement.

## Completion and systems

- \`/achievements/\` lists all 28 official Steam achievements and provides a browser-local checklist.
- \`/fish/\` is an evidence-labelled creature database. It separates lure, rod, first available area, and observed areas.
- \`/tips/\` explains active reeling, Radar, lure/rod/area distinctions, quest items, Killscore, cooking, Drip creatures, and progression traps.

## Support

- \`/multiplayer/\` distinguishes the official 1–4 player design from Patch 1.0.4 support for lobbies up to eight and includes Steam Relay diagnostics.
- \`/fixes/\` treats Patch 1.0.9 as an attempted save-corruption fix, not a guarantee, and separates official status from community reports.

## Current official baseline

- Steam release: 2026-08-20.
- Steam achievements: 28.
- Patch 1.0.4: up to eight-player lobby support and attempted join-black-screen fix.
- Patch 1.0.5: closed travel to locked islands and fixed the Fishipedia extra-Drip condition.
- Patch 1.0.9: Easy/Hard difficulty, Steam Relay diagnostic, and cautiously worded save-corruption work.
`,
};

const checkOnly = process.argv.includes('--check');
async function main() {
  let hasMismatch = false;

  for (const [filename, content] of Object.entries(documents)) {
    const target = resolve('public', filename);
    if (checkOnly) {
      const current = await readFile(target, 'utf8').catch(() => '');
      if (current !== content) {
        console.error(`${filename} is out of sync with content/site-status.ts`);
        hasMismatch = true;
      }
    } else {
      await writeFile(target, content, 'utf8');
      console.log(`Generated public/${filename}`);
    }
  }

  if (hasMismatch) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
