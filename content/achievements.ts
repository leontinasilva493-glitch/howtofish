import type { Achievement } from './types';
import { siteStatus } from './site-status';

const rows: Array<[string, string, number, Achievement['category'], Achievement['difficulty']]> = [
  ['Getting started', 'Kill your first creature', 98.7, 'story', 1],
  ['Drip', 'Kill a drip creature', 96.7, 'collection', 1],
  ['Who stole my beer', 'Find and kill the culprit, and bring it to the lighthouse keeper', 90.8, 'story', 1],
  ['Noob', 'Get a kill with no kill score multiplier', 84.1, 'combat', 1],
  ['Getting an upgrade', 'Upgrade the engine on the boat', 84.5, 'story', 1],
  ['Dinnertime', 'Catch dinner for the lady in the forest', 80.9, 'story', 1],
  ['Let me go', 'Get picked up by a seagull', 80.2, 'challenge', 1],
  ['Impressive', 'Get a 5x killscore multiplier', 78.3, 'combat', 2],
  ['Grillmaster', 'Start the grill', 76.6, 'story', 1],
  ['GOLD GOLD GOLD', 'Unlock a legendary skin from the slot machine', 65.3, 'challenge', 2],
  ['Vacation', 'Help the tourist swim on his vacation', 66.1, 'story', 2],
  ['360 no scope', 'Kill a creature with a 360 no scope', 60.7, 'combat', 2],
  ['I am speed', 'Buy the best engine for the boat', 56.5, 'money', 3],
  ['Fully equipped', 'Apply all attachments to a single weapon', 53.6, 'money', 3],
  ['Yummy in my tummy', 'Eat a burnt creature', 44.7, 'challenge', 2],
  ['Terrorizing bird', 'Defend the scared islanders from the terrorizing bird', 48.4, 'story', 2],
  ['Deadliest catch', 'Help the military defeat the big creature they located', 34.7, 'story', 3],
  ['We are so back', 'Finish the game', 33.6, 'story', 3],
  ['All in', 'Bet on green and win at roulette', 32.8, 'challenge', 3],
  ['Easy', 'Kill a boss within 10 seconds', 26.4, 'combat', 4],
  ["I'm the bird now", 'Make the boat fly', 22.1, 'challenge', 3],
  ['Competitive eating', 'Eat a mini-boss', 19.6, 'challenge', 3],
  ['Collector', 'Find and kill all the creatures', 13.2, 'collection', 5],
  ['Rich! Millionaire', 'Sell something worth 100,000 or more', 13.4, 'money', 4],
  ["Everyone's dream", 'Kill a seagull with dynamite', 5.1, 'challenge', 4],
  ['Handyman', 'Defeat the final boss with your bare hands', 2.4, 'combat', 5],
  ['Fishipedia', 'Find and kill all drip creatures', 2.0, 'collection', 5],
  ['Bean', 'Finish the game within 1 hour', 1.6, 'challenge', 5],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const guideRoutes: Partial<Record<string, string>> = {
  '360 no scope': '/achievements/360-no-scope/',
  "I'm the bird now": '/achievements/im-the-bird-now/',
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
  verifiedPatch: siteStatus.verifiedPatch,
}));
