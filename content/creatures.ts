import { siteStatus } from './site-status';
import type { Creature } from './types';

const crossCheckedSources = ['allThingsFish', 'g2aFishList'];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function regular(name: string, firstAvailableArea: string, lure: string, rod = 'Fishing Rod'): Creature {
  return {
    id: slugify(name),
    name,
    type: 'normal',
    lure,
    rod,
    firstAvailableArea,
    observedAreas: [firstAvailableArea],
    hasDripVariant: true,
    collectorRequired: true,
    fishipediaRequired: true,
    sourceLevel: 'community',
    sourceIds: crossCheckedSources,
    verifiedPatch: siteStatus.verifiedPatch,
    lastVerified: siteStatus.lastChecked,
    notes: 'The area is the first cross-checked progression stage; current lure and Fishipedia state remain the live authority.',
  };
}

function encounter(input: {
  name: string;
  type: 'boss' | 'mini-boss';
  area: string;
  lure: string;
  rod?: string;
  questUse: string;
  importantDrop?: string;
}): Creature {
  return {
    id: slugify(input.name),
    name: input.name,
    type: input.type,
    lure: input.lure,
    rod: input.rod || 'Fishing Rod',
    firstAvailableArea: input.area,
    observedAreas: [input.area],
    questUse: input.questUse,
    importantDrop: input.importantDrop,
    collectorRequired: true,
    sourceLevel: 'community',
    sourceIds: crossCheckedSources,
    verifiedPatch: siteStatus.verifiedPatch,
    lastVerified: siteStatus.lastChecked,
    notes: 'Trigger and progression stage match two current media tables; fight details remain version-sensitive.',
  };
}

export const creatures: Creature[] = [
  regular('Rock Crab', 'Lighthouse', 'Free Lure or Hot Dog', 'Crab Fishing Rod'),
  regular('Shrimp', 'Lighthouse', 'Free Lure', 'Crab Fishing Rod'),
  regular('Lobster', 'Lighthouse', 'Hot Dog', 'Crab Fishing Rod'),

  regular('Piranha', 'Forest', 'Hot Dog', 'Crab Fishing Rod'),
  regular('Mackerel', 'Forest', 'Free Lure'),
  regular('Gar', 'Forest', 'Free Lure'),
  regular('Pike', 'Forest', 'Free Lure or Beginner Lure'),
  regular('Cod', 'Forest', 'Beginner Lure'),
  regular('Goldfish', 'Forest', 'Free Lure or Beginner Lure'),
  regular('Perch', 'Forest', 'Beginner Lure'),
  regular('Triggerfish', 'Forest', 'Beginner Lure'),

  regular('Angelfish', 'Desert', 'Standard Lure'),
  regular('Boxfish', 'Desert', 'Standard Lure'),
  regular('Catfish', 'Desert', 'Standard Lure'),
  regular('Sea Urchin', 'Desert', 'Standard Lure'),
  regular('Seahorse', 'Desert', 'Standard Lure'),
  regular('Clownfish', 'Desert', 'Standard Lure'),
  regular('Bluegill', 'Desert', 'Standard Lure'),
  regular('Salmon', 'Desert', 'Standard Lure'),
  regular('Needlefish', 'Desert', 'Standard Lure'),

  regular('Parrotfish', 'Rocks', 'Professional Lure'),
  regular('Voxelfish', 'Rocks', 'Professional Lure'),
  regular('Bass', 'Rocks', 'Professional Lure'),
  regular('Halibut', 'Rocks', 'Professional Lure'),
  regular('Eel', 'Rocks', 'Professional Lure'),
  regular('Tigerfish', 'Rocks', 'Professional Lure'),
  regular('Flying Fish', 'Rocks', 'Professional Lure'),
  regular('Sengarat', 'Rocks', 'Professional Lure'),
  regular('Red Snapper', 'Rocks', 'Professional Lure'),

  regular('Anglerfish', 'Volcano', 'Scientific Lure'),
  regular('Blobfish', 'Volcano', 'Scientific Lure'),
  regular('Oarfish', 'Volcano', 'Scientific Lure'),
  regular('Superdwarf Fish', 'Volcano', 'Scientific Lure'),
  regular('Stonefish', 'Volcano', 'Scientific Lure'),

  encounter({ name: 'Spider Crab', type: 'boss', area: 'Lighthouse', lure: 'Empty Beer Can', rod: 'Crab Fishing Rod', questUse: 'Opening progression boss', importantDrop: 'Keep the distinct boss item for the Lighthouse hand-in' }),
  encounter({ name: 'Giant Piranha', type: 'boss', area: 'Forest', lure: 'Modified Leech', questUse: 'Forest progression boss', importantDrop: 'Keep the distinct skeleton or quest item for the Forest hand-in' }),
  encounter({ name: 'The Old Pike', type: 'mini-boss', area: 'Forest', lure: 'Beginner Boss Lure', questUse: 'Optional mini-boss and collection encounter' }),
  encounter({ name: 'Blue Shark', type: 'mini-boss', area: 'Desert', lure: 'Standard Boss Lure', questUse: 'Grillmaster route', importantDrop: 'Keep the catch for the Grillmaster interaction' }),
  encounter({ name: 'Pufferfish', type: 'boss', area: 'Desert', lure: 'Carrot', questUse: 'Desert progression boss', importantDrop: 'Keep the distinct fin or quest item for the tourist hand-in' }),
  encounter({ name: 'Tuna', type: 'mini-boss', area: 'Rocks', lure: 'Professional Boss Lure', questUse: 'Albatross trigger', importantDrop: 'Keep the body for the Albatross encounter' }),
  encounter({ name: 'Albatross', type: 'boss', area: 'Rocks', lure: 'Tuna', questUse: 'Rocks progression encounter', importantDrop: 'Keep the head for the local NPC hand-in' }),
  encounter({ name: 'Goblin Shark', type: 'mini-boss', area: 'Volcano', lure: 'Scientific Boss Lure', questUse: 'Optional Volcano mini-boss and collection encounter' }),
  encounter({ name: 'Bowhead Whale', type: 'boss', area: 'Volcano', lure: 'Fish Bucket', questUse: 'Final-island progression boss', importantDrop: 'Keep the Whale body for the volcano sequence' }),
  encounter({ name: 'Mutated Bowhead Whale', type: 'boss', area: 'Volcano', lure: 'Bowhead Whale', questUse: 'Final boss and Handyman target', importantDrop: 'Keep the final quest item for the last hand-in' }),

  {
    id: 'seagull',
    name: 'Seagull',
    type: 'normal',
    observedAreas: ['Multiple island areas shown in official media'],
    questUse: "Let me go and Everyone's dream achievements",
    collectorRequired: true,
    sourceLevel: 'official',
    sourceIds: ['steamAchievements', 'steamMedia'],
    verifiedPatch: siteStatus.verifiedPatch,
    lastVerified: siteStatus.lastChecked,
    notes: 'Official achievements confirm Seagull interactions but do not define a fixed area or bait table.',
  },
];
