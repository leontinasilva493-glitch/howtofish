import type { Achievement } from './types';

const rows: Array<[string, string, number, Achievement['category'], Achievement['difficulty']]> = [
  ['Getting started', 'Kill your first creature', 98.7, 'story', 1],
  ['Drip', 'Kill a drip creature', 96.7, 'collection', 1],
  ['Who stole my beer', 'Find and kill the culprit, and bring it to the lighthouse keeper', 89.9, 'story', 1],
  ['Noob', 'Get a kill with no kill score multiplier', 82.1, 'combat', 1],
  ['Getting an upgrade', 'Upgrade the engine on the boat', 81.7, 'story', 1],
  ['Dinnertime', 'Catch dinner for the lady in the forest', 78.1, 'story', 1],
  ['Let me go', 'Get picked up by a seagull', 77.6, 'challenge', 1],
  ['Impressive', 'Get a 5x killscore multiplier', 74.4, 'combat', 2],
  ['Grillmaster', 'Start the grill', 71.2, 'story', 1],
  ['GOLD GOLD GOLD', 'Unlock a legendary skin from the slot machine', 62.1, 'challenge', 2],
  ['Vacation', 'Help the tourist swim on his vacation', 59.6, 'story', 2],
  ['360 no scope', 'Kill a creature with a 360 no scope', 57.0, 'combat', 2],
  ['I am speed', 'Buy the best engine for the boat', 48.8, 'money', 3],
  ['Fully equipped', 'Apply all attachments to a single weapon', 47.7, 'money', 3],
  ['Yummy in my tummy', 'Eat a burnt creature', 40.0, 'challenge', 2],
  ['Terrorizing bird', 'Defend the scared islanders from the terrorizing bird', 39.7, 'story', 2],
  ['Deadliest catch', 'Help the military defeat the big creature they located', 26.4, 'story', 3],
  ['We are so back', 'Finish the game', 25.7, 'story', 3],
  ['All in', 'Bet on green and win at roulette', 24.9, 'challenge', 3],
  ['Easy', 'Kill a boss within 10 seconds', 17.9, 'combat', 4],
  ["I'm the bird now", 'Make the boat fly', 16.9, 'challenge', 3],
  ['Competitive eating', 'Eat a mini-boss', 16.1, 'challenge', 3],
  ['Collector', 'Find and kill all the creatures', 9.5, 'collection', 5],
  ['Rich! Millionaire', 'Sell something worth 100,000 or more', 8.6, 'money', 4],
  ["Everyone's dream", 'Kill a seagull with dynamite', 3.7, 'challenge', 4],
  ['Handyman', 'Defeat the final boss with your bare hands', 1.3, 'combat', 5],
  ['Fishipedia', 'Find and kill all drip creatures', 1.0, 'collection', 5],
  ['Bean', 'Finish the game within 1 hour', 0.7, 'challenge', 5],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const achievements: Achievement[] = rows.map(([name, officialDescription, steamCompletionRate, category, difficulty]) => ({
  id: slugify(name),
  name,
  officialDescription,
  category,
  unlockMethod: name === 'Handyman'
    ? 'Use the final-boss guide and follow the official bare-hands requirement; community claims about the killing blow remain version-sensitive.'
    : name === 'Bean'
      ? 'Plan a legitimate sub-one-hour route on the current patch. Patch 1.0.5 removed the old skip-any-island bug.'
      : officialDescription,
  recommendedStage: category === 'story' ? 'During the main route' : category === 'collection' ? 'Post-game cleanup' : 'After core upgrades',
  difficulty,
  missable: false,
  versionSensitive: name === 'Bean' || name === 'Handyman' || name === 'Fishipedia',
  steamCompletionRate,
  relatedGuide: name === 'Handyman' ? '/bosses/mutated-bowhead-whale/' : name === 'Bean' ? '/walkthrough/' : undefined,
  verifiedPatch: '1.0.9',
}));
