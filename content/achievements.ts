import type { Achievement } from './types';

const rows: Array<[string, string, number, Achievement['category'], Achievement['difficulty']]> = [
  ['Getting started', 'Kill your first creature', 98.8, 'story', 1],
  ['Drip', 'Kill a drip creature', 96.8, 'collection', 1],
  ['Who stole my beer', 'Find and kill the culprit, and bring it to the lighthouse keeper', 90.5, 'story', 1],
  ['Noob', 'Get a kill with no kill score multiplier', 83.5, 'combat', 1],
  ['Getting an upgrade', 'Upgrade the engine on the boat', 83.6, 'story', 1],
  ['Dinnertime', 'Catch dinner for the lady in the forest', 80.1, 'story', 1],
  ['Let me go', 'Get picked up by a seagull', 79.3, 'challenge', 1],
  ['Impressive', 'Get a 5x killscore multiplier', 77.1, 'combat', 2],
  ['Grillmaster', 'Start the grill', 74.9, 'story', 1],
  ['GOLD GOLD GOLD', 'Unlock a legendary skin from the slot machine', 64.3, 'challenge', 2],
  ['Vacation', 'Help the tourist swim on his vacation', 64.1, 'story', 2],
  ['360 no scope', 'Kill a creature with a 360 no scope', 59.4, 'combat', 2],
  ['I am speed', 'Buy the best engine for the boat', 53.9, 'money', 3],
  ['Fully equipped', 'Apply all attachments to a single weapon', 51.7, 'money', 3],
  ['Yummy in my tummy', 'Eat a burnt creature', 43.2, 'challenge', 2],
  ['Terrorizing bird', 'Defend the scared islanders from the terrorizing bird', 45.6, 'story', 2],
  ['Deadliest catch', 'Help the military defeat the big creature they located', 32.0, 'story', 3],
  ['We are so back', 'Finish the game', 31.0, 'story', 3],
  ['All in', 'Bet on green and win at roulette', 30.3, 'challenge', 3],
  ['Easy', 'Kill a boss within 10 seconds', 23.5, 'combat', 4],
  ["I'm the bird now", 'Make the boat fly', 20.2, 'challenge', 3],
  ['Competitive eating', 'Eat a mini-boss', 18.4, 'challenge', 3],
  ['Collector', 'Find and kill all the creatures', 12.0, 'collection', 5],
  ['Rich! Millionaire', 'Sell something worth 100,000 or more', 11.8, 'money', 4],
  ["Everyone's dream", 'Kill a seagull with dynamite', 4.6, 'challenge', 4],
  ['Handyman', 'Defeat the final boss with your bare hands', 2.0, 'combat', 5],
  ['Fishipedia', 'Find and kill all drip creatures', 1.7, 'collection', 5],
  ['Bean', 'Finish the game within 1 hour', 1.3, 'challenge', 5],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const guideRoutes: Partial<Record<string, string>> = {
  '360 no scope': '/achievements/360-no-scope/',
  'Rich! Millionaire': '/achievements/rich-millionaire/',
  "Everyone's dream": '/achievements/everyones-dream/',
  Handyman: '/achievements/handyman/',
  Fishipedia: '/achievements/fishipedia/',
  Bean: '/achievements/bean/',
};

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
  relatedGuide: guideRoutes[name],
  verifiedPatch: '1.0.9',
}));
