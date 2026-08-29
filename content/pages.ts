import type { GuidePage } from './types';
import { siteStatus } from './site-status';
import { innerPages } from './inner-pages';

const shared: Pick<GuidePage, 'lastUpdated' | 'verifiedPatch' | 'updateLog' | 'indexable'> = {
  lastUpdated: siteStatus.lastChecked,
  verifiedPatch: siteStatus.verifiedPatch,
  updateLog: [{ date: siteStatus.lastChecked, note: 'MVP baseline checked against the Steam store, official achievements, and current patch notes.' }],
  indexable: true,
};

const page = (input: Omit<GuidePage, keyof typeof shared>): GuidePage => ({ ...input, ...shared });

const enrichedIslandPage = (input: Omit<GuidePage, keyof typeof shared>): GuidePage => ({
  ...input,
  ...shared,
  lastUpdated: '2026-08-29',
  verifiedPatch: '1.0.10',
  updateLog: [{ date: '2026-08-29', note: 'Expanded the NPC, quest-item, boss-trigger, hand-in, failure-tree, facility, route, evidence, and official screenshot coverage.' }],
});

const corePages: GuidePage[] = [
  page({
    route: '/', priority: 'P0', pageType: 'guide-wiki-hub', primaryKeyword: 'how to fish game guide', secondaryKeywords: ['how to fish game wiki', 'how to fish guide', 'how to fish wiki', 'how to fish game', 'how to fish steam guide'],
    title: 'How to Fish Game Guide – Walkthrough, Bosses & All Islands', description: 'The complete How to Fish game guide: full walkthrough, all 5 island routes, boss strategies, fish & bait data, all 28 achievements, and patch fixes.', h1: 'How to Fish Game Guide and Wiki', eyebrow: "Dazed Games' How to Fish on Steam",
    quickAnswer: 'Start with the full walkthrough if you do not know what to do next. Use Islands for unlock order, Bosses for triggers and drops, Fish for lure and rod checks, Achievements for the 28-item route, and Fixes or Multiplayer when the game—not progression—is blocking you.',
    contentStatus: 'current', spoilerLevel: 'minor', image: '/assets/how-to-fish/hero-island-v2.webp', imageAlt: 'Castaway fishing beside a washed-up boat on a tropical island in How to Fish',
    keyFacts: [{ label: 'Current patch', value: siteStatus.verifiedPatch }, { label: 'Released', value: 'August 20, 2026' }, { label: 'Achievements', value: '28 on Steam' }, { label: 'Core co-op', value: '1–4 players' }],
    sections: [
      { id: 'status', title: 'Current game status', paragraphs: [`Patch ${siteStatus.verifiedPatch} is the verification baseline. It added Easy and Hard settings plus a Steam Relay diagnostic. Its save wording is an attempted fix, not a guarantee.`] },
      { id: 'stuck', title: 'Where are you stuck?', bullets: ['No next objective: open the walkthrough.', 'No next island: check the island order and quest gate.', 'Boss will not spawn: check quest stage, bait, rod, NPC dialogue, and active encounters.', 'Fish will not bite: check reel timing, lure, and rod.', 'Save or join problem: use the status-led troubleshooting pages.'] },
      { id: 'quick-start', title: 'How to Fish quick start: your first five decisions', intro: 'This How to Fish game guide starts with five early-game decisions: follow the current objective, learn the cast-and-reel loop, keep quest catches, upgrade the next blocker, and confirm the Lighthouse hand-in before sailing toward Forest.', steps: [
        `Learn the basic cast-and-reel loop before chasing rare catches. Equip the rod and lure or bait shown by the game, cast at the active spot, then follow the bite and reeling prompts. Platform controls may differ, so use the on-screen input.`,
        `Sell ordinary catches only after checking the active request. Keep any named or quest-marked creature or drop until the hand-in advances. Use early income on the limitation blocking progress instead of gambling valuable catches or buying optional gear.`,
        `Upgrade for the next problem. Fishing equipment and inventory space support the opening loop; healing or combat equipment matters when a boss gate becomes active. Keep a coin buffer instead of following an unverified fixed-price build.`,
        `Treat Radar as direction and the objective log as the progress check. Before leaving an area, finish the relevant NPC dialogue, confirm any required item remains in inventory, and make sure the next route or marker has appeared.`,
        `If fish stop biting after the opening island, check the equipped lure, rod, reel timing, and quest stage before assuming a bug. Use the fish database or tips page for version-sensitive details instead of treating one community report as universal.`,
      ] },
      { id: 'fishing-basics', title: 'How to cast, catch, and prepare for a boss', paragraphs: [
        'A safe trip has three phases: prepare, fish, and return. Read the objective, equip the requested rod and lure or bait, and leave space for a quest catch. Cast, wait for the bite cue, follow the current reeling interaction, then return when the objective or inventory shows the trip is complete.',
        'Before a boss encounter, confirm the quest stage, required item, NPC dialogue, and replaceable supplies. During the fight, favor readable attack windows and room to retreat. If the encounter does not appear, recheck the stage, equipment, and active encounters. Exact health, damage, and timing values remain unconfirmed.',
      ] },
      { id: 'lighthouse-chapter', title: 'Chapter 1: Lighthouse to the first boss', intro: 'The Lighthouse is the starting area and teaches the game’s core progression loop. This is a community-documented chapter summary, so use the current objective as the authority when wording or trigger timing differs.', paragraphs: [
        `Follow the opening NPC dialogue before travelling toward every visible point of interest. Investigate the local request, fish with the equipment currently available, return the relevant result, and read the next instruction. A Radar marker gives direction; it does not prove that dialogue, an encounter, or a hand-in is complete. Pause when the objective changes so you do not mistake a travel task for a catch or encounter.`,
        `Use the first catches to learn the bite cue and reeling interaction. The goal is a reliable catch-and-sell loop, not an unverified species table. Sell ordinary catches, improve the equipment that is actually limiting progress, and keep room for anything named by the active request.`,
        `Do not sell a creature or drop the request may need. Spider Crab is retained here as a community-documented lead for the opening boss gate, not as a verified lure, bait, or Lighthouse-exclusive spawn. If the name or trigger differs in your build, follow the current game text and keep the relevant result after the encounter.`,
        `Before the first boss, complete the related dialogue, confirm the quest stage, equip the required fishing and combat gear, and carry supplies you can safely replace. If the encounter does not appear, recheck the stage, required catch, NPC, equipment, and other active encounters before treating the save as broken. Use the dedicated boss and fixes pages for deeper troubleshooting.`,
        `After the encounter, keep the quest-marked result until the hand-in clearly advances. Confirm that Boat Keys or the next route instruction is available before selling spare catches or reorganizing the inventory. Then use the updated objective and Radar to identify the Forest route. Continue with the full walkthrough for every chapter or the island guides for focused preparation and version-sensitive notes.`,
      ] },
      { id: 'next-steps', title: 'What to do after Lighthouse', paragraphs: ['The broad route is Lighthouse → Forest → Desert → Rocks → Volcano. Complete each local request, encounter, and hand-in before following the next Radar route. Keep an uncertain quest creature until the objective advances. Use the full walkthrough for the complete story sequence, island guides for preparation, boss guides for encounter blockers, and the fish database for rod, lure, and area checks.'] },
      { id: 'verification', title: 'How this wiki verifies claims', paragraphs: ['Official store, patch, and achievement text is labelled Official. Repeatable current-build observations are Verified In-Game. Forum, Reddit, video, and third-party route details remain Community or Unconfirmed until repeated. When guidance conflicts, follow the current objective and patch rather than forced certainty.'] },
    ],
    faqs: [{ question: 'What should I do first in How to Fish?', answer: 'Follow the opening objective, learn a reliable catch-and-sell loop, and use the walkthrough when the next quest or island gate is unclear.' }, { question: 'How many achievements are there?', answer: 'Steam currently lists 28 achievements.' }],
    relatedPages: ['/walkthrough/', '/islands/', '/bosses/mutated-bowhead-whale/', '/achievements/', '/fixes/'], sources: ['steamStore', 'steamAchievements', 'patch109', 'communityGuide', 'islandsGuide'],
  }),
  page({
    route: '/walkthrough/', priority: 'P1', pageType: 'walkthrough', primaryKeyword: 'how to fish game walkthrough', secondaryKeywords: ['how to fish walkthrough', 'how to fish full walkthrough', 'how to beat how to fish game', 'how to fish story guide'],
    title: 'How to Fish Game Walkthrough: Full Story & All Islands', description: 'Follow the full route from the Lighthouse to the Volcano, including every quest gate, boss trigger, item hand-in, island unlock, and the ending.', h1: 'How to Fish Game Walkthrough', eyebrow: 'FULL STORY ROUTE',
    quickAnswer: 'The community-documented main route is Lighthouse → Forest → Desert → Rocks → Volcano. Finish each local NPC request, obtain the encounter trigger, defeat the major creature, keep the quest-marked result, complete the hand-in, and then follow the new Radar route. Patch 1.0.5 removed the old skip-any-island shortcut.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition travelling between tropical islands',
    keyFacts: [{ label: 'Route', value: 'Lighthouse → Volcano' }, { label: 'Areas', value: 'Start + 4 unlocks' }, { label: 'Skip status', value: 'Closed in 1.0.5' }, { label: 'Spoilers', value: 'Full story' }],
    sections: [
      { id: 'before', title: 'Before you start', bullets: ['Back up the save before experimenting with community workarounds.', 'Do not sell quest-marked creatures or boss drops before the related hand-in.', 'Use Radar markers as direction, not proof that a quest gate is complete.', 'Recheck equipment after each island unlock.'] },
      { id: 'lighthouse', title: 'Chapter 1: Lighthouse', steps: ['Follow the keeper and opening objectives.', 'Use the Radar and current objective text to identify the Spider Crab lead.', 'Keep the quest result until the keeper advances the route.', 'Confirm that the boat-key objective and Forest route appear before leaving.'] },
      { id: 'forest', title: 'Chapter 2: Forest', steps: ['Complete the dinner request associated with three leeches.', 'Confirm the current boss-bait prompt.', 'Defeat the Giant Piranha encounter and keep the quest drop.', 'Complete the hand-in and confirm the Desert destination.'] },
      { id: 'desert', title: 'Chapter 3: Desert', steps: ['Complete the endangered-creature request.', 'Receive and equip the current carrot-bait lead.', 'Fight the Pufferfish on your selected difficulty.', 'Return the required result and confirm the Rocks route.'] },
      { id: 'rocks', title: 'Chapter 4: Rocks', steps: ['Follow the Tuna quest lead.', 'Trigger the Terrorizing Bird sequence only after the local NPC dialogue is complete.', 'Use terrain for cover and keep the next-route item.', 'Confirm the Volcano coordinates before departing.'] },
      { id: 'volcano', title: 'Chapter 5: Volcano', steps: ['Complete the military and scientist objectives shown in the current build.', 'Secure the Bowhead Whale requirement without selling the quest-marked result.', 'Use the final-boss guide for the Mutated Bowhead Whale sequence.', 'Complete the last hand-in and ending route.'] },
      { id: 'blockers', title: 'Common progression blockers', bullets: ['Boss absent: recheck dialogue, bait, rod, quest stage, and whether another encounter remains active.', 'NPC stalled: return with the marked item in inventory and re-enter the area.', 'Radar missing or inventory changed after loading: stop overwriting the only save and open the fixes page.'] },
    ],
    faqs: [{ question: 'Can I travel to later islands early?', answer: 'Patch 1.0.5 fixed the bug that allowed travel to any island without unlocking it, so current routes should follow the intended gates.' }, { question: 'Should I sell boss drops?', answer: 'Not until the related NPC hand-in is complete and the next route is confirmed.' }],
    relatedPages: ['/islands/', '/islands/lighthouse/', '/islands/forest/', '/islands/desert/', '/islands/rocks/', '/islands/volcano/', '/bosses/mutated-bowhead-whale/'], sources: ['steamStore', 'patch105', 'communityGuide', 'islandsGuide'],
  }),
  page({
    route: '/islands/', priority: 'P1', pageType: 'island-hub', primaryKeyword: 'how to fish game all islands', secondaryKeywords: ['how to fish all islands', 'how to fish island order', 'how to unlock islands in how to fish', 'how to fish island locations'],
    title: 'How to Fish Game: All Islands, Order & Unlocks', description: 'See the Lighthouse and four unlockable islands in order, with Radar routes, unlock requirements, main quests, bosses, and links to each area guide.', h1: 'All Islands and Areas in How to Fish', eyebrow: 'ISLAND ROUTE',
    quickAnswer: 'Count the route as one starting Lighthouse area plus four unlockable island areas: Forest, Desert, Rocks, and Volcano. Complete the local request and major encounter, preserve the important hand-in, then use the updated Radar route. This wording reconciles “five areas” with “four unlockable islands.”',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition across a chain of tropical islands',
    keyFacts: [{ label: 'Starting area', value: 'Lighthouse' }, { label: 'Unlockable areas', value: '4' }, { label: 'Final area', value: 'Volcano' }, { label: 'Route gate', value: 'Quest + encounter' }],
    sections: [
      { id: 'count', title: 'How many islands are there?', paragraphs: ['Players often say five islands, while route guides describe four islands after the Lighthouse start. This page uses “starting area plus four unlockable areas” so the count and progression model are both clear.'] },
      { id: 'order', title: 'Island order', steps: ['Lighthouse — opening keeper route and Spider Crab lead.', 'Forest — dinner request and Giant Piranha lead.', 'Desert — endangered-creature request and Pufferfish lead.', 'Rocks — Tuna route and Terrorizing Bird encounter.', 'Volcano — military/scientist objectives, whale route, and ending.'] },
      { id: 'unlock', title: 'How island progression works', bullets: ['Finish the NPC request shown in the current objective log.', 'Use the requested creature, lure, or quest item.', 'Complete the major encounter.', 'Keep and hand in the required result.', 'Follow the new Radar destination only after the hand-in advances.'] },
      { id: 'radar', title: 'Radar route and marker guide', paragraphs: ['A marker points you toward an objective or destination; it does not bypass a missing hand-in. If the next area is absent, return to the relevant NPC, check inventory, and confirm no active boss remains.'] },
    ],
    faqs: [{ question: 'Are there four or five islands?', answer: 'The clearest current wording is a starting Lighthouse area plus four unlockable areas.' }, { question: 'Why is the next island missing?', answer: 'A quest, boss trigger, item hand-in, or NPC dialogue step is usually incomplete; Patch 1.0.5 also closed the old travel skip.' }],
    relatedPages: ['/walkthrough/', '/islands/lighthouse/', '/islands/forest/', '/islands/desert/', '/islands/rocks/', '/islands/volcano/'], sources: ['steamStore', 'patch105', 'islandsGuide', 'communityGuide'],
  }),
  enrichedIslandPage({
    route: '/islands/lighthouse/', priority: 'P2', pageType: 'island-guide', primaryKeyword: 'how to fish game lighthouse', secondaryKeywords: ['how to fish lighthouse guide', 'how to fish game boat keys', 'how to fish game spider crab', 'how to get radar how to fish game'],
    title: 'How to Fish Lighthouse Guide: Spider Crab & Boat Keys', description: 'Complete the Lighthouse route: work with the keeper, use the Empty Beer Can trigger, return the Spider Crab quest trophy, get Boat Keys, and find Forest.', h1: 'How to Fish Lighthouse and Spider Crab Guide', eyebrow: 'AREA 01 · START',
    quickAnswer: 'In the How to Fish Lighthouse route, finish the keeper’s opening tasks before chasing the first boss. Community routes use a Beer Can or Empty Beer Can to summon the Spider Crab, then return its quest trophy for Boat Keys. Get the Radar after the hand-in; Forest appears as a green marker roughly northwest.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-shop.jpg', imageAlt: 'Official How to Fish screenshot of a player using an island shop counter',
    keyFacts: [{ label: 'Current objective', value: 'Help the Lighthouse Keeper' }, { label: 'Boss trigger lead', value: 'Empty Beer Can' }, { label: 'Keep', value: 'Spider Crab quest trophy' }, { label: 'Next coordinate', value: 'Green marker · northwest' }],
    sections: [
      { id: 'arrival-goal', title: 'What is your goal when you arrive at Lighthouse?', intro: 'The opening objective is to learn the catch, sell, equip, and hand-in loop while helping the Lighthouse Keeper. Steam’s official “Who stole my beer” achievement confirms the destination of the quest: find the culprit and bring it to the keeper.', paragraphs: [
        'Speak to the Lighthouse Keeper whenever the objective changes. The game may ask for a basic catch, a sale, food, or an equipment purchase before it exposes the boss route. Finish the active instruction instead of buying every visible item at once; an uncompleted tutorial step can make the later Beer Can interaction look broken.',
        'Treat the objective text as the authority and the route below as a checklist. The exact prompts, prices, and inventory labels in community walkthroughs can drift after patches, but the order remains useful: opening tasks, Beer Can lead, Spider Crab, trophy hand-in, Boat Keys, Radar, then Forest.',
      ] },
      { id: 'npc-facilities', title: 'Which NPC and facilities matter on Lighthouse?', bullets: [
        'Lighthouse Keeper — opening dialogue, quest hand-ins, Boat Keys, and the community-documented Radar step all return to this NPC.',
        'Shop counter — inspect the live stock for the basic rod, lures, food, weapons, and the Beer Can route item. Prices in older guides are planning hints, not fixed facts.',
        'Anvil by the lighthouse — a community walkthrough places the early upgrade point near the lighthouse door. Upgrade only the tool blocking progress and keep a cash reserve for route items.',
        'Boat — it is the exit to Forest, but it is not ready merely because it is visible. The quest trophy must be handed in and Boat Keys must be awarded first.',
        'Radar — use it after the keeper route advances. A marker gives direction; it does not replace a missing boss hand-in or key.',
      ], callout: { tone: 'warning', title: 'Keep before you sell', text: 'Do not sell the Beer Can, Empty Beer Can, or any distinct Spider Crab trophy while the keeper quest is active. Ordinary catches are the safer source of early money.' } },
      { id: 'boss-trigger', title: 'Which items and boss trigger move the route forward?', steps: [
        'Complete the keeper’s current dialogue and tutorial objective, then inspect the shop or quest inventory for the Beer Can named by the route guides.',
        'Resolve the Beer Can interaction shown in your build. Destructoid documents giving it to the keeper to receive an Empty Beer Can, while an older Steam guide shortens the step to baiting the rod with beer.',
        'Equip the resulting Empty Beer Can as the Spider Crab trigger lead and use the rod requested by the current objective. Do not substitute a normal lure simply because it can catch ordinary creatures.',
        'Land the Spider Crab, defeat it, and pick up every distinct quest-marked result. Leave inventory space before starting so the important trophy is easy to identify.',
        'Return to the Lighthouse Keeper with the trophy still in inventory and continue the dialogue until Boat Keys are awarded.',
      ] },
      { id: 'spider-crab', title: 'How should you handle the Spider Crab fight?', paragraphs: [
        'Community combat reports describe a readable charge-and-stun pattern: keep enough space to see the charge, step sideways rather than running far away, then attack during the missed-charge window. Staying closer also reduces wasted time if the crab uses a long jump. Exact health, damage, and hit counts are not official and may vary with difficulty.',
        'Bring healing or food you can replace, and avoid spending the whole inventory budget before the attempt. If the white escape bar runs out or the boss leaves, the encounter must be triggered again; that is different from the quest itself being permanently broken.',
      ] },
      { id: 'hand-in', title: 'What must you keep and hand in?', paragraphs: [
        'Steam officially says to bring the culprit to the Lighthouse Keeper, but it does not name the inventory object. Community sources disagree on whether to call the result meat or a Spider Crab shell. The Steam community route describes a distinct shell or trophy, while another walkthrough uses “meat.” Keep every quest-marked Spider Crab result and follow the name displayed in the current objective.',
        'The hand-in is complete only when the keeper dialogue advances and Boat Keys appear. Selling the trophy, feeding the wrong item, or leaving it on the ground can leave the boat visible but unusable. Confirm the keys before reorganizing inventory or sailing away.',
      ] },
      { id: 'forest-coordinate', title: 'Where is Forest and what confirms the unlock?', paragraphs: [
        'After the Spider Crab hand-in, community coordinate guides place Forest approximately northwest of Lighthouse. It appears as a green Radar marker. This is a direction and color cue, not a fixed numeric coordinate; steer toward the live marker rather than copying a screenshot angle.',
      ], bullets: ['Boat Keys are present or the boat interaction has advanced.', 'The Radar is available and shows the green destination marker.', 'The current objective no longer asks for the Spider Crab trophy.', 'Travel roughly northwest, correcting course against the live Radar.'] },
      { id: 'departure-check', title: 'What should you check before leaving Lighthouse?', bullets: ['Keeper dialogue is exhausted for the current hand-in.', 'Boat Keys are awarded.', 'Radar is acquired or available at the keeper/shop step shown in your build.', 'Quest items are no longer required by the active objective.', 'Forest’s green marker is visible roughly northwest.'], callout: { tone: 'tip', title: 'Safe departure rule', text: 'Do not treat a visible boat or Radar dot as proof of completion. Keys, objective state, and the keeper hand-in should all agree before you leave.' } },
    ],
    evidenceRows: [
      { topic: 'Quest goal', official: 'Steam confirms “Who stole my beer”: find and kill the culprit, then bring it to the Lighthouse Keeper.', community: 'Walkthroughs identify the culprit as the Spider Crab and describe the result as a shell, trophy, or meat.', guidance: 'Trust the current item label; keep every distinct Spider Crab quest result until the keeper advances.' },
      { topic: 'Boss trigger', official: 'The achievement text does not publish the lure or rod.', community: 'Current guides use a Beer Can interaction that leads to an Empty Beer Can boss trigger; their wording differs on the intermediate hand-off.', guidance: 'Finish keeper dialogue, preserve both can states, and equip the trigger named by the live objective.' },
      { topic: 'Travel reward', official: 'Steam does not document the island-unlock reward.', community: 'Route guides say the Spider Crab hand-in awards Boat Keys, after which the Radar is obtained from the keeper area.', guidance: 'Do not sail until the keys and objective update are visible in the current build.' },
      { topic: 'Forest coordinate', official: 'No official page publishes a numeric coordinate or Radar color.', community: 'The island guide places Forest roughly northwest of Lighthouse and marks it with a green Radar dot.', guidance: 'Use northwest and green as orientation only; follow the live Radar marker.' },
    ],
    failureBranches: [
      { symptom: 'The Beer Can or Empty Beer Can step is missing', likelyState: 'An opening tutorial instruction or keeper dialogue branch is still active.', nextStep: 'Finish the exact objective on screen, speak to the keeper again, then recheck shop and quest inventory without selling either can.' },
      { symptom: 'The Spider Crab does not appear', likelyState: 'The wrong can state, lure, rod, quest stage, or another active encounter is blocking the trigger.', nextStep: 'Re-equip the current Empty Beer Can lead, confirm the objective, clear other encounters, and cast again before reloading.' },
      { symptom: 'The keeper will not accept the result', likelyState: 'You may be carrying ordinary meat instead of the distinct quest trophy, or the item was dropped or sold.', nextStep: 'Inspect every Spider Crab result and the objective wording. Bring the quest-marked shell or trophy to the keeper; repeat the encounter only if it is genuinely gone.' },
      { symptom: 'The boat is visible but locked', likelyState: 'The trophy hand-in has not advanced to the Boat Keys reward.', nextStep: 'Return to the keeper with the item, exhaust dialogue, and verify the keys before interacting with the boat again.' },
      { symptom: 'Forest is not on the Radar', likelyState: 'The keys were awarded but the Radar step is incomplete, or the destination marker has not refreshed.', nextStep: 'Check the keeper/shop Radar interaction, re-equip or place the Radar, then look for the green marker roughly northwest.' },
    ],
    media: { gallery: [
      { src: '/assets/how-to-fish/steam-catch.jpg', alt: 'Official How to Fish gameplay screenshot showing a fresh catch beside an island shop', caption: 'Real gameplay context for the opening catch-and-sell loop; the image does not identify a quest trigger.', sourceId: 'steamMedia' },
      { src: '/assets/how-to-fish/steam-gear.jpg', alt: 'Official How to Fish first-person screenshot showing equipped combat gear by the sea', caption: 'Real equipment view for pre-boss preparation; exact loadouts remain player choices.', sourceId: 'steamMedia' },
    ] },
    faqs: [
      { question: 'Where do I get the Radar on Lighthouse?', answer: 'Community routes place the Radar at the keeper area after the Spider Crab hand-in. Complete the current objective and confirm Boat Keys first; prices and prompts may differ by patch.' },
      { question: 'What bait summons the Spider Crab?', answer: 'Community guides point to the Empty Beer Can produced by the Beer Can quest step. Steam’s achievement text confirms the culprit hand-in but does not name the bait.' },
      { question: 'Why did Forest not unlock?', answer: 'Check the Spider Crab quest trophy, keeper dialogue, Boat Keys, and Radar step in that order. Forest should then appear as a green marker roughly northwest.' },
    ],
    relatedPages: ['/islands/', '/walkthrough/', '/bosses/spider-crab/', '/fish/', '/fixes/', '/islands/forest/'], sources: ['patch110', 'steamAchievements', 'communityGuide', 'destructoidWalkthrough', 'islandsGuide', 'pcGamerSpiderCrab', 'steamMedia'],
  }),
  enrichedIslandPage({
    route: '/islands/forest/', priority: 'P2', pageType: 'island-guide', primaryKeyword: 'how to fish game forest island', secondaryKeywords: ['how to fish forest guide', 'how to get leeches how to fish game', 'how to fish giant piranha', 'how to fish dinnertime achievement'],
    title: 'How to Fish Forest Guide: Leeches & Giant Piranha', description: 'Complete the Forest route: find three leeches, get the Modified Leech, defeat Giant Piranha, return its quest trophy, and find Desert.', h1: 'How to Fish Forest and Giant Piranha Guide', eyebrow: 'AREA 02 · FOREST',
    quickAnswer: 'In the How to Fish Forest route, find the lady by the lake and complete her dinner request before summoning Giant Piranha. Community routes use three ground leeches to obtain a Modified Leech, then return the marked tail or skeleton trophy. Desert appears on a yellow Radar marker west to northwest after the hand-in.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-quest.jpg', imageAlt: 'Official How to Fish screenshot of a player speaking to an island NPC beside a lure and weapon board',
    keyFacts: [{ label: 'Current objective', value: 'Help the lady by the lake' }, { label: 'Boss trigger lead', value: 'Modified Leech' }, { label: 'Keep', value: 'Giant Piranha quest trophy' }, { label: 'Next coordinate', value: 'Yellow marker · westward' }],
    sections: [
      { id: 'arrival-goal', title: 'What is your goal when you arrive in Forest?', intro: 'Go to the lady by the lake before searching the whole island. Steam’s official Dinnertime achievement confirms that the Forest story objective is to catch dinner for her, but the achievement does not publish the required items or boss trigger.', paragraphs: [
        'Talk until the objective updates, then make room for ground pickups and the eventual boss trophy. The community route is a quest chain rather than a normal fishing recipe: collect three leeches, give them to the lady, receive the Modified Leech, summon and defeat Giant Piranha, then return the marked result.',
        'Forest also introduces stronger equipment and optional distractions. Complete the dinner chain first if the next island is the goal. Buying a mini-boss lure, upgrading every weapon, or searching for collection catches will not substitute for the lady’s hand-in.',
      ] },
      { id: 'npc-facilities', title: 'Which NPC and facilities matter in Forest?', bullets: [
        'Lady by the lake — she starts the dinner route, exchanges the leeches for the boss trigger, and receives the Giant Piranha trophy.',
        'Tall grass and forest floor — community players report that the three leeches are loose pickups hidden by vegetation, so watch for the pickup prompt instead of expecting fishing spots.',
        'Shop and lure board — Forest offers stronger lures and early firearms in community walkthroughs. Check live stock and buy for the current blocker, not an old fixed-price loadout.',
        'Boat engine upgrade — the official achievement confirms that an engine can be upgraded; a community guide places an early upgrade near the old man’s shack in this area. It is useful but separate from Dinnertime.',
        'Boat and Radar — use them only after the lady accepts the boss trophy and the Desert destination appears.',
      ], callout: { tone: 'warning', title: 'Do not discard ground pickups', text: 'Keep all three leeches, the Modified Leech, and the distinct Giant Piranha trophy until the lady’s dialogue and the Desert marker have advanced.' } },
      { id: 'leech-route', title: 'How do you find the three leeches and obtain the Modified Leech?', steps: [
        'Speak to the lady by the lake first so the dinner objective is active. Searching before dialogue can make it unclear whether a pickup counts.',
        'Sweep the forest floor and tall grass slowly. Look for the interaction prompt and inventory count; the small models can be harder to see than the prompt.',
        'Collect three leeches without dropping, selling, or feeding them elsewhere. If the live objective shows a different count, follow the current build rather than this route snapshot.',
        'Return all three to the lady and continue the dialogue. Community sources call the returned boss bait a modified lure; the creature database records it as Modified Leech.',
        'Equip the Modified Leech on the rod required by the current prompt, then fish only after confirming the dinner quest has moved to its boss stage.',
      ] },
      { id: 'piranha-fight', title: 'How should you trigger and fight Giant Piranha?', paragraphs: [
        'The Modified Leech is the community-documented trigger. If the cast produces nothing, recheck the active objective, bait slot, rod, and whether another boss is already active before assuming the spawn is broken.',
        'Community walkthroughs report that Giant Piranha adds smaller piranhas during the fight. Create space, clear small enemies when they prevent safe movement, and damage the boss during readable windows. Bring food or healing and a replaceable weapon suited to the selected difficulty; exact health and damage values are not official.',
      ] },
      { id: 'hand-in', title: 'What must you keep and return to the lady?', paragraphs: [
        'Keep the distinct Giant Piranha quest trophy. The available community sources use different names: the Steam guide calls it a tail, while Destructoid calls it a skeleton. Steam’s official Dinnertime text only says “catch dinner,” so it does not resolve that label conflict.',
        'Use the item name and quest marker shown in your inventory. Return every distinct boss result to the lady before selling ordinary fish. The chain is complete when her dialogue advances and the Desert coordinate appears, not merely when the boss dies.',
      ] },
      { id: 'desert-coordinate', title: 'Where is Desert and what confirms the unlock?', paragraphs: [
        'Community coordinate guides place Desert west of Forest and identify it with a yellow Radar marker. A separate walkthrough describes the sailing direction as northwest. Treat the yellow live marker as the reliable anchor and the west-to-northwest wording as rough orientation rather than a precise bearing.',
      ], bullets: ['The three-leech objective is complete.', 'The Modified Leech was used for the Giant Piranha stage.', 'The lady accepted the current tail, skeleton, or marked trophy.', 'A yellow Radar marker appears westward from Forest.', 'The objective no longer asks you to bring dinner to the lady.'] },
      { id: 'departure-check', title: 'What should you check before leaving Forest?', bullets: ['Lady-by-the-lake dialogue is exhausted.', 'No leech or boss-trophy hand-in remains active.', 'The yellow Desert marker is visible on the Radar.', 'Quest inventory has room for the next island’s items.', 'Optional engine or weapon upgrades have not consumed the cash needed for route gear.'], callout: { tone: 'tip', title: 'Use state, not scenery', text: 'Seeing open water to the west does not prove Desert is unlocked. The lady’s completed hand-in, objective update, and yellow Radar marker should agree.' } },
    ],
    evidenceRows: [
      { topic: 'Dinner objective', official: 'Steam confirms Dinnertime: catch dinner for the lady in the forest.', community: 'Route guides define the chain as three ground leeches, a boss bait exchange, Giant Piranha, and a final trophy hand-in.', guidance: 'Use the official text for the goal and the community chain as a version-sensitive checklist.' },
      { topic: 'Leech pickup', official: 'Steam does not publish a leech count or spawn rule.', community: 'Guides and player discussion report three loose leeches on the forest floor, often hidden by tall grass.', guidance: 'Activate the dialogue first, watch the pickup prompt and inventory, then use a cautious reload only after a full sweep.' },
      { topic: 'Boss trigger', official: 'The achievement does not name Giant Piranha or its bait.', community: 'Giving the leeches to the lady produces a modified lure; current creature records call it Modified Leech.', guidance: 'Equip the item named by the current objective and verify the correct rod before casting.' },
      { topic: 'Hand-in item', official: 'Official text calls the result dinner without an inventory name.', community: 'One guide says Giant Piranha tail; another says skeleton.', guidance: 'Keep every distinct marked trophy and hand in the label shown by the current build.' },
      { topic: 'Desert coordinate', official: 'No official numeric coordinate or Radar color is published.', community: 'The coordinate guide says west with a yellow dot; another route calls the direction northwest.', guidance: 'Follow the live yellow Radar marker and treat the compass wording as approximate.' },
    ],
    failureBranches: [
      { symptom: 'The three leeches are not visible', likelyState: 'The lady’s dialogue is incomplete, the pickups are hidden by grass, or they were already collected or dropped.', nextStep: 'Reactivate the objective, sweep slowly for pickup prompts, check every inventory slot and the ground, then reload the area cautiously.' },
      { symptom: 'The lady will not give the Modified Leech', likelyState: 'Fewer than three valid leeches are in inventory or the dinner dialogue has not reached the exchange stage.', nextStep: 'Check the live counter and carry all three to the lady at once; do not substitute ordinary bait.' },
      { symptom: 'Giant Piranha does not spawn', likelyState: 'The Modified Leech, rod, quest stage, or active-encounter state is wrong.', nextStep: 'Re-equip the quest bait and current rod, finish the lady’s dialogue, clear other bosses, and cast again.' },
      { symptom: 'The boss died but Dinnertime did not complete', likelyState: 'The tail, skeleton, or distinct trophy has not been returned to the lady.', nextStep: 'Inspect the boss drops and bring every quest-marked result back before selling or cooking anything.' },
      { symptom: 'The Desert marker is missing', likelyState: 'The final hand-in dialogue did not advance or the Radar has not refreshed.', nextStep: 'Return to the lady, verify the trophy is accepted, then reopen the Radar and look for the yellow marker westward.' },
    ],
    media: { gallery: [
      { src: '/assets/how-to-fish/steam-quest.jpg', alt: 'Official How to Fish gameplay screenshot showing an NPC beside a forest hut and equipment board', caption: 'Real NPC and equipment-board context; the screenshot does not prove the leech locations.', sourceId: 'steamMedia' },
      { src: '/assets/how-to-fish/steam-catch.jpg', alt: 'Official How to Fish gameplay screenshot of one player landing a fish while another prepares a weapon', caption: 'Real co-op catch and combat context for preparing before a boss trigger.', sourceId: 'steamMedia' },
    ] },
    faqs: [
      { question: 'How do I unlock Dinnertime?', answer: 'Steam says to catch dinner for the lady in the forest. Community routes use three leeches, a Modified Leech, Giant Piranha, and the final marked trophy hand-in.' },
      { question: 'Why will the Giant Piranha not spawn?', answer: 'Confirm the lady’s dialogue, Modified Leech, current rod, quest stage, and whether another encounter remains active.' },
      { question: 'Is the Giant Piranha drop a tail or a skeleton?', answer: 'Community sources use both labels, while Steam does not name the item. Keep every distinct quest-marked result and follow the current objective text.' },
    ],
    relatedPages: ['/islands/', '/walkthrough/', '/bosses/giant-piranha/', '/fixes/leeches-not-spawning/', '/islands/lighthouse/', '/islands/desert/'], sources: ['patch110', 'steamAchievements', 'communityGuide', 'destructoidWalkthrough', 'islandsGuide', 'leechDiscussion', 'steamMedia'],
  }),
  enrichedIslandPage({
    route: '/islands/desert/', priority: 'P2', pageType: 'island-guide', primaryKeyword: 'how to fish game desert island', secondaryKeywords: ['how to fish desert guide', 'how to fish pufferfish', 'how to fish carrot bait', 'how to fish endangered fish'],
    title: 'How to Fish Desert Guide: Pufferfish & Carrot Bait', description: 'Complete the Desert route: help the tourist, earn the Carrot, defeat Pufferfish, return its fin, unlock Rocks, and open the optional grill.', h1: 'How to Fish Desert and Pufferfish Guide', eyebrow: 'AREA 03 · DESERT',
    quickAnswer: 'In the How to Fish Desert route, help the tourist under the tree with an endangered catch, keep the Carrot, use it to trigger Pufferfish, and return the Pufferfish fin. Rocks then appears as a red Radar marker west. Grillmaster is a separate facility quest: return Blue Shark for the lighter and grill access.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-pufferfish.jpg', imageAlt: 'Official How to Fish gameplay screenshot of players fighting the Pufferfish boss',
    keyFacts: [{ label: 'Current objective', value: 'Help the tourist swim' }, { label: 'Boss trigger lead', value: 'Carrot' }, { label: 'Keep', value: 'Pufferfish fin' }, { label: 'Next coordinate', value: 'Red marker · west' }],
    sections: [
      { id: 'arrival-goal', title: 'What is your goal when you arrive in Desert?', intro: 'Desert has two useful NPC routes, but only the tourist route unlocks the next island. Steam officially confirms the Vacation objective to help the tourist swim and the Grillmaster objective to start the grill; it does not publish the required fish, bait, boss, or hand-in order.', paragraphs: [
        'Find the tourist under the tree for story progression. Community walkthroughs say he wants an endangered catch and rewards a Carrot, which becomes the Pufferfish trigger. After the fight, return the marked fin or trophy to receive the Rocks coordinate.',
        'The NPC beside the grill runs a separate facility quest. Completing it gives a useful cooking station, but it does not replace the tourist, Carrot, Pufferfish, or fin hand-in. If the goal is to continue the story, keep those two branches distinct.',
      ] },
      { id: 'npc-facilities', title: 'Which NPC and facilities matter in Desert?', bullets: [
        'Tourist under the tree — accepts the endangered catch, gives the community-documented Carrot, receives the Pufferfish fin, and unlocks the Rocks route.',
        'Grillmaster beside the grill — runs the Blue Shark side route and unlocks cooking after the required catch is returned.',
        'Grill — community routes describe cooking as a value and food system. The station is locked until Grillmaster advances; exact multipliers should be checked in the current item inspection.',
        'Shop and lure board — inspect live stock for the Standard Lure, Standard Boss Lure, weapons, and supplies. Do not assume an old guide’s price or preferred gun is universal.',
        'Boat and Radar — the red Rocks marker should appear only after the tourist accepts the Pufferfish result.',
      ], callout: { tone: 'warning', title: 'Keep these route items', text: 'Do not sell or cook the endangered quest catch, Carrot, Blue Shark quest result, or Pufferfish fin until the related NPC has accepted it.' } },
      { id: 'grill-route', title: 'How do you unlock Grillmaster and the grill?', steps: [
        'Speak to the NPC beside the grill and confirm that the Grillmaster objective is active.',
        'Community walkthroughs use the Standard Boss Lure to bring up Blue Shark. Verify the current lure and rod in the objective or shop before buying supplies.',
        'Defeat Blue Shark, pick up the distinct quest catch, and return it directly to the grill NPC instead of selling or cooking it.',
        'Continue the dialogue until the lighter is awarded and the grill becomes usable. Steam confirms only the achievement goal—start the grill—so the item chain remains community-documented.',
        'Test the station with an ordinary, replaceable catch. Keep story items away from the heat until their hand-ins are complete.',
      ] },
      { id: 'tourist-route', title: 'How do you get the Carrot from the tourist?', steps: [
        'Speak to the tourist under the tree before fishing so the Vacation objective is active.',
        'Catch a creature explicitly marked endangered in the current build. Community routes report Needlefish and Seahorse among accepted examples, but the on-screen endangered marker matters more than an old species list.',
        'Keep the catch intact and give it to the tourist. Do not confuse endangered status with a Drip variant; they are separate labels.',
        'Take the Carrot reward and leave it in inventory until the Pufferfish attempt. Ordinary carrots or look-alike food should not be assumed to trigger the boss.',
      ] },
      { id: 'pufferfish-fight', title: 'How should you trigger and fight Pufferfish?', paragraphs: [
        'Equip the Carrot from the tourist route and the rod required by the live prompt. If the encounter does not begin, recheck that Vacation has advanced to its boss stage and that no other encounter is active.',
        'Official Patch 1.0.4 says Pufferfish was nerfed, but it does not provide health, damage, or timing values. Community combat reports describe a rolling charge and later poison trail. Fight in open space, keep distance, shoot during clear recovery windows, and relocate before the next roll. Avoid copying fixed shot counts across difficulty settings.',
      ] },
      { id: 'hand-in', title: 'What must you keep and return after Pufferfish?', paragraphs: [
        'Pick up the distinct Pufferfish fin or current quest-marked trophy and keep it separate from ordinary meat. The community coordinate route identifies the fin as the tourist’s hand-in; Steam’s Vacation description does not name the item.',
        'Return to the tourist under the tree and continue the dialogue until the objective changes and the Rocks coordinate appears. The boss kill alone is not the unlock. If the fin was dropped, sold, or cooked, check the ground and inventory before repeating the encounter.',
      ] },
      { id: 'rocks-coordinate', title: 'Where is Rocks and what confirms the unlock?', paragraphs: [
        'Community island guides place Rocks west of Desert and identify it with a red Radar marker. Use the live red dot as the route authority; “west” is an approximate sailing direction, not a numeric coordinate or guarantee that every screenshot faces the same way.',
      ], bullets: ['The tourist accepted an endangered catch and awarded the Carrot.', 'The Carrot was used for the Pufferfish stage.', 'The tourist accepted the Pufferfish fin or marked trophy.', 'A red Radar marker is visible west of Desert.', 'The active objective no longer asks for the Vacation hand-in.'] },
      { id: 'departure-check', title: 'What should you check before leaving Desert?', bullets: ['Tourist dialogue and Pufferfish fin hand-in are complete.', 'The red Rocks marker is visible on the Radar.', 'Story items are no longer on the grill or ground.', 'Grillmaster is either complete or intentionally left as an optional return task.', 'Supplies and inventory space are ready for the Tuna and bird route on Rocks.'], callout: { tone: 'tip', title: 'Progress check', text: 'Grill access is useful, but the next island gate belongs to the tourist. Confirm the Pufferfish fin hand-in and red Radar marker before sailing west.' } },
    ],
    evidenceRows: [
      { topic: 'Tourist objective', official: 'Steam confirms Vacation: help the tourist swim on his vacation.', community: 'Routes place the tourist under a tree and say an endangered catch earns the Carrot boss trigger.', guidance: 'Use the endangered marker and current objective; do not treat every rare or Drip catch as valid.' },
      { topic: 'Grill facility', official: 'Steam confirms Grillmaster: start the grill.', community: 'Walkthroughs use a Standard Boss Lure for Blue Shark, then return it to receive a lighter and grill access.', guidance: 'Treat this as a useful side branch, not the Rocks unlock condition.' },
      { topic: 'Pufferfish status', official: 'Patch 1.0.4 says Pufferfish was nerfed without exact values.', community: 'The Carrot triggers Pufferfish; players report rolling attacks and a later poison trail.', guidance: 'Use open space and readable windows, but do not publish fixed health, damage, or shot counts.' },
      { topic: 'Hand-in item', official: 'Vacation does not name a boss or drop.', community: 'The coordinate guide says to return the Pufferfish fin to the tourist.', guidance: 'Keep the marked fin or trophy until the tourist dialogue and objective advance.' },
      { topic: 'Rocks coordinate', official: 'No official numeric coordinate or Radar color is published.', community: 'Rocks is described as west of Desert and shown by a red Radar dot.', guidance: 'Follow the live red marker and treat west as rough orientation.' },
    ],
    failureBranches: [
      { symptom: 'The grill still cannot be used', likelyState: 'Grillmaster dialogue, Blue Shark trigger, catch return, or lighter reward is incomplete.', nextStep: 'Speak to the grill NPC, verify the current boss lure, return the marked Blue Shark result, and continue dialogue until the lighter appears.' },
      { symptom: 'The tourist rejects the catch', likelyState: 'The creature is not flagged endangered, the Vacation objective is inactive, or the catch was altered or dropped.', nextStep: 'Reactivate the tourist dialogue and bring an intact catch with the current endangered marker rather than a Drip-only variant.' },
      { symptom: 'The Carrot is missing', likelyState: 'The endangered hand-in did not complete or the reward was sold, dropped, or confused with ordinary food.', nextStep: 'Check inventory and ground, speak to the tourist again, and repeat only the endangered-catch step if the reward is genuinely gone.' },
      { symptom: 'Pufferfish does not spawn', likelyState: 'The wrong Carrot, rod, quest stage, or active-encounter state is blocking the trigger.', nextStep: 'Equip the tourist’s Carrot, verify Vacation has advanced, clear other bosses, and cast with the current required rod.' },
      { symptom: 'Rocks is missing from the Radar', likelyState: 'The Pufferfish fin has not been accepted or the destination marker has not refreshed.', nextStep: 'Return the marked fin to the tourist, exhaust dialogue, then reopen the Radar and look for the red marker westward.' },
    ],
    media: { gallery: [
      { src: '/assets/how-to-fish/steam-grill.jpg', alt: 'Official How to Fish gameplay screenshot of players and a seagull beside an active grill', caption: 'Real grill facility context; the screenshot does not establish the Blue Shark quest sequence.', sourceId: 'steamMedia' },
      { src: '/assets/how-to-fish/steam-pufferfish.jpg', alt: 'Official How to Fish gameplay screenshot of the Pufferfish boss during combat', caption: 'Real Pufferfish encounter view; visible damage numbers are not used as fixed boss statistics.', sourceId: 'steamMedia' },
    ] },
    faqs: [
      { question: 'Was Pufferfish changed?', answer: 'Yes. Patch 1.0.4 says Pufferfish was nerfed, but it does not publish exact health, damage, or timing values.' },
      { question: 'Where does the Carrot bait come from?', answer: 'Community routes say the tourist gives it after accepting an endangered catch. Confirm the current objective and keep the reward for Pufferfish.' },
      { question: 'Does unlocking the grill open Rocks?', answer: 'No. Grillmaster is a separate facility route. Rocks unlocks after the tourist accepts the Pufferfish fin and the red Radar marker appears.' },
    ],
    relatedPages: ['/islands/', '/walkthrough/', '/bosses/pufferfish/', '/fish/', '/islands/forest/', '/islands/rocks/'], sources: ['patch110', 'steamAchievements', 'patch104', 'communityGuide', 'destructoidWalkthrough', 'islandsGuide', 'pcGamerPufferfish', 'steamMedia'],
  }),
  enrichedIslandPage({
    route: '/islands/rocks/', priority: 'P2', pageType: 'island-guide', primaryKeyword: 'how to fish game rocks island', secondaryKeywords: ['how to fish rocks guide', 'how to fish tuna', 'how to fish terrorizing bird', 'how to fish albatross boss'],
    title: 'How to Fish Rocks Guide: Tuna & Terrorizing Bird', description: 'Complete the Rocks route: help the scared islanders, catch and place Tuna, defeat Albatross, return its head, and follow the Volcano marker.', h1: 'How to Fish Rocks and Terrorizing Bird Guide', eyebrow: 'AREA 04 · ROCKS',
    quickAnswer: 'In the How to Fish Rocks route, speak to the scared islanders before using a Professional Boss Lure for Tuna. Community routes say to place the defeated Tuna on the ground, wait for Albatross, then return the bird’s head to the shop NPC. Volcano appears as a pink Radar marker directly north after the hand-in.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-seagull.jpg', imageAlt: 'Official How to Fish gameplay screenshot of a player lifted among palm trees while holding a fishing rod',
    keyFacts: [{ label: 'Current objective', value: 'Defend the scared islanders' }, { label: 'Boss trigger lead', value: 'Tuna placed on ground' }, { label: 'Keep', value: 'Albatross head' }, { label: 'Next coordinate', value: 'Pink marker · north' }],
    sections: [
      { id: 'arrival-goal', title: 'What is your goal when you arrive on Rocks?', intro: 'Go to the shop and finish the dialogue about the large bird before fishing for the trigger. Steam’s official Terrorizing bird achievement confirms the story goal—defend the scared islanders—but does not name Albatross, Tuna, a lure, or the hand-in item.', paragraphs: [
        'The community route fills in that sequence: use the Professional Boss Lure for Tuna, defeat it, place the Tuna body on the ground, wait for the bird, defeat the Albatross, and return its head to the shop NPC. Treat those details as a current route checklist, with the objective text taking priority if a later patch changes a label.',
        'Rocks has tempting collection catches and equipment, but only the scared-islander chain opens Volcano. Finish the local dialogue and leave enough inventory space for both the Tuna body and the final bird trophy before starting.',
      ] },
      { id: 'npc-facilities', title: 'Which NPC and facilities matter on Rocks?', bullets: [
        'Shop NPC and scared islanders — the community route starts and ends here: first for the bird warning, later for the Albatross head hand-in.',
        'Professional lure board — route guides place the Professional Lure and Professional Boss Lure tier here. Confirm live stock and the current Tuna prompt before purchasing.',
        'Hard cover around structures — identify roofs, walls, or other solid shelter before placing Tuna. The bird’s reported ranged attack makes open ground risky.',
        'Boat and Radar — a community walkthrough recommends the boat Radar upgrade before this leg. It is convenient, but the island unlock still depends on the head hand-in.',
        'Open placement area — put the Tuna where it remains visible and recoverable. Do not sell, cook, or leave it where terrain makes the trigger hard to observe.',
      ], callout: { tone: 'warning', title: 'Keep both trophies', text: 'Keep the defeated Tuna body for the encounter trigger and the Albatross head for the NPC hand-in. Ordinary fish and spare catches are safer to sell.' } },
      { id: 'tuna-route', title: 'How do you catch Tuna for the bird trigger?', steps: [
        'Speak to the shop NPC until the large-bird or scared-islander objective is active.',
        'Obtain the Professional Boss Lure named by community walkthroughs and equip the rod required by the live prompt.',
        'Fish for Tuna and defeat it while leaving room in inventory. Community combat notes describe a jumping attack, so create space and punish the landing rather than standing in its path.',
        'Pick up the intact Tuna body. Do not turn it in, sell it, cook it, or confuse it with ordinary Tuna meat.',
        'Move to a clear area near reliable cover, place the Tuna body on the ground, and wait briefly while watching the objective and sky.',
      ] },
      { id: 'bird-trigger', title: 'What should happen after you place the Tuna?', paragraphs: [
        'Community routes say the Terrorizing Bird arrives as an Albatross after the defeated Tuna is laid on the ground. If nothing happens, do not scatter more Tuna immediately. Confirm that the shop dialogue is complete, the object on the ground is the distinct defeated Tuna, and no other boss remains active.',
        'Stay close enough to protect the trigger but start from cover. If the Tuna disappears, returns to inventory, or is consumed by another interaction, reset the placement deliberately rather than continuing an uncertain encounter state.',
      ] },
      { id: 'albatross-fight', title: 'How should you fight the Albatross from cover?', paragraphs: [
        'The Steam achievement confirms a terrorizing bird, while community sources identify it as Albatross and report a damaging ranged droppings attack. Use a roof, wall, or other solid cover while the bird is distant, then step out for clear shots after its attack. A long-range weapon may be easier than a close-range option, but there is no official universal loadout.',
        'Avoid chasing across open ground or firing blindly through cover. Heal only after breaking line of sight. Exact health, damage, and shot counts are not published, and difficulty settings can change the encounter.',
      ] },
      { id: 'hand-in', title: 'What must you keep and return after the bird fight?', paragraphs: [
        'Pick up the distinct Albatross head or current quest-marked result. The community coordinate guide says to feed or hand the severed head to the NPC in the shop. Steam’s achievement does not name this item, so the current objective and inventory label remain the authority.',
        'Return immediately and continue the shop dialogue until the route updates. Defeating the bird may unlock the achievement before it unlocks Volcano; the head hand-in is the progression check.',
      ] },
      { id: 'volcano-coordinate', title: 'Where is Volcano and what confirms the unlock?', paragraphs: [
        'Community island guides place Volcano directly north of Rocks and identify it with a pink Radar marker. Official Patch 1.0.4 says the intended path to the final island was made easier to see, but it does not publish the marker color or a coordinate.',
      ], bullets: ['The scared-islander dialogue was active before the Tuna route.', 'Tuna was placed and the Albatross encounter completed.', 'The shop NPC accepted the Albatross head or marked result.', 'A pink Radar marker is visible directly north.', 'The objective has advanced from defense to travel.'] },
      { id: 'departure-check', title: 'What should you check before leaving Rocks?', bullets: ['Shop NPC dialogue and head hand-in are complete.', 'No Tuna body or bird trophy remains required.', 'The pink Volcano marker is visible to the north.', 'Radar and boat equipment are ready for the final leg.', 'Healing, ammunition, and inventory space are prepared for the scientist and military routes.'], callout: { tone: 'tip', title: 'Achievement is not the route gate', text: 'The Terrorizing bird achievement can confirm the defense, but Volcano still depends on the quest trophy hand-in and the new pink Radar marker.' } },
    ],
    evidenceRows: [
      { topic: 'Story objective', official: 'Steam confirms Terrorizing bird: defend the scared islanders from the terrorizing bird.', community: 'Walkthroughs identify the bird as Albatross and place the quest NPC at the shop.', guidance: 'Use Steam for the goal and current NPC dialogue for the active stage.' },
      { topic: 'Tuna trigger', official: 'No official page names Tuna or a lure.', community: 'Routes use a Professional Boss Lure for Tuna, then place the defeated Tuna body on the ground to call the bird.', guidance: 'Preserve the intact Tuna and verify the shop dialogue before placement.' },
      { topic: 'Combat behavior', official: 'Steam does not publish the bird’s attacks or a required weapon.', community: 'Players report a long-range droppings attack and recommend fighting from hard cover.', guidance: 'Use cover and readable openings; treat weapon choices and damage values as version-sensitive.' },
      { topic: 'Hand-in item', official: 'The achievement does not name a trophy.', community: 'The coordinate guide identifies the Albatross head as the shop NPC hand-in.', guidance: 'Keep the marked head until the objective and Radar route advance.' },
      { topic: 'Volcano coordinate', official: 'Patch 1.0.4 says the intended final-island path is easier to see.', community: 'Volcano is described as directly north and shown by a pink Radar dot.', guidance: 'Follow the live pink marker; do not convert the rough direction into invented numeric coordinates.' },
    ],
    failureBranches: [
      { symptom: 'The shop NPC never mentions the bird', likelyState: 'Arrival dialogue is incomplete or the previous island hand-in did not fully advance.', nextStep: 'Recheck the active objective, speak to the scared islanders and shop NPC, and confirm the Rocks route is the current chapter.' },
      { symptom: 'Tuna does not appear', likelyState: 'The Professional Boss Lure, rod, quest stage, or active-encounter state is wrong.', nextStep: 'Verify live shop stock and equipment, finish the bird warning dialogue, clear other bosses, then fish again.' },
      { symptom: 'Nothing happens after placing Tuna', likelyState: 'The object is not the intact defeated Tuna, placement is obstructed, dialogue is incomplete, or another encounter is active.', nextStep: 'Recover the Tuna, move to a clear area near cover, complete the shop dialogue, and place it once after clearing other bosses.' },
      { symptom: 'The shop NPC rejects the bird result', likelyState: 'The Albatross head was missed, dropped, sold, or the fight ended before the quest state updated.', nextStep: 'Inspect inventory and the fight area for the marked head, then return with the exact trophy named by the current objective.' },
      { symptom: 'Volcano is missing from the Radar', likelyState: 'The head hand-in dialogue did not finish or the destination marker has not refreshed.', nextStep: 'Return to the shop NPC, exhaust dialogue, reopen the Radar, and look for the pink marker directly north.' },
    ],
    media: { gallery: [
      { src: '/assets/how-to-fish/steam-seagull.jpg', alt: 'Official How to Fish gameplay screenshot of a player suspended among palm trees with a fishing rod', caption: 'Real large-bird gameplay context; this official image shows a seagull interaction, not proof of the Albatross trigger.', sourceId: 'steamMedia' },
      { src: '/assets/how-to-fish/steam-gear.jpg', alt: 'Official How to Fish first-person screenshot showing a large equipped weapon near the shoreline', caption: 'Real ranged-equipment context; the game does not require this exact weapon for Albatross.', sourceId: 'steamMedia' },
    ] },
    faqs: [
      { question: 'Is Terrorizing bird an official achievement?', answer: 'Yes. Steam says to defend the scared islanders, but it does not publish the Tuna trigger, Albatross name, or head hand-in.' },
      { question: 'Why does the Albatross not appear after Tuna?', answer: 'Confirm the shop dialogue, intact Tuna body, clear placement area, and absence of another active boss before placing it again.' },
      { question: 'Why can I not see the Volcano route?', answer: 'Return the marked Albatross head to the shop NPC and finish the dialogue. The pink Radar marker should then appear directly north.' },
    ],
    relatedPages: ['/islands/', '/walkthrough/', '/bosses/albatross/', '/fish/', '/islands/desert/', '/islands/volcano/'], sources: ['patch110', 'steamAchievements', 'patch104', 'communityGuide', 'destructoidWalkthrough', 'islandsGuide', 'steamMedia'],
  }),
  enrichedIslandPage({
    route: '/islands/volcano/', priority: 'P2', pageType: 'island-guide', primaryKeyword: 'how to fish game volcano island', secondaryKeywords: ['how to fish volcano guide', 'how to fish military island', 'how to fish bowhead whale', 'how to fish final island'],
    title: 'How to Fish Volcano Guide: Bowhead Whale & Ending', description: 'Complete Volcano: help the hazmat scientist, earn Fish Bucket, defeat Bowhead Whale and its mutation, return the final trophy, and reach the mainland.', h1: 'How to Fish Volcano and Bowhead Whale Guide', eyebrow: 'AREA 05 · VOLCANO',
    quickAnswer: 'In the How to Fish Volcano route, complete the yellow hazmat scientist’s five-fish request and keep the Fish Bucket for Bowhead Whale. Preserve the Whale body, carry it up the wooden planks, and throw it into the volcano to start Mutated Bowhead Whale. Return the final tail or fin for RHIB keys and the mainland ending.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/steam-gear.jpg', imageAlt: 'Official How to Fish first-person gameplay screenshot showing late-game combat equipment by the sea',
    keyFacts: [{ label: 'Current objective', value: 'Hazmat scientist + military route' }, { label: 'Boss trigger lead', value: 'Fish Bucket' }, { label: 'Keep', value: 'Both Whale quest results' }, { label: 'Next destination', value: 'RHIB to mainland' }],
    failureHeading: 'Why has the ending route not unlocked?',
    sections: [
      { id: 'arrival-goal', title: 'What is your goal when you arrive on Volcano?', intro: 'Volcano is the final story area, and its route continues beyond the first Whale fight. Steam officially confirms a military objective involving a large creature and a separate achievement for finishing the game, but it does not publish the scientist’s item chain or final travel steps.', paragraphs: [
        'Start with the yellow hazmat scientist. Community routes connect this NPC to the five-fish request, Fish Bucket, Bowhead Whale, final mutation, and last hand-in. One Steam guide treats the scientist as the military contact rather than a separate military quest giver; another walkthrough refers to the military base and boat. Follow the live objective instead of searching indefinitely for an unverified second NPC.',
        'Prepare for two encounters, not one. The regular Bowhead Whale supplies the body used to trigger Mutated Bowhead Whale. The story ends only after the final marked trophy is returned and the RHIB or military boat route to the mainland starts.',
      ] },
      { id: 'npc-facilities', title: 'Which NPC and facilities matter on Volcano?', bullets: [
        'Yellow hazmat scientist — starts the five-fish request, awards the community-documented Fish Bucket, and receives the final Whale trophy.',
        'Military objective and base area — Steam confirms helping the military defeat a large creature. Community routes disagree on whether this is a separate contact or the scientist’s final-boss stage.',
        'Scientific lure and equipment stock — inspect the live shop for the Scientific Lure, Scientific Boss Lure, weapons, attachments, healing, and inventory upgrades. Only the current objective establishes what is required.',
        'Lava and cooking space — community players use lava for cooking, but quest catches and both Whale results should never be placed there. Test with ordinary fish first.',
        'Wooden planks to the crater — the route guide uses these to carry the Bowhead Whale body to the volcano rim for the final trigger.',
        'RHIB or military boat — this is the final destination after the hazmat hand-in. It leads to the mainland and credits rather than another island coordinate.',
      ], callout: { tone: 'warning', title: 'Keep the entire final chain', text: 'Do not sell, cook, gamble, or abandon the Fish Bucket, Bowhead Whale body, or final tail/fin trophy until the mainland sequence has started.' } },
      { id: 'scientist-fish', title: 'Which five fish should you give the scientist?', paragraphs: [
        'Both current community walkthroughs agree on a five-fish hand-in, but they disagree on the requirement. Destructoid says to catch five Volcano-native fish with the Scientific Lure; the Steam community guide says any five fish work. Steam’s achievements do not resolve this conflict.',
        'Use the objective counter and item acceptance in the current build. The conservative route is to equip the Scientific Lure, catch five ordinary Volcano fish, and give them one at a time to the yellow hazmat scientist. Keep any named, boss, Drip, or quest-marked catch out of this exchange unless the objective explicitly asks for it.',
      ], steps: ['Activate the scientist dialogue before fishing.', 'Equip the Scientific Lure and current rod.', 'Catch five fish while watching the objective counter.', 'Hand them to the scientist without mixing in boss trophies.', 'Continue dialogue until Fish Bucket appears as the next route item.'] },
      { id: 'fish-bucket', title: 'How do you use Fish Bucket to reach Bowhead Whale?', paragraphs: [
        'Community sources identify Fish Bucket as the story bait for the regular Whale. Equip the item only after the five-fish objective has advanced, then use the rod and location indicated by the current prompt. If a normal catch appears, recheck the bait slot before consuming another bucket.',
        'Official Patch 1.0.4 says Whale was nerfed, but gives no exact values. Community reports describe a charge and an airborne stomp. Keep open escape space, move when the Whale launches, attack after readable landings, and carry replaceable healing. Difficulty can change the timing and damage.',
      ] },
      { id: 'whale-body', title: 'What must you do with the Bowhead Whale body?', steps: [
        'Defeat the regular Bowhead Whale and pick up the complete quest-marked body. Do not reduce it to ordinary meat or leave it near lava.',
        'Confirm the objective now points toward the volcano rather than back to the scientist. If it does not, check the exact item in inventory.',
        'Follow the wooden planks or current marked path to the top of the volcano. Patch 1.0.4 made the intended path to the final island easier to see, but it does not document every plank interaction.',
        'Equip and throw the Bowhead Whale body into the volcano only when the objective is at the final-trigger stage.',
        'Move immediately to a safe starting position for Mutated Bowhead Whale; the trigger is a transition into the final encounter, not a storage step.',
      ] },
      { id: 'final-boss', title: 'How does the military objective connect to Mutated Bowhead Whale?', paragraphs: [
        'Steam’s Deadliest catch achievement says to help the military defeat the big creature they located. A detailed community route identifies that creature as the lava-themed Mutated Bowhead Whale and says the hazmat scientist is the military contact, while another walkthrough describes using the military base for preparation. The safe conclusion is that the final mutation completes the military story stage; a separate boss should not be invented without an objective.',
        'Use the dedicated final-boss guide for combat and Handyman planning. For story progression, the important state is simpler: the Bowhead Whale body has been thrown into the crater, Mutated Bowhead Whale is defeated, and its distinct quest trophy is still in inventory.',
      ] },
      { id: 'ending-hand-in', title: 'What must you return to finish the game?', paragraphs: [
        'Community sources agree that the final boss drops a distinct trophy but disagree on its name: the Steam guide calls it a tail, while Destructoid calls it a fin. Steam’s We are so back achievement only says to finish the game, so the current inventory label must settle the item name.',
        'Keep every marked final-boss result and return to the yellow hazmat scientist. Continue the dialogue until RHIB keys or the military boat key is awarded. Start that boat to reach the mainland and credits. Killing Mutated Bowhead Whale without this hand-in is not the end state.',
      ] },
      { id: 'mainland-route', title: 'Where is the next destination after Volcano?', paragraphs: [
        'There is no sixth island coordinate in the documented story route. The next destination is the mainland, reached by the RHIB or military boat after the final trophy hand-in. Follow the current objective to the keyed boat rather than looking for another colored Radar dot.',
      ], bullets: ['Five-fish scientist request is complete.', 'Fish Bucket was used for Bowhead Whale.', 'The Bowhead Whale body triggered the crater sequence.', 'Mutated Bowhead Whale is defeated.', 'The scientist accepted the final tail, fin, or marked trophy.', 'RHIB keys are awarded and the mainland boat is ready.'] },
      { id: 'departure-check', title: 'What should you check before starting the RHIB?', bullets: ['The final trophy hand-in and scientist dialogue are complete.', 'RHIB or military boat keys are present.', 'The active objective points to the boat or mainland.', 'Any optional Handyman attempt is complete or intentionally deferred.', 'Owned equipment and post-game plans are understood before credits.'], callout: { tone: 'tip', title: 'Final state check', text: 'A regular Whale kill, a final-boss kill, and the ending are three different states. The mainland boat and credits confirm completion.' } },
    ],
    evidenceRows: [
      { topic: 'Military objective', official: 'Steam confirms Deadliest catch: help the military defeat the big creature they located.', community: 'One route says the hazmat scientist is the military contact and the big creature is Mutated Bowhead Whale; another uses the military base as a preparation landmark.', guidance: 'Treat the final mutation as the documented military stage and follow the live objective for NPC identity.' },
      { topic: 'Scientist request', official: 'Steam achievements do not publish the scientist’s fish count or species rule.', community: 'Both routes say five fish; one says Volcano-native fish with Scientific Lure, while another says any fish.', guidance: 'Use five Volcano catches with Scientific Lure as the conservative route, but let the current counter decide.' },
      { topic: 'Whale trigger', official: 'Patch 1.0.4 confirms Whale was nerfed without naming the lure or values.', community: 'The five-fish hand-in awards Fish Bucket, which summons Bowhead Whale.', guidance: 'Keep the bucket, verify the quest stage and current rod, and avoid fixed health or damage claims.' },
      { topic: 'Final trigger', official: 'Steam does not publish the crater interaction.', community: 'Walkthroughs say to carry the Bowhead Whale body up the wooden planks and throw it into the volcano.', guidance: 'Preserve the full marked body and use it only when the objective points to the crater.' },
      { topic: 'Ending hand-in', official: 'Steam confirms We are so back for finishing the game but does not name the final trophy.', community: 'One source calls the Mutated Bowhead Whale result a tail; another calls it a fin. Both return it to the hazmat NPC for boat keys.', guidance: 'Keep every marked result, follow the live label, and confirm RHIB keys before leaving.' },
      { topic: 'Next destination', official: 'No official page publishes a sixth island.', community: 'The final hand-in awards RHIB or military boat keys for travel to the mainland and credits.', guidance: 'Use the keyed boat and objective; do not search for another island Radar marker.' },
    ],
    failureBranches: [
      { symptom: 'The scientist does not count a fish', likelyState: 'The request is inactive, the catch is not accepted by the current rule, or a quest item was offered instead.', nextStep: 'Reactivate the yellow hazmat dialogue, use Scientific Lure for an ordinary Volcano catch, and watch the counter after each hand-in.' },
      { symptom: 'Fish Bucket is missing', likelyState: 'Fewer than five accepted fish were handed in or the reward dialogue did not finish.', nextStep: 'Check the live counter and inventory, speak to the scientist again, and catch only the remaining accepted fish.' },
      { symptom: 'Bowhead Whale does not spawn', likelyState: 'Fish Bucket is not equipped, the wrong rod or stage is active, or another encounter remains open.', nextStep: 'Equip the quest bucket, verify the current rod and Whale objective, clear other bosses, and trigger once more.' },
      { symptom: 'The crater does not start the final fight', likelyState: 'The object is not the full Bowhead Whale body, the objective has not advanced, or it was thrown outside the trigger area.', nextStep: 'Recover the body if possible, confirm the crater objective, climb the wooden planks, and throw the marked body from the intended point.' },
      { symptom: 'The final boss died but no boat key appears', likelyState: 'The tail, fin, or distinct final trophy has not been returned to the yellow hazmat scientist.', nextStep: 'Search the fight area and inventory for every marked result, return it to the scientist, and exhaust the final dialogue.' },
      { symptom: 'The RHIB will not start', likelyState: 'The key reward or final objective transition is incomplete, or the wrong boat is being used.', nextStep: 'Verify RHIB or military boat keys, recheck the scientist dialogue, then follow the objective to the mainland boat.' },
    ],
    media: { gallery: [
      { src: '/assets/how-to-fish/steam-gear.jpg', alt: 'Official How to Fish gameplay screenshot showing a large equipped weapon near the ocean', caption: 'Real late-game equipment context; this exact weapon is not required by the official achievements.', sourceId: 'steamMedia' },
      { src: '/assets/how-to-fish/steam-grill.jpg', alt: 'Official How to Fish gameplay screenshot showing an active grill beside the sea', caption: 'Real cooking-facility context; it is not a Volcano lava screenshot and does not prove the lava-cooking route.', sourceId: 'steamMedia' },
    ] },
    faqs: [
      { question: 'Was Bowhead Whale changed?', answer: 'Patch 1.0.4 says Whale was nerfed, but it does not publish exact health, damage, or timing values.' },
      { question: 'Do the scientist’s five fish have to be Volcano fish?', answer: 'Community sources conflict: one says local fish with Scientific Lure, another says any five. The conservative route is five Volcano catches while following the live counter.' },
      { question: 'Is the final boss drop a tail or a fin?', answer: 'Community sources use both names, while Steam does not name the item. Keep every marked result and return the current trophy to the yellow hazmat scientist.' },
      { question: 'Where is the full final-boss strategy?', answer: 'Use the dedicated Mutated Bowhead Whale guide for combat and Handyman; this page keeps the complete Volcano quest and ending topology together.' },
    ],
    relatedPages: ['/islands/', '/walkthrough/', '/bosses/bowhead-whale/', '/fish/', '/islands/rocks/', '/bosses/mutated-bowhead-whale/'], sources: ['patch110', 'steamAchievements', 'patch104', 'communityGuide', 'destructoidWalkthrough', 'islandsGuide', 'steamMedia'],
  }),
  page({
    route: '/bosses/', priority: 'P1', pageType: 'boss-hub', primaryKeyword: 'how to fish game boss', secondaryKeywords: ['how to fish game bosses', 'how to fish all bosses', 'how to fish boss bait', 'how to fish boss locations'],
    title: 'How to Fish Game Boss Guide: All Bosses & Bait', description: 'Find every verified story and optional boss, its lure or quest trigger, recommended weapons, fight tips, important drops, and the next step.', h1: 'All Bosses in How to Fish', eyebrow: 'BOSS ROUTE',
    quickAnswer: 'Story encounters follow the island route from the Spider Crab lead through Giant Piranha, Pufferfish, Terrorizing Bird, Bowhead Whale, and the final Mutated Bowhead Whale sequence. Verify the current quest stage, bait, rod, NPC dialogue, and active encounter before assuming a boss is bugged; difficulty now changes health and damage.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition crossing bright ocean between islands',
    keyFacts: [{ label: 'Difficulty', value: 'Easy / Default / Hard' }, { label: 'Main gate', value: 'Quest + trigger' }, { label: 'Drops', value: 'Keep until hand-in' }, { label: 'Final boss', value: 'Dedicated P0 guide' }],
    sections: [
      { id: 'route', title: 'Main story boss route', steps: ['Lighthouse: Spider Crab progression lead.', 'Forest: Giant Piranha encounter.', 'Desert: Pufferfish encounter.', 'Rocks: Terrorizing Bird encounter.', 'Volcano: Bowhead Whale and final mutation sequence.'] },
      { id: 'triggers', title: 'How lures and quest triggers work', paragraphs: ['A creature name alone is not enough. The current objective, NPC dialogue, lure, rod, and any existing active boss can all determine whether the encounter begins.'] },
      { id: 'difficulty', title: 'Difficulty setting effects', paragraphs: ['Patch 1.0.9 states that Easy creatures have 25% less health and deal 50% less damage; Hard creatures have 25% more health and deal 25% more damage. Default matches the previous setting.'] },
      { id: 'not-spawning', title: 'Boss not spawning checklist', bullets: ['Correct quest stage and NPC dialogue?', 'Correct lure and rod?', 'Required item still in inventory?', 'Another boss already active?', 'Host and clients on the same patch?', 'Steam Relay diagnostic normal for co-op?'] },
      { id: 'coop', title: 'Solo and co-op roles', paragraphs: ['In co-op, assign damage, small-enemy control, healing, and revive/aggro roles. The game is intended for 1–4 players even though larger lobbies are technically supported.'] },
    ],
    faqs: [{ question: 'Does difficulty change bosses?', answer: 'Patch 1.0.9 applies creature health and damage modifiers, so timings differ by setting.' }, { question: 'Why did a boss not spawn?', answer: 'Check quest stage, dialogue, bait, rod, active encounters, patch alignment, and co-op Relay status.' }],
    relatedPages: ['/walkthrough/', '/islands/', '/bosses/mutated-bowhead-whale/', '/tips/', '/multiplayer/'], sources: ['steamStore', 'patch109', 'communityGuide', 'steamAchievements'],
  }),
  page({
    route: '/bosses/mutated-bowhead-whale/', priority: 'P0', pageType: 'boss-guide', primaryKeyword: 'how to fish mutated bowhead whale', secondaryKeywords: ['how to beat mutated bowhead whale', 'how to fish final boss', 'how to summon mutated bowhead whale', 'how to fish volcanic whale', 'how to fish handyman achievement'],
    title: 'How to Fish Mutated Bowhead Whale: Final Boss Guide', description: 'Catch the Bowhead Whale, throw it into the Volcano, defeat the Mutated Bowhead Whale, keep its drop, and complete the Handyman method.', h1: 'How to Beat the Mutated Bowhead Whale in How to Fish', eyebrow: 'FINAL BOSS · FULL SPOILERS',
    quickAnswer: 'Complete the Volcano military and scientist objectives, keep the Bowhead Whale quest requirement, and verify the current final trigger before entering the fight. Bring recoverable healing and your best replaceable weapon. After victory, keep the marked result for the last hand-in. Handyman officially requires defeating the final boss with bare hands.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/mutated-whale-v2.webp', imageAlt: 'AI-generated cartoon mutated bowhead whale erupting from a glowing volcanic ocean crater',
    keyFacts: [{ label: 'Area', value: 'Volcano' }, { label: 'Prerequisite', value: 'Military + scientist route' }, { label: 'Difficulty', value: 'Player selected' }, { label: 'Achievement', value: 'Handyman' }],
    sections: [
      { id: 'requirements', title: 'Mutated Bowhead Whale requirements', bullets: ['Reach Volcano through the intended island order.', 'Finish the active military and scientist objectives.', 'Keep the Bowhead Whale quest requirement.', 'Set difficulty and carry recoverable healing.', 'Back up the save before testing a community workaround.'] },
      { id: 'catch', title: 'Catch and preserve the Bowhead Whale', paragraphs: ['Follow the current objective and equipment prompts. Patch 1.0.4 nerfed Whale, but no official health, lure, or phase table was published. Do not sell the quest-marked result.'] },
      { id: 'summon', title: 'Trigger the final encounter', steps: ['Confirm the scientist objective is active.', 'Bring the preserved Bowhead Whale requirement to the Volcano trigger described by the current objective.', 'Wait for the objective and encounter state to change before leaving the area.'] },
      { id: 'strategy', title: 'Best final-boss strategy', bullets: ['Fight from a position with a clear escape lane.', 'Learn one attack cycle before spending all healing.', 'Deal damage during repeatable safe windows.', 'In co-op, separate damage, add control, healing, and revive duties.', 'Adjust timing expectations for Easy, Default, or Hard.'] },
      { id: 'after', title: 'What to do after the fight', paragraphs: ['Keep the important result, return to the final quest giver indicated by the current objective, and complete the last hand-in before following the ending route.'] },
      { id: 'handyman', title: 'Handyman achievement', paragraphs: ['Steam’s official requirement is “Defeat the final boss with your bare hands.” Community reports about needing only the final blow are not promoted here as verified. For a reliable attempt, plan the entire finish around the literal official requirement.'], callout: { tone: 'warning', title: 'VERSION-SENSITIVE', text: 'Patch 1.0.4 fixed the bare-hands achievement for all players. Recheck behavior if the unlock does not appear.' } },
      { id: 'missing', title: 'Boss did not spawn or reset', bullets: ['Recheck both Volcano quest groups.', 'Confirm the required creature/item is still present.', 'Leave and re-enter only after the objective updates.', 'For co-op, compare patch versions and Relay status.', 'Do not overwrite the only save while testing recovery steps.'] },
    ],
    faqs: [{ question: 'What does Handyman officially require?', answer: 'Steam says to defeat the final boss with bare hands.' }, { question: 'Can I rely on a final-hit-only method?', answer: 'That is a community claim and remains version-sensitive; the literal official requirement is the safer route.' }],
    relatedPages: ['/', '/bosses/', '/islands/volcano/', '/walkthrough/', '/achievements/#handyman'], sources: ['steamAchievements', 'patch104', 'patch109', 'communityGuide'],
  }),
  page({
    route: '/achievements/', priority: 'P0', pageType: 'achievement-database', primaryKeyword: 'how to fish all achievements', secondaryKeywords: ['how to fish achievements', 'how to fish 28 achievements', 'how to fish achievement guide', 'how to fish 100 percent guide', 'how to fish bean achievement', 'how to fish handyman achievement'],
    title: 'How to Fish All Achievements: Unlock All 28', description: 'Unlock all 28 Steam achievements with a route-based checklist, current Bean warning, Handyman strategy, Collector and Fishipedia cleanup.', h1: 'All 28 How to Fish Achievements', eyebrow: '100% ROUTE · LOCAL CHECKLIST',
    quickAnswer: 'Steam lists 28 achievements. Let the story unlock natural objectives first, then clean up money and combat challenges, finish Collector and Fishipedia with the creature database, and attempt Bean on a clean current-patch route. Patch 1.0.5 removed the old skip-any-island bug, so do not use obsolete speedrun instructions.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition with tropical islands and a colorful catch',
    keyFacts: [{ label: 'Total', value: '28' }, { label: 'Rarest current', value: 'Bean' }, { label: 'Checklist', value: 'Saved locally' }, { label: 'Baseline', value: 'Patch 1.0.9' }],
    sections: [
      { id: 'overview', title: 'Achievement overview', paragraphs: ['Official Steam names, descriptions, and current completion rates are shown in the checklist. Route advice is kept separate so official requirements are never silently rewritten.'] },
      { id: 'route', title: 'Recommended completion route', steps: ['Phase 1: finish natural story and island achievements.', 'Phase 2: clean up combat, equipment, cooking, and gambling challenges.', 'Phase 3: use the evidence-labelled creature table for Collector and Fishipedia.', 'Phase 4: prepare a fresh legitimate sub-one-hour Bean attempt.'] },
      { id: 'hardest', title: 'Hardest achievements', bullets: ['Bean — finish within one hour on the current route.', 'Handyman — final boss with bare hands.', 'Fishipedia — all Drip creatures.', 'Collector — all creatures.', "Everyone's dream — seagull with dynamite.", 'Rich! Millionaire — one sale worth 100,000 or more.'] },
      { id: 'warnings', title: 'Version-sensitive warnings', paragraphs: ['Patch 1.0.5 removed the skip-any-island bug and fixed Fishipedia requiring an extra Drip. Patch 1.0.4 fixed Handyman for all players. Old routes can therefore fail even when their videos still rank.'] },
    ],
    faqs: [{ question: 'How many achievements does How to Fish have?', answer: 'Steam currently lists 28.' }, { question: 'Does the old Bean island skip still work?', answer: 'Patch 1.0.5 says the travel-to-any-island bug was fixed, so build a current legitimate route instead.' }],
    relatedPages: ['/walkthrough/', '/fish/', '/bosses/mutated-bowhead-whale/', '/tips/', '/islands/'], sources: ['steamAchievements', 'patch104', 'patch105', 'beanDiscussion', 'communityGuide'],
  }),
  page({
    route: '/fish/', priority: 'P2', pageType: 'creature-database', primaryKeyword: 'how to fish game all fish', secondaryKeywords: ['how to fish all fish locations', 'how to fish fish locations', 'how to fish rods and bait', 'how to fish lure list', 'how to fish fishipedia', 'how to fish collector achievement'],
    title: 'How to Fish Game: All Fish, Rods, Bait & Lures', description: 'Search every confirmed creature by lure, rod and area, track normal and Drip entries, and finish Collector and Fishipedia without guesswork.', h1: 'All Fish, Rods, Bait and Lures in How to Fish', eyebrow: 'CREATURE DATABASE · EVIDENCE FIRST',
    quickAnswer: 'Use the database to search confirmed and community-documented creatures by name, type, lure, rod, and first available area. It deliberately does not claim a total fish count or say a creature is found only on one island. A high-traffic Steam guide reports that lure can determine catch selection, so treat area as an observation, not an absolute spawn rule.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fisher reeling in a colorful creature from a small boat',
    keyFacts: [{ label: 'Cross-checked rows', value: '44 catches + Seagull' }, { label: 'Location model', value: 'First documented stage' }, { label: 'Collection', value: 'Collector + Fishipedia' }, { label: 'Patch fix', value: 'Fishipedia 1.0.5' }],
    sections: [
      { id: 'selection', title: 'How catch selection works', paragraphs: ['Current community evidence suggests lure may be more important than the island for some catches. The database therefore separates first available area, observed areas, lure, and rod.'] },
      { id: 'rods', title: 'Rods', paragraphs: ['Match the current quest and shop prompts. Exact rod tables remain incomplete until each option is observed in the live build. Unknown values stay blank instead of being copied from another guide.'] },
      { id: 'bait', title: 'Bait and lures', paragraphs: ['A missing catch may mean the wrong lure, wrong rod, missing quest stage, or reel timing—not necessarily the wrong island. Version-sensitive quest bait is labelled in the record notes.'] },
      { id: 'not-biting', title: 'Fish not biting troubleshooting', steps: ['Confirm that the active area expects reeling rather than the opening-area behavior.', 'Check the equipped rod and lure.', 'Read the current quest prompt for a required bait.', 'Move away and retry after clearing an active encounter.', 'If inventory changed after loading, stop and open the fixes page.'] },
      { id: 'unknown', title: 'Unknown and unverified entries', paragraphs: ['The MVP publishes a useful evidence-labelled subset. It does not pretend to be a complete count until the in-game Fishipedia is checked entry by entry.'] },
    ],
    faqs: [{ question: 'How many fish are in How to Fish?', answer: 'This guide does not publish a number until the current in-game collection can be verified.' }, { question: 'Are fish locked to one island?', answer: 'Not always according to current community evidence; use lure, rod, first-available area, and observed areas instead of an absolute location.' }],
    relatedPages: ['/achievements/#collector', '/achievements/fishipedia/', '/tips/', '/islands/', '/fixes/'], sources: ['steamStore', 'steamAchievements', 'patch105', 'allThingsFish', 'g2aFishList', 'bitingDiscussion'],
  }),
  page({
    route: '/tips/', priority: 'P2', pageType: 'mechanics-guide', primaryKeyword: 'how to fish game tips', secondaryKeywords: ['how to fish hidden mechanics', 'how to fish things the game does not tell you', 'how to fish game secrets', 'how to fish fish not biting', 'how to fish killscore', 'how to fish cooking'],
    title: 'How to Fish Game Tips: Hidden Mechanics Explained', description: 'Learn the systems the game barely explains: reeling after Island 1, Radar, lures, Killscore, cooking, quest drops, upgrades and progression traps.', h1: 'How to Fish Game Tips and Hidden Mechanics', eyebrow: 'THE GAME BARELY EXPLAINS',
    quickAnswer: 'When progression feels broken, first check the mechanic that changed: later fishing may require active reeling, catch selection can depend on lure and rod, Radar markers do not replace quest hand-ins, and valuable quest drops should not be sold early. Treat Killscore, cooking, Drip, and trick-shot advice as version-sensitive until reproduced.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition on a vivid tropical ocean',
    keyFacts: [{ label: 'Best use', value: 'Mechanic blockers' }, { label: 'Fishing change', value: 'Check reel timing' }, { label: 'Collection', value: 'Normal + Drip' }, { label: 'Risk', value: 'Do not sell quest items' }],
    sections: [
      { id: 'fishing', title: 'Fishing changes after the first area', paragraphs: ['A frequent player question is that fish stop biting after the opening area. Before assuming a bug, test active reel timing and confirm the equipped lure and rod.'] },
      { id: 'radar', title: 'How the Radar works', paragraphs: ['Use markers to navigate toward the active objective. A marker does not mean an NPC hand-in, boss trigger, or item requirement is already satisfied.'] },
      { id: 'lure-rod-area', title: 'Lure vs rod vs area', paragraphs: ['Treat these as separate dimensions. “First available area” is not the same as “only spawn area,” and an observed catch does not prove exclusivity.'] },
      { id: 'systems', title: 'Killscore, cooking, and Drip', bullets: ['Killscore rewards how the kill is completed.', 'The grill and burnt-creature achievement confirm cooking matters.', 'Drip creatures feed the Fishipedia achievement.', 'Trick shots and gambling are optional payout/risk systems, not progression guarantees.'] },
      { id: 'traps', title: 'Common progression traps', bullets: ['Selling a quest-marked result.', 'Following an outdated island skip after Patch 1.0.5.', 'Using a copied absolute fish location.', 'Assuming default-difficulty timing on Easy or Hard.', 'Testing save recovery on the only copy.'] },
    ],
    faqs: [{ question: 'Why are fish not biting after the first area?', answer: 'Check active reeling, the equipped lure and rod, and the current quest bait before treating it as a bug.' }, { question: 'Should I sell every valuable creature?', answer: 'No. Keep quest-marked creatures and boss results until the related hand-in and route unlock are complete.' }],
    relatedPages: ['/fish/', '/walkthrough/', '/islands/', '/achievements/', '/fixes/'], sources: ['steamStore', 'steamAchievements', 'tipsVideo', 'bitingDiscussion', 'communityGuide'],
  }),
  page({
    route: '/multiplayer/', priority: 'P1', pageType: 'multiplayer-guide', primaryKeyword: 'how to fish multiplayer', secondaryKeywords: ['how to fish co op', 'how many players is how to fish', 'how to fish invite friends', 'how to fish lobby id', 'how to fish steam relay', 'how to fish black screen joining'],
    title: 'How to Fish Multiplayer: Co-op, Player Limit & Fixes', description: 'Set up co-op, understand the intended player count and current lobby support, invite by Steam or ID, and troubleshoot Relay or join black screens.', h1: 'How to Play How to Fish Multiplayer', eyebrow: 'CO-OP SETUP & RELAY STATUS',
    quickAnswer: 'How to Fish is intended for 1–4 players according to the official Steam store. Patch 1.0.4 added technical support for lobbies up to eight, but that does not change the core 1–4 design wording. Host or join through the current Steam/lobby controls, keep every player on the same patch, and check the 1.0.9 Steam Relay indicator when joining fails.',
    contentStatus: 'still-reported', spoilerLevel: 'none', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon co-op fishing expedition travelling between islands',
    keyFacts: [{ label: 'Intended', value: '1–4 players' }, { label: 'Lobby support', value: 'Up to 8 since 1.0.4' }, { label: 'Network check', value: 'Steam Relay indicator' }, { label: 'Solo', value: 'Supported' }],
    sections: [
      { id: 'players', title: 'How many players does How to Fish support?', paragraphs: ['The store describes a 1–4 player physics-based fishing simulator. Patch 1.0.4 added support for up to eight-player lobbies. Describe the distinction instead of calling it a native eight-player design.'] },
      { id: 'host', title: 'How to host and invite', steps: ['Update Steam and the game for every participant.', 'Create the desired public or private session.', 'Invite through the current Steam or lobby interface.', 'Have joining players wait for the host objective and island state to load before interacting.'] },
      { id: 'roles', title: 'Recommended boss roles', bullets: ['Primary boss damage.', 'Small-creature control.', 'Healing and item awareness.', 'Revive and aggro management.'] },
      { id: 'relay', title: 'Steam Relay and black screens', steps: ['Check the Relay text added in Patch 1.0.9.', 'If it is red, follow current official Discord common-bugs guidance.', 'Restart Steam and confirm matching patch versions.', 'Retry a private lobby and Steam invite.', 'Do not assume the 1.0.4 attempted black-screen fix covers every current failure.'] },
      { id: 'achievements', title: 'Achievements in co-op', paragraphs: ['Patch 1.0.4 fixed the bare-hands final-boss achievement for everyone. For other unlocks, let the player performing the requirement complete the action and verify the Steam popup before progressing.'] },
    ],
    faqs: [{ question: 'Is How to Fish an eight-player game?', answer: 'It is intended for 1–4 players; Patch 1.0.4 added technical lobby support for up to eight.' }, { question: 'What does a red Steam Relay status mean?', answer: 'Patch 1.0.9 directs players to the official Discord common-bugs guidance when Relay initialization fails.' }],
    relatedPages: ['/bosses/', '/fixes/', '/walkthrough/', '/achievements/'], sources: ['steamStore', 'patch104', 'patch109', 'blackScreenDiscussion'],
  }),
  page({
    route: '/fixes/', priority: 'P1', pageType: 'troubleshooting-hub', primaryKeyword: 'how to fish save bug', secondaryKeywords: ['how to fish lost items', 'how to fish missing radar', 'how to fish corrupted save', 'how to fish game name save', 'how to fish black screen', 'how to fish game crash'],
    title: 'How to Fish Save Bug & Fixes: Lost Items and Black Screen', description: 'Protect saves and troubleshoot corrupted slots, lost items, missing Radar, startup black screens, crashes, audio problems and stuttering by patch status.', h1: 'How to Fix How to Fish Save and Launch Problems', eyebrow: 'PATCH STATUS · SAFE FIRST STEPS',
    quickAnswer: 'Patch 1.0.9 included an attempted fix for save corruption; it did not guarantee recovery or say every loading issue was resolved. Before testing any workaround, stop overwriting the only save, back it up, restart Steam, confirm the current patch, and verify game files. Use official Discord guidance for save loading or weapon-equip crashes.',
    contentStatus: 'attempted-fix', spoilerLevel: 'none', image: '/assets/how-to-fish/guide-fishing-v2.webp', imageAlt: 'AI-generated cartoon fishing expedition at sea with tropical islands in the distance',
    keyFacts: [{ label: 'Save status', value: 'Attempted fix in 1.0.9' }, { label: 'Recovery', value: 'Not guaranteed' }, { label: 'First action', value: 'Protect the save copy' }, { label: 'Network', value: 'Check Steam Relay' }],
    sections: [
      { id: 'before', title: 'Before trying any fix', steps: ['Do not overwrite the only save.', 'Back up the save using current official guidance.', 'Restart Steam and the computer.', 'Confirm that Patch 1.0.9 or newer is installed.', 'Verify the game files in Steam.'] },
      { id: 'saves', title: 'Save corruption, lost items, and Missing Radar', paragraphs: ['Community reports include lost inventory, upgrades, boat items, and Radar after loading. These reports establish the problem, not a universal cause. Patch 1.0.9 says “Hopefully fixed save files being corrupted” and directs remaining cases to the official Discord.'] },
      { id: 'launch', title: 'Black screens, crashes, and weapon problems', bullets: ['For a join-only black screen, use the Multiplayer page and Relay check.', 'For startup display issues, verify files and current display settings before editing saves.', 'For crashes while equipping weapons, use the official Discord path cited in Patch 1.0.9.', 'Avoid deleting files based on an old community post.'] },
      { id: 'status', title: 'Official fix vs community workaround', paragraphs: ['Official Fix means the patch note states a fix. Attempted Fix preserves cautious wording such as “Hopefully.” Community Workaround means players reported a step, not that the developer verified it. Still Reported means current reports remain after a patch.'] },
      { id: 'performance', title: 'Audio and stuttering', steps: ['Restart the game and close unnecessary overlays.', 'Verify files and update the graphics driver through its official tool.', 'Test lower graphics and a stable frame cap.', 'Record the exact area, action, and patch before reporting.'] },
    ],
    faqs: [{ question: 'Did Patch 1.0.9 completely fix corrupted saves?', answer: 'No. The patch note describes an attempted fix and directs remaining loading or weapon-crash cases to official Discord guidance.' }, { question: 'Can this guide recover lost items?', answer: 'No recovery can be guaranteed. Protect the save copy and follow current official support instructions.' }],
    relatedPages: ['/multiplayer/', '/walkthrough/', '/tips/', '/islands/'], sources: ['patch109', 'patch104', 'saveDiscussion', 'blackScreenDiscussion'],
  }),
];

export const seoPages: GuidePage[] = [...corePages, ...innerPages];

export function getPageByRoute(route: string): GuidePage {
  const normalized = route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
  const result = seoPages.find((item) => item.route === normalized);
  if (!result) throw new Error(`Unknown guide route: ${route}`);
  return result;
}

export const searchEntries = seoPages.map((item) => ({
  title: item.h1,
  summary: item.description,
  href: item.route,
  category: item.eyebrow,
  keywords: [item.primaryKeyword, ...item.secondaryKeywords],
}));
