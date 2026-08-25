import { siteConfig } from '@/config/site';
import type { HomeSectionId, SearchEntry } from '@/lib/wiki-template';

export type ContentSource = { title: string; publisher: string; url: string; accessed: string; note: string };
export type GuideSection = { id: string; title: string; paragraphs: string[]; steps?: string[] };
export type Guide = {
  slug: string;
  category: string;
  title: string;
  description: string;
  quickAnswer: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  sections: GuideSection[];
  sources: ContentSource[];
  fastRoutes: Array<{ label: string; href: string }>;
  communityNote?: string;
  isNew?: boolean;
};

const sharedSources: ContentSource[] = [
  {
    title: 'How to Fish on Steam',
    publisher: 'Dazed Games / Steam',
    url: siteConfig.links.game,
    accessed: siteConfig.evidenceDate,
    note: 'Official game identity, release date, supported features, player count, and gameplay overview.',
  },
  {
    title: 'How to Fish Wiki update log',
    publisher: siteConfig.name,
    url: '/updates',
    accessed: siteConfig.evidenceDate,
    note: 'Tracks confirmed changes and keeps incomplete fish, gear, island, and boss details labelled.',
  },
];

const guideImage = '/assets/android-chrome-512x512.png';
const communityNote = 'Specific fish names, sale values, boss stats, and upgrade costs are still being documented. Treat any unconfirmed values as unresolved until they appear in the update log.';

export const beginnerGuide: Guide = {
  slug: 'beginner-guide',
  category: 'BEGINNER',
  title: 'Beginner Guide: From Crash to First Catch',
  description: 'The physics cast, your first sale, and the upgrade to buy first — a no-waste opening route.',
  quickAnswer: 'Start by learning one reliable cast, sell the catch you can land consistently, and spend only when an upgrade clearly improves the next trip. The early goal is a repeatable catch-sell loop, not a perfect fish collection.',
  date: 'Aug 25, 2026',
  readTime: '6 min read',
  image: guideImage,
  imageAlt: 'Placeholder for a cartoon first-person fishing scene on a small boat',
  sections: [
    { id: 'first-cast', title: 'Land the first cast', paragraphs: ['Use the opening area to learn the physics response before attempting stylish shots. A controlled catch creates a better baseline than guessing at an undocumented bonus window.'], steps: ['Aim for a clear landing area.', 'Watch how the line and fish react.', 'Repeat the same motion once before changing technique.'] },
    { id: 'first-sale', title: 'Sell before you overextend', paragraphs: ['Return with a small, reliable haul and confirm the live sale screen. Fish values are not hard-coded here while the launch build is still being documented.'] },
    { id: 'first-upgrade', title: 'Buy for the next bottleneck', paragraphs: ['Choose gear that solves the next confirmed problem: catching, surviving, or reaching the boss gate. Do not copy an upgrade order built on unverified prices.'] },
  ],
  sources: sharedSources,
  fastRoutes: [{ label: 'Money guide', href: '/guides/how-to-make-money' }, { label: 'Gear index', href: '/gear' }, { label: 'Fish index', href: '/fish' }],
  communityNote,
  isNew: true,
};

export const guides: Guide[] = [
  {
    slug: 'how-to-make-money', category: 'MONEY', title: 'How to Make Money Fast', description: 'The catch-sell-upgrade loop, which fish to prioritize, and when trick shots beat volume.',
    quickAnswer: 'Make money by shortening the time between a reliable catch and the dock sale, then reinvest only when the upgrade improves that loop. Trick shots can raise a payout, but consistency is safer than gambling a haul you cannot replace.',
    date: 'Aug 25, 2026', readTime: '6 min read', image: guideImage, imageAlt: 'Placeholder for a colorful first-person fishing and selling guide',
    sections: [
      { id: 'measure-a-trip', title: 'Measure one normal trip', paragraphs: ['Enter the coins you actually earn into the calculator. The site does not publish made-up sale values for fish that have not been verified.'], steps: ['Record your current coins.', 'Complete one ordinary catch-and-sell trip.', 'Use the difference as your per-trip estimate.'] },
      { id: 'upgrade-the-loop', title: 'Upgrade the slowest step', paragraphs: ['Spend on the part of the loop that is currently limiting you. A more expensive item is not automatically a faster route.'] },
      { id: 'use-bonuses-carefully', title: 'Treat trick shots as upside', paragraphs: ['The official description confirms that stylish shots can earn more money. Use the 2x calculator scenario as a comparison, not a guaranteed rate for every catch.'] },
    ], sources: sharedSources, fastRoutes: [{ label: 'Earnings calculator', href: '/calculator' }, { label: 'Gambling guide', href: '/gambling' }, { label: 'Gear path', href: '/gear' }], communityNote, isNew: true,
  },
  {
    slug: 'gear-upgrade-guide', category: 'GEAR', title: 'Gear Upgrades: Knife to Gun', description: 'The confirmed upgrade path, what each tier changes, and what to skip.',
    quickAnswer: 'The official loop moves from no equipment through better gear and weapons, but exact shop costs and a complete item order are still unverified. Upgrade for the next island or boss requirement, and confirm the live shop before committing a full haul.',
    date: 'Aug 25, 2026', readTime: '5 min read', image: guideImage, imageAlt: 'Placeholder for a cartoon knife-to-firearm gear progression',
    sections: [
      { id: 'starter-kit', title: 'Understand the starter state', paragraphs: ['The opening equipment establishes the baseline for catching and combat. Record what the current build gives you before assuming a guide from another version applies.'] },
      { id: 'choose-an-upgrade', title: 'Choose the next capability', paragraphs: ['Prioritize a capability that unlocks the next confirmed action rather than a speculative damage number.'], steps: ['Name the current blocker.', 'Check the live dock shop.', 'Buy only when the item solves that blocker.'] },
      { id: 'recheck-after-bosses', title: 'Recheck after boss progression', paragraphs: ['Bosses open new islands and better gear. Return to the gear index after each gate instead of treating the launch-day table as final.'] },
    ], sources: sharedSources, fastRoutes: [{ label: 'Gear index', href: '/gear' }, { label: 'Boss guide', href: '/guides/boss-fights-guide' }, { label: 'Islands', href: '/islands' }], communityNote, isNew: true,
  },
  {
    slug: 'boss-fights-guide', category: 'BOSS', title: 'Boss Fights and Island Unlocks', description: 'How boss gates work, what preparation matters, and what each kill opens.',
    quickAnswer: 'Boss fights are progression gates that lead to new islands with more dangerous creatures and better gear. Prepare a recoverable loadout and confirm the current encounter in-game; boss names, health values, and attack timings remain intentionally unpublished here until verified.',
    date: 'Aug 25, 2026', readTime: '7 min read', image: guideImage, imageAlt: 'Placeholder for a playful tropical island boss encounter',
    sections: [
      { id: 'prepare', title: 'Prepare without invented stats', paragraphs: ['Bring the best confirmed equipment you can replace and keep enough coins to recover from a failed attempt.'] },
      { id: 'read-the-gate', title: 'Read the encounter as a gate', paragraphs: ['The useful question is what the victory unlocks. Record the island, quest, or shop change that appears after the fight.'], steps: ['Check the objective before entering.', 'Watch for repeatable attack cues.', 'Confirm the unlock after the fight.'] },
      { id: 'report-the-result', title: 'Separate observation from theory', paragraphs: ['A repeatable observation can enter the update log. A single damage guess or community nickname stays unconfirmed.'] },
    ], sources: sharedSources, fastRoutes: [{ label: 'Boss index', href: '/entities/bosses' }, { label: 'Islands', href: '/islands' }, { label: 'Gear guide', href: '/guides/gear-upgrade-guide' }], communityNote, isNew: true,
  },
  {
    slug: 'gambling-guide', category: 'GAMBLING', title: 'Gambling and Trick Shots Explained', description: 'Fish betting rules, double payouts, and bankroll discipline for the betting table.',
    quickAnswer: 'How to Fish uses catches and in-game money for gambling, not real-money wagering. Treat a trick-shot bonus as earned upside and the betting table as optional risk: never stake the catch you need for the next required upgrade.',
    date: 'Aug 25, 2026', readTime: '5 min read', image: guideImage, imageAlt: 'Placeholder for a cartoon fish on a casino table with dice and coins',
    sections: [
      { id: 'two-systems', title: 'Separate trick shots from betting', paragraphs: ['A trick shot rewards execution during the catch. The betting table adds a separate risk after value has already been earned. Keeping the two decisions separate makes the trade-off clearer.'] },
      { id: 'protect-the-next-upgrade', title: 'Protect the next upgrade', paragraphs: ['Set aside the coins or fish needed for required progression before using optional gambling mechanics.'], steps: ['Name the next required purchase.', 'Keep that amount outside the bet.', 'Stop after reaching the limit you set.'] },
      { id: 'no-real-money', title: 'No real-money gambling', paragraphs: ['The developer describes this as gambling with fish and explicitly states that no real money is involved.'] },
    ], sources: sharedSources, fastRoutes: [{ label: 'Gambling overview', href: '/gambling' }, { label: 'Money guide', href: '/guides/how-to-make-money' }, { label: 'Calculator', href: '/calculator' }], communityNote, isNew: true,
  },
  {
    slug: 'co-op-guide', category: 'CO-OP', title: 'Co-op Guide: 1–4 Player Fishing', description: 'Session setup, loot sharing, boss coordination, and gambling etiquette with friends.',
    quickAnswer: 'How to Fish supports one to four players in online co-op. Agree on the next shared objective before splitting tasks, keep boss preparation visible to the group, and decide how your party handles catches and gambling before a valuable haul is at risk.',
    date: 'Aug 25, 2026', readTime: '6 min read', image: guideImage, imageAlt: 'Placeholder for four players fishing together around colorful islands',
    sections: [
      { id: 'pick-an-objective', title: 'Pick one shared objective', paragraphs: ['Choose whether the session is for money, a boss gate, rare variants, or achievements. A clear objective prevents four players from creating four incompatible routes.'] },
      { id: 'divide-the-work', title: 'Divide work lightly', paragraphs: ['Use simple roles that can change after each trip.'], steps: ['Choose who leads the route.', 'Share the current gear bottleneck.', 'Regroup before the boss or betting table.'] },
      { id: 'agree-on-risk', title: 'Agree on gambling etiquette', paragraphs: ['The game supports online interaction, so groups should agree who controls a valuable catch and when a gamble is acceptable.'] },
    ], sources: sharedSources, fastRoutes: [{ label: 'Beginner guide', href: '/guides/beginner-guide' }, { label: 'Boss guide', href: '/guides/boss-fights-guide' }, { label: 'Official Discord', href: siteConfig.links.group }], communityNote, isNew: true,
  },
];

export const allGuides = [beginnerGuide, ...guides];
export const homeSectionOrder: HomeSectionId[] = ['overview', 'guides', 'journey', 'explore', 'media', 'gambling', 'faq', 'sources'];

export const topPlayerTasks = [
  ['F', 'Beginner Guide', 'Your first catch, first sale, and first upgrade.', '/guides/beginner-guide'],
  ['B', 'Boss Fights', 'How boss encounters unlock islands and better gear.', '/guides/boss-fights-guide'],
  ['I', 'Fish Index', 'Confirmed categories, islands, and sale-value status.', '/fish'],
  ['G', 'Gambling Guide', 'Trick-shot rewards, betting risk, and the no-real-money boundary.', '/gambling'],
] as const;
export const quickAccess = topPlayerTasks;

export const stats = [['AUG 2026', 'RELEASED'], ['94%', 'VERY POSITIVE'], ['5K+', 'ENGLISH REVIEWS'], ['1–4', 'CO-OP PLAYERS'], ['28', 'ACHIEVEMENTS']] as const;
export const latestUpdates = [
  ['Launch Day Patch Notes Tracker', 'Every confirmed post-launch fix and balance change, verified against official channels.', '/updates'],
  ['How to Make Money Fast', 'The catch-sell-upgrade loop that gets you off the starting knife quickest.', '/guides/how-to-make-money'],
  ['All 28 Achievements Guide', 'The official total is confirmed; individual requirements are still being documented.', '/checklist'],
  ['Co-op Guide: Fishing With Friends', 'How 1–4 player sessions work, including boss coordination and gambling etiquette.', '/guides/co-op-guide'],
] as const;
export const journeySteps = [
  ['01', 'Crash & Catch', 'Learn the physics-based cast and land your first fish.', '/guides/beginner-guide'],
  ['02', 'Sell Your Haul', 'Turn fish into coins at the dock and fund the next trip.', '/guides/how-to-make-money'],
  ['03', 'Upgrade Your Gear', 'Trade the starter knife for better equipment.', '/gear'],
  ['04', 'Beat the Boss', 'Clear the island boss to open the next progression gate.', '/entities/bosses'],
  ['05', 'Raise the Stakes', 'Rare catches, trick shots, and the gambling table.', '/gambling'],
] as const;
export const categories = [
  ['ESSENTIAL', 'Beginner Guide', 'First cast, first sale, first upgrade.', '6 GUIDES · 5-STEP START', '/guides'],
  ['FISH', 'Fish Index', 'Species categories, spawn-island status, and sale-value evidence.', 'INDEX · UNCONFIRMED VALUES MARKED', '/fish'],
  ['GEAR', 'Gear & Upgrades', 'The starter-knife-to-firearm progression path.', 'UPGRADE PATH · TIERS', '/gear'],
  ['ISLANDS', 'Islands', 'Progression areas, danger, and boss-gate status.', 'MULTI-ISLAND · PROGRESSION', '/islands'],
  ['BOSS', 'Boss Fights', 'Boss mechanics and what they unlock.', 'GATED PROGRESSION', '/entities/bosses'],
  ['GAMBLING', 'Gambling & Trick Shots', 'Fish betting and double-payout trick shots.', 'HIGH RISK · HIGH REWARD', '/gambling'],
  ['CO-OP', 'Multiplayer', 'One-to-four-player online co-op basics.', '1–4 PLAYERS', '/guides/co-op-guide'],
  ['ACHIEVEMENTS', 'Achievements', 'All 28 achievements, documented as confirmed.', '28 TOTAL · TRACKED', '/checklist'],
] as const;
export const fishRows = [
  ['Common Fish', 'C', 'Starting island category', 'Still being documented'],
  ['Uncommon Fish', 'B', 'Later-island category', 'Still being documented'],
  ['Rare Fish', 'A', 'Island-specific category', 'Still being documented'],
  ['Trophy Variant', 'S', 'Rare variant of documented species', 'Still being documented'],
] as const;
export const gearRows = [
  ['Starter Knife', 'C', 'Melee', 'Default'],
  ['Mid-tier Rod', 'B', 'Fishing', 'Dock shop · exact cost still being documented'],
  ['First Firearm', 'A', 'Ranged', 'Post-boss · exact requirement still being documented'],
] as const;
export const items = gearRows;
export const bossCards = [
  ['S', 'First Island Boss', 'GATEKEEPER', 'The boss guarding the first island exit. Mechanics are still being documented — check the update log before your run.'],
  ['A', 'Mid-Island Bosses', 'PROGRESSION', 'Each new island raises the stakes. Confirmed mechanics will be added as the community verifies them.'],
  ['B', 'Rare Fish Variants', 'COLLECTION', 'Trophy variants are not bosses, but they matter to the completionist fish index.'],
] as const;

export const searchEntries: SearchEntry[] = [
  ...allGuides.map((guide) => ({ title: guide.title, summary: guide.description, href: `/guides/${guide.slug}`, category: guide.category, keywords: guide.sections.flatMap((section) => [section.title, section.id]) })),
  ...categories.map(([category, title, summary, , href]) => ({ title, summary, href, category, keywords: [category.toLowerCase(), title.toLowerCase()] })),
  { title: 'Fish Earnings Calculator', summary: 'Estimate trips to a coin goal from your own live values.', href: '/calculator', category: 'TOOL', keywords: ['money', 'coins', 'trick shot', '2x'] },
  { title: 'Updates & Evidence Log', summary: 'Freshness log for confirmed mechanics and unresolved launch data.', href: '/updates', category: 'UPDATES', keywords: ['patch', 'freshness', 'evidence'] },
  { title: 'Official Community', summary: 'Steam, the developer site, and the official Discord.', href: '/community', category: 'COMMUNITY', keywords: ['official', 'discord', 'steam'] },
];
export const searchItems: Array<[string, string]> = searchEntries.map((entry) => [entry.title, entry.href]);
