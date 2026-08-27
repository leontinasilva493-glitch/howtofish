import { siteStatus } from './site-status';
import type { GuidePage } from './types';

const shared: Pick<GuidePage, 'lastUpdated' | 'verifiedPatch' | 'updateLog' | 'indexable'> = {
  lastUpdated: siteStatus.lastChecked,
  verifiedPatch: siteStatus.verifiedPatch,
  updateLog: [{ date: siteStatus.lastChecked, note: 'Route and status rechecked against current patch notes, Steam reports, and attributed gameplay coverage.' }],
  indexable: true,
};

const innerPage = (input: Omit<GuidePage, keyof typeof shared>): GuidePage => ({ ...input, ...shared });

export const p1InnerPages: GuidePage[] = [
  innerPage({
    route: '/bosses/spider-crab/', priority: 'P1', pageType: 'boss-guide', primaryKeyword: 'how to beat spider crab how to fish', secondaryKeywords: ['how to fish spider crab', 'how to fish first boss', 'how to fish empty beer can', 'who stole my beer achievement'],
    title: 'How to Beat Spider Crab in How to Fish', description: 'Get the Empty Beer Can, trigger Spider Crab, punish its missed charge, and complete the Lighthouse hand-in without losing the boss item.', h1: 'How to Beat the Spider Crab', eyebrow: 'Lighthouse · First Boss',
    quickAnswer: 'Buy the Beer Can only after you can afford the attempt, give it to the Lighthouse Keeper, and use the returned Empty Beer Can as bait. Stay close enough to read the charge, move sideways, punish the recovery window, then keep the distinct boss item for the Lighthouse hand-in that opens boat travel.',
    contentStatus: 'current', spoilerLevel: 'minor', keyFacts: [{ label: 'Area', value: 'Lighthouse' }, { label: 'Trigger', value: 'Empty Beer Can' }, { label: 'Fight cue', value: 'Missed charge' }, { label: 'After the fight', value: 'Return the boss item' }],
    sections: [
      { id: 'trigger', title: 'Get the Empty Beer Can', paragraphs: ['The observed route starts with a purchased Beer Can. Give it to the Lighthouse Keeper and keep the empty can returned by the interaction. Media walkthroughs identify that item as the Spider Crab trigger; follow the current objective wording if your patch labels the interaction differently.'] },
      { id: 'prepare', title: 'Prepare a recoverable attempt', bullets: ['Finish the opening tutorial dialogue.', 'Keep enough money for another attempt if the boss escapes.', 'Use a melee weapon you can control rather than copying an exact damage number.', 'Leave room to carry the distinct quest item after the fight.'] },
      { id: 'fight', title: 'Punish the missed charge', paragraphs: ['PC Gamer and Destructoid both describe a readable charge-and-recovery loop. Stay near enough to keep the attack predictable, move sideways as the charge commits, take a short damage window, and reset instead of standing in front of the boss. The white escape bar makes patience more useful than running far away.'] },
      { id: 'hand-in', title: 'The kill is not the final step', paragraphs: ['Pick up the recognizable boss item and return to the Lighthouse Keeper. The official achievement confirms a culprit hand-in, while route reports connect that hand-in to the boat keys. Do not sell or abandon an unusual boss drop before the dialogue advances.'], callout: { tone: 'warning', title: 'Do not sell the quest item', text: 'Keep the distinct Spider Crab item until the Keeper accepts it and boat travel is available.' } },
    ],
    faqs: [{ question: 'Why does Spider Crab keep jumping away?', answer: 'First-hand guides report that creating too much distance makes the fight less predictable and wastes the escape timer. Stay near the arena and sidestep the charge.' }, { question: 'Can I fight it with bare hands?', answer: 'Players have done so, especially in co-op, but a controlled melee weapon gives a safer solo attempt. This guide does not claim one required loadout.' }],
    relatedPages: ['/islands/lighthouse/', '/walkthrough/', '/bosses/giant-piranha/', '/achievements/'], sources: ['steamAchievements', 'pcGamerSpiderCrab', 'destructoidWalkthrough'],
  }),
  innerPage({
    route: '/bosses/giant-piranha/', priority: 'P1', pageType: 'boss-guide', primaryKeyword: 'how to beat giant piranha how to fish', secondaryKeywords: ['how to fish piranha boss', 'how to fish modified leech', 'how to fish second boss', 'how to fish giant piranha skeleton'],
    title: 'How to Beat Giant Piranha in How to Fish', description: 'Complete the three-leech request, use the Modified Leech, manage the smaller piranhas, and return the required boss item.', h1: 'How to Beat the Giant Piranha', eyebrow: 'Forest · Second Boss',
    quickAnswer: 'Finish the Forest NPC request by collecting three ground Leeches and use the returned Modified Leech to start the fight. Keep moving, clear only enough smaller piranhas to protect your route, maintain pressure before the escape bar ends, and return the distinct boss item to the same NPC to advance toward the Desert.',
    contentStatus: 'current', spoilerLevel: 'minor', keyFacts: [{ label: 'Area', value: 'Forest' }, { label: 'Quest count', value: '3 Leeches' }, { label: 'Trigger', value: 'Modified Leech' }, { label: 'Main pressure', value: 'Boss plus smaller piranhas' }],
    sections: [
      { id: 'leeches', title: 'Complete the three-Leech request', paragraphs: ['Destructoid, AllThings.How, and current player routes agree on three ground pickups. Finish the NPC dialogue before searching and use the visible objective counter as the authority. If the pickups are missing, use the dedicated Leeches troubleshooting page instead of inventing a spawn timer.'] },
      { id: 'prepare', title: 'Prepare for a moving fight', bullets: ['Carry a ranged option with ammunition.', 'Keep a simple melee option for nearby small piranhas.', 'Bring recoverable healing food.', 'Leave an open path around the summoning area.'] },
      { id: 'fight', title: 'Control the swarm without losing the boss', paragraphs: ['The fight adds smaller piranhas while the main target remains on an escape timer. Move sideways around attacks, clear the closest adds when they block movement, then return damage to the boss. A shotgun is a common community recommendation, not a required or universal answer.'] },
      { id: 'return', title: 'Return the distinct boss item', paragraphs: ['Media and community routes agree that killing the boss alone does not finish the objective. Pick up the recognizable skeleton or quest item and bring it back to the Forest NPC. If dialogue does not advance, check that you are carrying the trophy rather than ordinary meat.'] },
    ],
    faqs: [{ question: 'Why are there no Leeches?', answer: 'Complete the NPC dialogue and search the ground while watching the pickup prompt. If the counter cannot be completed, follow the cautious reload and report flow on the Leeches fix page.' }, { question: 'Should I use dynamite?', answer: 'Some players report success, but self-damage and losing control of the arena make it a risk. This guide keeps explosives optional.' }],
    relatedPages: ['/islands/forest/', '/fixes/leeches-not-spawning/', '/bosses/pufferfish/', '/walkthrough/'], sources: ['steamAchievements', 'destructoidWalkthrough', 'allThingsFish', 'communityGuide'],
  }),
  innerPage({
    route: '/bosses/pufferfish/', priority: 'P1', pageType: 'boss-guide', primaryKeyword: 'how to beat pufferfish how to fish', secondaryKeywords: ['how to fish pufferfish boss', 'how to fish carrot bait', 'how to fish endangered fish', 'how to fish desert boss'],
    title: 'How to Beat Pufferfish in How to Fish', description: 'Exchange an eligible endangered catch for the Carrot, keep moving during the Pufferfish fight, and preserve the fin hand-in.', h1: 'How to Beat the Pufferfish', eyebrow: 'Desert · Progression Boss',
    quickAnswer: 'Complete the tourist request with an eligible endangered catch, keep the Carrot reward, and use it to trigger Pufferfish. PC Gamer and Destructoid both favor continuous movement and ranged pressure: circle through open lanes, fire during safe gaps, heal before a mistake becomes fatal, and return the distinct fin after the fight.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', keyFacts: [{ label: 'Area', value: 'Desert' }, { label: 'Trigger', value: 'Carrot' }, { label: 'Patch status', value: 'Nerfed in 1.0.4' }, { label: 'Fight rule', value: 'Keep moving' }],
    sections: [
      { id: 'carrot', title: 'Trade for the Carrot', paragraphs: ['The tourist quest asks for an endangered catch before awarding the Carrot. PC Gamer identifies Bowlfish in its run; Destructoid uses Needlefish. That disagreement is why this page says eligible endangered catch rather than declaring one exclusive answer. Follow the live quest response.'] },
      { id: 'loadout', title: 'Bring sustained ranged pressure', paragraphs: ['PC Gamer reports that an upgraded SMG succeeded where its shotgun attempts did not. Treat that as a tested route, not a universal equipment rule. The important preparation is enough ammunition, healing food, and room to move around terrain.'] },
      { id: 'movement', title: 'Move first, fire second', steps: ['Choose a wide route around the available trees and shop area.', 'Keep the boss moving instead of stopping for a long burst.', 'Fire only when your lane is clear and resume movement early.', 'Heal during separation rather than waiting for critical health.'] },
      { id: 'patch', title: 'Difficulty and patch context', paragraphs: ['Patch 1.0.4 officially nerfed Pufferfish, and Patch 1.0.9 added Easy and Hard modifiers. Exact health and damage depend on the selected mode, so old fixed-number guides are not a safe authority. Return the fin or other quest-marked item before leaving the Desert route.'] },
    ],
    faqs: [{ question: 'Which endangered fish gives the Carrot?', answer: 'Published runs show more than one eligible endangered catch. Use the current tourist dialogue and the endangered label instead of relying on one claimed exclusive species.' }, { question: 'Did Patch 1.0.4 make Pufferfish easy?', answer: 'It officially nerfed the boss, but the encounter can still be a movement and equipment check. Patch 1.0.9 difficulty also changes creature health and damage.' }],
    relatedPages: ['/islands/desert/', '/bosses/giant-piranha/', '/bosses/albatross/', '/tips/'], sources: ['patch104', 'patch109', 'pcGamerPufferfish', 'destructoidWalkthrough'],
  }),
  innerPage({
    route: '/bosses/albatross/', priority: 'P1', pageType: 'boss-guide', primaryKeyword: 'how to beat albatross how to fish', secondaryKeywords: ['how to fish albatross boss', 'how to fish terrorizing bird', 'how to fish tuna bait', 'how to fish rocks boss'],
    title: 'How to Beat Albatross in How to Fish', description: 'Catch Tuna with the Professional Boss Lure, use it as the Albatross trigger, fight from cover, and keep the required head.', h1: 'How to Beat the Albatross', eyebrow: 'Rocks · Terrorizing Bird',
    quickAnswer: 'Use the Professional Boss Lure to catch and defeat Tuna, then place the Tuna on the ground to attract Albatross. Fight with a controllable ranged weapon, use a building or solid cover during its distant attack, step out for safe shots, and keep the Albatross head for the island NPC instead of selling it.',
    contentStatus: 'current', spoilerLevel: 'minor', keyFacts: [{ label: 'Area', value: 'Rocks' }, { label: 'Trigger', value: 'Defeated Tuna' }, { label: 'Range', value: 'Ranged fight' }, { label: 'Quest item', value: 'Keep the head' }],
    sections: [
      { id: 'tuna', title: 'Catch Tuna first', paragraphs: ['Both complete media routes use the Professional Boss Lure for Tuna. Defeat it, keep the body, and place it on the ground only when your ranged weapon, ammunition, healing, and inventory are ready. Tuna is the trigger, not a catch to sell first.'] },
      { id: 'cover', title: 'Choose cover before the bird arrives', paragraphs: ['Destructoid reports that Albatross spends time at range and uses a damaging projectile attack. A building gives you a predictable place to break line of sight. Watch the bird from safety, then step out after the attack instead of following it across open ground.'] },
      { id: 'weapon', title: 'Use a weapon you can track with', paragraphs: ['Published runs favor an SMG or sniper rifle and discourage relying on a short-range shotgun. That is practical experience, not a fixed best build. Prioritize a weapon whose recoil and sight picture you can manage while the target moves.'] },
      { id: 'hand-in', title: 'Keep the Albatross head', paragraphs: ['The official Terrorizing bird achievement confirms the encounter. Route sources agree that the distinct head returns to the local NPC and opens the Volcano direction. Verify that hand-in before sailing away.'] },
    ],
    faqs: [{ question: 'Why is Albatross not arriving?', answer: 'Confirm that the Tuna was caught with the boss lure, defeated, and placed where the encounter can see it. Recheck the active island objective before spending another lure.' }, { question: 'Can a shotgun work?', answer: 'It may, but media runs report frequent misses at Albatross range. A controllable longer-range weapon is the safer recommendation.' }],
    relatedPages: ['/islands/rocks/', '/bosses/bowhead-whale/', '/achievements/', '/walkthrough/'], sources: ['steamAchievements', 'destructoidWalkthrough', 'allThingsFish'],
  }),
  innerPage({
    route: '/bosses/bowhead-whale/', priority: 'P1', pageType: 'boss-guide', primaryKeyword: 'how to beat bowhead whale how to fish', secondaryKeywords: ['how to fish whale boss', 'how to fish fish bucket', 'how to fish volcano whale', 'how to summon mutated bowhead whale'],
    title: 'How to Beat Bowhead Whale in How to Fish', description: 'Complete the Volcano fish request, use the Fish Bucket, avoid the airborne slam, and keep the Whale for the final sequence.', h1: 'How to Beat the Bowhead Whale', eyebrow: 'Volcano · Whale Route',
    quickAnswer: 'Complete the Volcano NPC request with the required local catches and keep the Fish Bucket reward for the Bowhead Whale trigger. Use a ranged weapon you can sustain while moving, create distance when the Whale launches upward, heal early, and keep the defeated Whale because current route sources use its body to start the final encounter.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', keyFacts: [{ label: 'Area', value: 'Volcano' }, { label: 'Trigger', value: 'Fish Bucket' }, { label: 'Patch status', value: 'Nerfed in 1.0.4' }, { label: 'Critical item', value: 'Keep the Whale body' }],
    sections: [
      { id: 'bucket', title: 'Earn the Fish Bucket', paragraphs: ['Destructoid reports a five-catch request from the Volcano NPC before the Fish Bucket is awarded. Use Scientific Lure catches that satisfy the live counter, and do not assume that any item outside the visible objective will count.'] },
      { id: 'prepare', title: 'Prepare before spending the trigger', bullets: ['Carry a sustained ranged weapon and enough ammunition.', 'Keep healing items in inventory rather than loose on the ground.', 'Choose open space for the airborne attack.', 'Leave capacity to preserve the defeated Whale.'] },
      { id: 'fight', title: 'Respect the airborne slam', paragraphs: ['The media walkthrough observes a launch-and-stomp pattern. When the Whale goes upward, stop committing to damage and create distance from the expected landing area. Resume pressure after the impact rather than standing beneath the target.'] },
      { id: 'keep', title: 'The Whale is also the next trigger', paragraphs: ['AllThings.How and Destructoid agree that the defeated Bowhead Whale is used in the Volcano sequence that starts the Mutated Bowhead Whale. Do not sell, cook, or abandon the body before the objective advances. Patch 1.0.4 officially nerfed the Whale, while Patch 1.0.9 difficulty still changes current combat values.'] },
    ],
    faqs: [{ question: 'What summons the Bowhead Whale?', answer: 'Current route sources identify the Fish Bucket awarded by the Volcano NPC request.' }, { question: 'Can I sell the Whale after winning?', answer: 'Not if you are continuing the story. Current route sources use the defeated Whale to start the final encounter.' }],
    relatedPages: ['/islands/volcano/', '/bosses/mutated-bowhead-whale/', '/achievements/handyman/', '/walkthrough/'], sources: ['patch104', 'patch109', 'destructoidWalkthrough', 'allThingsFish'],
  }),
  innerPage({
    route: '/fixes/leeches-not-spawning/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish leeches not spawning', secondaryKeywords: ['how to find leeches how to fish', 'how to fish leech location', 'how to fish modified leech', 'how to fish forest quest stuck'],
    title: 'How to Fix Leeches Not Spawning in How to Fish', description: 'Confirm the three-Leech objective, search after full dialogue, preserve your save, and use a cautious reload before reporting a stuck Forest quest.', h1: 'Leeches Not Spawning: Safe Checks', eyebrow: 'Forest Quest · Still Reported',
    quickAnswer: 'Finish the Forest NPC dialogue until the objective visibly asks for three Leeches, then sweep the ground while watching the pickup prompt rather than searching only for a large model. If the counter remains stuck, save and preserve the current state, reload once, and report the patch, host/client role, and exact counter instead of repeatedly overwriting progress.',
    contentStatus: 'still-reported', spoilerLevel: 'minor', keyFacts: [{ label: 'Expected objective', value: '3 Leeches' }, { label: 'Item type', value: 'Ground pickup' }, { label: 'Status', value: 'Still reported' }, { label: 'Recovery', value: 'Community-only' }],
    sections: [
      { id: 'objective', title: 'Confirm the objective is active', paragraphs: ['Three independent route sources agree on three Leeches, but Steam reports show players searching before dialogue has fully advanced. Talk through the NPC interaction and confirm the visible 0/3-style counter before treating the absence as a spawn failure.'] },
      { id: 'search', title: 'Search for a ground pickup', bullets: ['Walk the Forest floor and lake-side area slowly.', 'Watch for the interaction prompt through grass and terrain.', 'Do not switch to a fishing rod expecting a normal catch.', 'Recheck the counter after every pickup.'] },
      { id: 'reload', title: 'Use one controlled reload', paragraphs: ['A Steam thread contains conflicting reports: dialogue helped some players, while others only recovered the pickups after reloading. Preserve the current save, reload once, and recheck the same area. This is a community workaround, not an official fix.'] },
      { id: 'report', title: 'Report a reproducible stuck state', paragraphs: ['Record patch number, solo or multiplayer, host or client, visible objective count, whether the Leeches appeared earlier, and what happened before they disappeared. That evidence is more useful than repeatedly restarting or deleting files.'] },
    ],
    faqs: [{ question: 'How many Leeches are required?', answer: 'Current cross-checked routes agree on three. Use the live counter as the authority after future patches.' }, { question: 'Should I start a new save?', answer: 'Not as a first step. Preserve the existing save, try one controlled reload, and report the state before abandoning progress.' }],
    relatedPages: ['/islands/forest/', '/bosses/giant-piranha/', '/fixes/save-autosave/', '/walkthrough/'], sources: ['steamAchievements', 'leechDiscussion', 'destructoidWalkthrough', 'allThingsFish'],
  }),
  innerPage({
    route: '/fixes/missing-radar/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish missing radar', secondaryKeywords: ['how to fish lost radar', 'how to buy radar how to fish', 'how to find starting island without radar', 'how to fish radar disappeared'],
    title: 'Missing Radar in How to Fish: Recovery Checks', description: 'Protect the save, inspect inventory and the boat, check later-island shop boards, and avoid risky deletion when the Radar disappears.', h1: 'Missing or Lost Radar: What to Check', eyebrow: 'Navigation · Community Recovery',
    quickAnswer: 'Stop before creating more save changes, check inventory slots and the boat for a loose or displaced Radar, then inspect the current island shop board carefully. Several players report replacement Radar availability on later islands, but that is community evidence. Buy or recover one only after confirming the listing and preserve the original save first.',
    contentStatus: 'still-reported', spoilerLevel: 'minor', keyFacts: [{ label: 'Symptom', value: 'Radar missing' }, { label: 'First action', value: 'Protect the save' }, { label: 'Reported option', value: 'Later-island shop board' }, { label: 'Evidence', value: 'Community reports' }],
    sections: [
      { id: 'locate', title: 'Check inventory and physical placement', paragraphs: ['Because this is a physics-driven game, distinguish an inventory loss from an item left on the boat or ground. Search visible slots, the boat deck, nearby terrain, and the shop area before reloading or buying another copy.'] },
      { id: 'shop', title: 'Inspect the current island shop board', paragraphs: ['Multiple replies in the same Steam thread report a Radar listing on Island 2 and later islands, including a placement low on the shop board that was easy to miss. Confirm the actual listing in your session rather than treating every island as guaranteed inventory.'] },
      { id: 'save', title: 'Preserve the save before experiments', steps: ['Exit through the normal game flow if possible.', 'Keep the current save state before testing a reload.', 'Do not delete save files or configuration folders.', 'Record the island and the event that displaced the Radar.'] },
      { id: 'navigate', title: 'If you still cannot navigate', paragraphs: ['Use the current quest direction and known previous route only as a temporary recovery aid. If replacement stock is absent or the Radar disappears again, report the patch and save state through the official community channel.'] },
    ],
    faqs: [{ question: 'Is a replacement Radar on every island?', answer: 'Players report replacement stock on later islands, but this guide does not promote that as an official every-island rule. Check the live shop board.' }, { question: 'Should I delete the save to restore it?', answer: 'No. Deleting data is not a safe first response and there is no guaranteed restoration path.' }],
    relatedPages: ['/islands/', '/islands/forest/', '/fixes/save-autosave/', '/walkthrough/'], sources: ['radarDiscussion', 'destructoidWalkthrough', 'patch109'],
  }),
  innerPage({
    route: '/fixes/multiplayer-black-screen/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish multiplayer black screen', secondaryKeywords: ['how to fish cant join friends', 'how to fish steam relay red', 'how to fish lobby black screen', 'how to fish multiplayer not working'],
    title: 'How to Fish Multiplayer Black Screen Fixes', description: 'Align game versions, recreate the lobby, check the Steam Relay diagnostic, and separate host, client, and save symptoms safely.', h1: 'Multiplayer Black Screen: Safe Fix Order', eyebrow: 'Co-op · Still Reported',
    quickAnswer: 'Update every player to the same current patch, restart Steam and the game, and create a fresh private lobby with a simple server name. Test one host and one joiner before adding the rest. If the Steam Relay indicator turns red, Patch 1.0.9 directs players to the official Community Discord common-bugs guidance.',
    contentStatus: 'still-reported', spoilerLevel: 'none', keyFacts: [{ label: 'Official status', value: 'Attempted fix in 1.0.4' }, { label: 'Diagnostic', value: 'Steam Relay in 1.0.9' }, { label: 'Lobby support', value: 'Up to 8 after 1.0.4' }, { label: 'Status', value: 'Still reported' }],
    sections: [
      { id: 'align', title: 'Align every client first', steps: ['Install the same current game update on host and joiners.', 'Restart Steam and the game after session-type changes.', 'Use a simple server name without special characters.', 'Create a fresh private lobby and send a new invite.'] },
      { id: 'isolate', title: 'Test one host and one joiner', paragraphs: ['A small test separates a general lobby failure from a specific client or larger-session issue. If the join works, add players back one at a time. If it fails, swap host and joiner once and compare whether solo startup still works.'] },
      { id: 'relay', title: 'Read the Steam Relay indicator', paragraphs: ['Patch 1.0.9 added a short Steam connection diagnostic in the main menu. A red Steam Relay result is the official signal to use the #common-bugs guidance in the developer-linked Discord. Do not claim a network accelerator or DNS change can fix every lobby.'] },
      { id: 'status', title: 'Understand the patch wording', paragraphs: ['Patch 1.0.4 said the join black screen was hopefully fixed, not permanently eliminated. The same patch added support for up to eight-player lobbies, while the store still describes the original 1–4-player positioning. Preserve both facts instead of calling the base game natively eight-player.'] },
    ],
    faqs: [{ question: 'Does the current game support eight players?', answer: 'Patch 1.0.4 added support for lobbies of up to eight. The Steam store still positions the original experience as 1–4 players.' }, { question: 'What does red Steam Relay text mean?', answer: 'Patch 1.0.9 says connection initialization failed and directs players to the official Discord common-bugs guidance.' }],
    relatedPages: ['/multiplayer/', '/fixes/save-autosave/', '/fixes/error-0x11c7/', '/community/'], sources: ['patch104', 'patch109', 'blackScreenDiscussion'],
  }),
  innerPage({
    route: '/fixes/save-autosave/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish save autosave fix', secondaryKeywords: ['how to fish lost items', 'how to fish corrupted save', 'how to fish guns disappeared', 'how to fish save not working'],
    title: 'How to Fish Save & Autosave: Lost Item Checks', description: 'Protect the affected save, separate inventory from loose-world items, understand the attempted Patch 1.0.9 fix, and report recoverable evidence.', h1: 'Save, Autosave, and Missing Items', eyebrow: 'Save Safety · Attempted Fix',
    quickAnswer: 'Stop making repeated save changes after inventory or weapons disappear. Preserve the affected state, confirm whether the items were in inventory or left loose on the boat or ground, update to the current patch, and test one normal reload. Patch 1.0.9 says corruption was hopefully fixed; it does not promise that an old loss can be recovered.',
    contentStatus: 'attempted-fix', spoilerLevel: 'none', keyFacts: [{ label: 'Patch wording', value: 'Hopefully fixed' }, { label: 'Recovery', value: 'Not guaranteed' }, { label: 'Developer note', value: 'Inventory differs from loose items' }, { label: 'First action', value: 'Preserve evidence' }],
    sections: [
      { id: 'stop', title: 'Stop compounding the loss', bullets: ['Do not repeatedly save over the affected state.', 'Do not delete files based on an old workaround.', 'Record the patch, island, host/client role, and last known good event.', 'Exit normally if the session is still responsive.'] },
      { id: 'inventory', title: 'Separate inventory from loose-world items', paragraphs: ['In a Steam thread, the developer explained that only inventory was saved in the reported build and acknowledged that leaving upgraded equipment behind was frustrating. Check whether missing items were stored in inventory, dropped on the ground, or left on the boat; those states do not prove the same failure.'] },
      { id: 'patch', title: 'Patch 1.0.9 is an attempted fix', paragraphs: ['The official note says save-file corruption was hopefully fixed and directs remaining load or weapon-equip crashes to the Community Discord. Preserve that cautious wording: the patch is not a recovery tool and cannot guarantee restoration of items already lost.'] },
      { id: 'report', title: 'Capture a useful report', steps: ['List the missing item types and whether they were in inventory.', 'Record solo, host, or client state.', 'Note whether death, disconnect, update, or reload happened first.', 'Report the current patch and whether the save still loads.', 'Use official support guidance before editing any files.'] },
    ],
    faqs: [{ question: 'Did Patch 1.0.9 fix every corrupted save?', answer: 'No. The developer used “hopefully fixed” and provided an escalation path for remaining cases.' }, { question: 'Can reinstalling restore missing equipment?', answer: 'There is no supported guarantee that reinstalling recreates lost save-state items. Preserve the save and follow official support first.' }],
    relatedPages: ['/fixes/', '/fixes/missing-radar/', '/fixes/multiplayer-black-screen/', '/multiplayer/'], sources: ['patch109', 'saveDiscussion', 'inventorySaveDiscussion'],
  }),
  innerPage({
    route: '/fixes/error-0x11c7/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish error 0x11c7', secondaryKeywords: ['how to fish application control policy blocked', 'how to fish smart app control', 'how to fish game wont launch', 'how to fish code integrity'],
    title: 'How to Fish Error 0x11C7: Safe Windows Checks', description: 'Confirm the application-control block, update Windows and Defender, verify or reinstall the game, and avoid weakening security as a first step.', h1: 'Error 0x11C7: Application Control Block', eyebrow: 'Windows Launch · Security Boundary',
    quickAnswer: 'Error 0x11C7 means Windows reports that an application-control policy blocked the process. Update Windows and Defender, verify the Steam files, restart, and reinstall the current official build if needed. Check Windows Security and Code Integrity logs to confirm the blocker, then report it to Dazed Games before changing Smart App Control or another security policy.',
    contentStatus: 'still-reported', spoilerLevel: 'none', keyFacts: [{ label: 'Error family', value: 'Windows application control' }, { label: 'Reported code', value: '0x11C7' }, { label: 'First response', value: 'Update and verify' }, { label: 'Security', value: 'Do not bypass first' }],
    sections: [
      { id: 'identify', title: 'Confirm the exact Windows block', paragraphs: ['A How to Fish player report includes “An application control policy has blocked this file” and a Code Integrity event. Capture the full Steam or Windows message and confirm that the affected executable is the official Steam installation before treating it as the same issue.'] },
      { id: 'safe', title: 'Run reversible checks first', steps: ['Install current Windows and Microsoft Defender updates.', 'Restart Windows.', 'Verify How to Fish through Steam Installed Files.', 'If the block remains, uninstall and reinstall the current official Steam build.', 'Recheck the same error and Code Integrity event.'] },
      { id: 'sac', title: 'Understand Smart App Control before changing it', paragraphs: ['Microsoft says Smart App Control works alongside antivirus protection and blocks apps it cannot trust through reputation or signatures. Microsoft guidance about re-enabling it can vary by Windows release and device state. This guide therefore does not tell you to disable it as a routine fix.'] },
      { id: 'escalate', title: 'Escalate the evidence', paragraphs: ['Report the Windows version, game patch, full error, Code Integrity event ID, and whether a clean reinstall changed the result. Contact the developer-linked community channel so a signing or reputation issue can be addressed without asking players to weaken protection.'], callout: { tone: 'warning', title: 'Security boundary', text: 'Do not edit registry policy keys, delete Code Integrity policies, or disable protection based only on a community post.' } },
    ],
    faqs: [{ question: 'Should I turn off Smart App Control?', answer: 'Not as a first step. Microsoft treats it as a security control, and re-enabling behavior depends on the Windows release and device state. Update, verify, reinstall, and report first.' }, { question: 'Does verifying Steam files always fix 0x11C7?', answer: 'No. One How to Fish report remained blocked after verification; a later reinstall helped one player. Neither result is a guaranteed fix.' }],
    relatedPages: ['/fixes/', '/fixes/multiplayer-black-screen/', '/fixes/save-autosave/', '/multiplayer/'], sources: ['error011c7Discussion', 'microsoftSmartAppControl', 'steamStore'],
  }),
];

export const p2AchievementPages: GuidePage[] = [
  innerPage({
    route: '/achievements/bean/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: 'how to fish bean achievement', secondaryKeywords: ['how to fish finish under one hour', 'how to fish speedrun achievement', 'how to fish bean route', 'how to fish patch 1.0.5 bean'],
    title: 'How to Get Bean in How to Fish', description: 'Plan a current-patch sub-one-hour attempt after Patch 1.0.5 removed the old island-skip route, without risking your main save.', h1: 'Bean Achievement: Current-Patch Plan', eyebrow: 'Challenge · Finish Within One Hour',
    quickAnswer: 'Bean requires finishing the game within one hour. Patch 1.0.5 closed the old travel-to-any-island bug, so use a fresh practice save, follow the five-stage story route, buy only what removes the next blocker, and keep every boss hand-in. Community reports say current legitimate runs remain possible, but exact timing depends on patch and mode.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', keyFacts: [{ label: 'Official requirement', value: 'Finish within 1 hour' }, { label: 'Old shortcut', value: 'Closed in 1.0.5' }, { label: 'Recommended save', value: 'Separate practice save' }, { label: 'Status', value: 'Version-sensitive' }],
    sections: [
      { id: 'official', title: 'Follow the literal requirement', paragraphs: ['Steam requires a completed game within one hour. It does not define an approved skip, loadout, party size, or difficulty. Build the attempt around a clean finish and the current objective chain.'] },
      { id: 'patch', title: 'Discard the old island-skip route', paragraphs: ['Patch 1.0.5 explicitly fixed travel to islands before they were unlocked. Videos and guides made on the previous build can still rank while pointing at a route that no longer works.'] },
      { id: 'practice', title: 'Practice the five hand-ins', steps: ['Rehearse Lighthouse and boat access.', 'Rehearse the three-Leech and Giant Piranha hand-in.', 'Rehearse the Carrot and Pufferfish route.', 'Rehearse Tuna into Albatross.', 'Rehearse the Fish Bucket, Whale, final boss, and final hand-in.'] },
      { id: 'attempt', title: 'Protect the main save', paragraphs: ['Use a separate save for timed practice, keep purchases limited to immediate progression, and stop the attempt when a required item is lost. Community reports discuss successful current-patch runs, but this page does not promise a fixed minute-by-minute split.'] },
    ],
    faqs: [{ question: 'Does the old direct-to-Volcano route work?', answer: 'Patch 1.0.5 says travel to locked islands was fixed, so the old skip is not a reliable current route.' }, { question: 'Does Easy mode invalidate Bean?', answer: 'The official requirement does not mention difficulty. Players report current runs on Easy, but confirm the live achievement behavior before relying on that report.' }],
    relatedPages: ['/walkthrough/', '/achievements/', '/bosses/pufferfish/', '/bosses/bowhead-whale/'], sources: ['steamAchievements', 'patch105', 'beanDiscussion', 'communityGuide'],
  }),
  innerPage({
    route: '/achievements/fishipedia/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: 'how to fish fishipedia achievement', secondaryKeywords: ['how to fish all drip creatures', 'how to fish drip variants', 'how to fish fishipedia checklist', 'how to fish rare fish'],
    title: 'How to Get Fishipedia in How to Fish', description: 'Track Drip variants with the in-game encyclopedia and local checklist, understand the Patch 1.0.5 fix, and clean up missing entries.', h1: 'Fishipedia: Find All Drip Creatures', eyebrow: 'Collection · Drip Variants',
    quickAnswer: 'Fishipedia requires finding and killing all Drip creatures. Use the in-game encyclopedia as the authority, compare its gaps with the local Fishipedia tracker, and work through lure tiers methodically. Patch 1.0.5 fixed the achievement requiring one extra Drip after completing the set, so old “all plus one” instructions are outdated.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', keyFacts: [{ label: 'Official requirement', value: 'All Drip creatures' }, { label: 'Tracker', value: 'In-game encyclopedia' }, { label: 'Patch fix', value: 'All + 1 fixed in 1.0.5' }, { label: 'Spawn rates', value: 'Not claimed' }],
    sections: [
      { id: 'official', title: 'Use the in-game encyclopedia first', paragraphs: ['Steam defines the goal as finding and killing all Drip creatures. The live encyclopedia knows your actual account state; this site stores a private planning checklist and does not connect to Steam.'] },
      { id: 'patch', title: 'Ignore the obsolete extra-Drip workaround', paragraphs: ['Patch 1.0.5 says Fishipedia previously failed until the player found all Drip creatures plus one. The patch corrected that condition, so another catch after completion should not be treated as the current requirement.'] },
      { id: 'route', title: 'Clean up by lure tier', steps: ['Check the missing encyclopedia entries.', 'Filter the Fish database by the first documented progression stage.', 'Equip the cross-checked lure and rod for that catch.', 'Confirm the kill updates the in-game entry before moving on.', 'Record conflicts rather than assuming an exclusive island.'] },
      { id: 'boundary', title: 'Do not invent a spawn rate', paragraphs: ['Drip frequency, variant eligibility, and area behavior remain version-sensitive. The database shows cross-checked catch relationships but does not promise a percentage or a fixed location for a rare variant.'] },
    ],
    faqs: [{ question: 'Do I still need all Drip creatures plus one?', answer: 'No. Patch 1.0.5 says that extra requirement was a bug and was fixed.' }, { question: 'Does the local checklist unlock the achievement?', answer: 'No. It is a browser-only planning tool. Steam and the in-game encyclopedia remain authoritative.' }],
    relatedPages: ['/fish/', '/achievements/', '/tips/', '/fixes/save-autosave/'], sources: ['steamAchievements', 'patch105', 'communityGuide', 'allThingsFish', 'g2aFishList'],
  }),
  innerPage({
    route: '/achievements/rich-millionaire/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: 'how to fish rich millionaire achievement', secondaryKeywords: ['how to fish sell 100000', 'how to fish millionaire guide', 'how to fish money achievement', 'how to fish valuable catch'],
    title: 'How to Get Rich! Millionaire in How to Fish', description: 'Build one qualifying sale with a valuable catch, cooking and Killscore evidence while protecting quest items and avoiding guaranteed formulas.', h1: 'Rich! Millionaire: One 100,000 Sale', eyebrow: 'Economy · Single-Item Sale',
    quickAnswer: 'Rich! Millionaire requires selling something worth 100,000 or more; it is not a wallet-balance target. Finish the story first, choose a replaceable high-value catch, use only value multipliers you can see in the live inspection UI, and verify the displayed sale value before selling. Do not gamble or cook a quest-critical body for the attempt.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', keyFacts: [{ label: 'Official requirement', value: 'One sale worth 100,000+' }, { label: 'Wallet total', value: 'Does not satisfy wording' }, { label: 'Best stage', value: 'Post-game cleanup' }, { label: 'Formula', value: 'Use live displayed value' }],
    sections: [
      { id: 'requirement', title: 'Target one qualifying item', paragraphs: ['The Steam wording says “Sell something worth 100,000 or more.” Build the attempt around the value shown for one item rather than saving 100,000 across multiple sales.'] },
      { id: 'prepare', title: 'Finish progression before value farming', paragraphs: ['Later lure tiers and post-game travel make collection cleanup less disruptive. Complete required hand-ins first so a high-value story body is not destroyed for an optional achievement attempt.'] },
      { id: 'multipliers', title: 'Use visible value changes', bullets: ['Inspect the item before modifying it.', 'Use cooking only while its live multiplier remains beneficial.', 'Treat Killscore and trick-shot bonuses as version-sensitive.', 'Confirm the final displayed value before selling.'] },
      { id: 'risk', title: 'Keep the attempt replaceable', paragraphs: ['Gambling outcomes and community money routes do not guarantee a qualifying sale. Use an item you can reacquire, preserve expensive weapons, and stop if the displayed value does not meet the official threshold.'] },
    ],
    faqs: [{ question: 'Do I need 100,000 in my wallet?', answer: 'The official wording targets one item sold for 100,000 or more, not the wallet balance.' }, { question: 'Which fish guarantees the achievement?', answer: 'This guide does not claim a guaranteed species or formula. Use the current displayed value on a replaceable high-value catch.' }],
    relatedPages: ['/achievements/', '/fish/', '/tips/', '/bosses/bowhead-whale/'], sources: ['steamAchievements', 'communityGuide', 'allThingsFish'],
  }),
  innerPage({
    route: '/achievements/360-no-scope/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: 'how to fish 360 no scope achievement', secondaryKeywords: ['how to fish 360 no scope', 'how to fish trick shot achievement', 'how to fish killscore', 'how to fish no scope'],
    title: 'How to Get 360 No Scope in How to Fish', description: 'Set up a low-risk target, complete a visible rotation, fire without aiming down sights, and verify the Steam unlock.', h1: '360 No Scope Achievement Guide', eyebrow: 'Combat · Trick Shot',
    quickAnswer: 'Steam requires killing a creature with a 360 no scope. Use a low-risk creature you can finish in one controlled shot, create enough open space for a complete rotation, do not aim down sights, and fire only after the turn is visibly complete. Community timing observations can help practice, but the literal Steam requirement remains the authority.',
    contentStatus: 'version-sensitive', spoilerLevel: 'none', keyFacts: [{ label: 'Official requirement', value: 'Kill with a 360 no scope' }, { label: 'Target', value: 'Low-risk creature' }, { label: 'Aim', value: 'No ADS' }, { label: 'Verification', value: 'Steam unlock' }],
    sections: [
      { id: 'setup', title: 'Choose a controlled setup', paragraphs: ['Use open ground and a creature whose remaining health you understand from the live fight. Avoid a boss trigger, quest item, or valuable catch while learning the rotation.'] },
      { id: 'rotation', title: 'Make the rotation readable', steps: ['Place the target where it will remain visible.', 'Lower sensitivity only if you can restore it safely.', 'Complete the full turn before firing.', 'Keep aim-down-sights released.', 'Check Steam after the kill.'] },
      { id: 'community', title: 'Treat timing advice as community evidence', paragraphs: ['Players report some leniency and more than one mouse movement, but the game does not publish an angle tolerance. Practice the literal full rotation instead of trying to exploit an unknown threshold.'] },
      { id: 'retry', title: 'Use cheap retries', paragraphs: ['If the achievement does not unlock, recheck that the creature died from the unscoped shot after the rotation. Do not infer failure from delayed Steam UI alone; confirm after the session synchronizes.'] },
    ],
    faqs: [{ question: 'Can I split the turn across mouse swipes?', answer: 'Players report that they can, but no official tolerance is published. Make the full rotation visually clear.' }, { question: 'Should I use a boss?', answer: 'No. A low-risk ordinary creature gives cheaper and more repeatable attempts.' }],
    relatedPages: ['/achievements/', '/tips/', '/fish/', '/achievements/everyones-dream/'], sources: ['steamAchievements', 'communityGuide', 'tipsVideo'],
  }),
  innerPage({
    route: '/achievements/handyman/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: 'how to fish handyman achievement', secondaryKeywords: ['how to fish final boss bare hands', 'how to fish handyman guide', 'how to fish mutated bowhead whale fists', 'how to fish patch 1.0.4 handyman'],
    title: 'How to Get Handyman in How to Fish', description: 'Prepare a separate final-boss attempt, follow the literal bare-hands requirement, and account for the Patch 1.0.4 achievement fix.', h1: 'Handyman: Final Boss With Bare Hands', eyebrow: 'Challenge · Final Boss',
    quickAnswer: 'Handyman officially requires defeating the final boss with bare hands. Patch 1.0.4 fixed the achievement for all players, but community claims that only the final hit must be unarmed remain version-sensitive. For the safest attempt, use a separate prepared save, bring healing, and keep the entire final damage sequence within the literal bare-hands requirement.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', keyFacts: [{ label: 'Official requirement', value: 'Final boss with bare hands' }, { label: 'Patch fix', value: '1.0.4' }, { label: 'Final-hit shortcut', value: 'Unconfirmed' }, { label: 'Risk', value: 'High' }],
    sections: [
      { id: 'literal', title: 'Follow the literal Steam wording', paragraphs: ['The achievement does not say “land the final hit” or authorize weapon damage first. Those are community interpretations. An evidence-safe guide recommends a full bare-hands defeat until the developer documents a narrower condition.'] },
      { id: 'patch', title: 'Patch 1.0.4 fixed the unlock', paragraphs: ['Dazed Games says the final-boss bare-hands achievement was fixed for everyone. Attempts and guides from an earlier build may describe a broken unlock state that no longer applies.'] },
      { id: 'prepare', title: 'Prepare a recoverable challenge save', bullets: ['Reach the final sequence on the current patch.', 'Use a separate save from the main completion route.', 'Carry healing that does not require dropping critical equipment.', 'Choose the difficulty before consuming the trigger.', 'Preserve the final hand-in item after the fight.'] },
      { id: 'fight', title: 'Prioritize survival over damage claims', paragraphs: ['Use the final-boss guide for movement and attack cues, but do not copy fixed health or phase numbers. Keep moving, heal early, and make every damaging action bare-handed for the clearest compliance with the requirement.'] },
    ],
    faqs: [{ question: 'Does only the final punch need to be bare-handed?', answer: 'That is a community claim and is not in the official description. A full bare-hands defeat is the safer interpretation.' }, { question: 'Was Handyman broken at launch?', answer: 'Patch 1.0.4 says the final-boss bare-hands achievement was fixed for everyone.' }],
    relatedPages: ['/bosses/mutated-bowhead-whale/', '/bosses/bowhead-whale/', '/achievements/', '/islands/volcano/'], sources: ['steamAchievements', 'patch104', 'communityGuide'],
  }),
  innerPage({
    route: '/achievements/everyones-dream/', priority: 'P1', pageType: 'achievement-guide', primaryKeyword: "how to fish everyone's dream achievement", secondaryKeywords: ['how to fish kill seagull with dynamite', 'how to fish seagull achievement', 'how to fish dynamite guide', 'how to fish everyones dream'],
    title: "How to Get Everyone's Dream in How to Fish", description: 'Create a cheap post-game seagull setup, use dynamite for the kill, and avoid risking story catches or expensive equipment.', h1: "Everyone's Dream: Seagull With Dynamite", eyebrow: 'Challenge · Dynamite',
    quickAnswer: "Everyone's Dream requires killing a Seagull with dynamite. Attempt it after story progression with inexpensive bait and an open area: place a replaceable catch where a Seagull can approach, keep the dynamite blast away from yourself and important gear, and make sure the explosion—not a gunshot or fall—delivers the kill.",
    contentStatus: 'version-sensitive', spoilerLevel: 'none', keyFacts: [{ label: 'Official requirement', value: 'Seagull killed by dynamite' }, { label: 'Best stage', value: 'Post-game cleanup' }, { label: 'Bait setup', value: 'Community method' }, { label: 'Risk', value: 'Blast damage' }],
    sections: [
      { id: 'requirement', title: 'Preserve the cause of the kill', paragraphs: ['Steam requires the Seagull to be killed with dynamite. Do not weaken it with a final gunshot or rely on another source of damage if you want a clean attempt.'] },
      { id: 'setup', title: 'Use a replaceable bait setup', paragraphs: ['Community routes place an ordinary catch near dynamite to draw a Seagull down. Treat that as a practical setup, not an official spawn rule, and never use a boss body or required hand-in item as bait.'] },
      { id: 'safety', title: 'Protect yourself and the save', steps: ['Choose open ground away from the boat and shop.', 'Drop expensive equipment into inventory rather than nearby terrain.', 'Place the replaceable catch and dynamite with room to retreat.', 'Wait for a clear Seagull approach.', 'Trigger the blast from a safe distance using a current in-game method.'] },
      { id: 'verify', title: 'Verify the Steam unlock', paragraphs: ['If the achievement does not appear, confirm that the explosion delivered the kill and that Steam synchronized. Reset with another cheap catch instead of reusing story-critical items.'] },
    ],
    faqs: [{ question: 'Does shooting dynamite count?', answer: 'Community routes use a shot to detonate placed dynamite, but the resulting explosion still needs to kill the Seagull. Verify against the live achievement.' }, { question: 'Where should I attempt it?', answer: 'Use open post-game space where the blast cannot destroy important equipment or interrupt progression.' }],
    relatedPages: ['/achievements/', '/achievements/360-no-scope/', '/fish/', '/tips/'], sources: ['steamAchievements', 'communityGuide', 'steamMedia'],
  }),
];

export const innerPages: GuidePage[] = [...p1InnerPages, ...p2AchievementPages];

export type InnerRouteGroup = 'bosses' | 'fixes' | 'achievements';

export function getInnerRoutePage(group: InnerRouteGroup, slug: string) {
  return innerPages.find((page) => page.route === `/${group}/${slug}/`);
}

export function getInnerStaticParams(group: InnerRouteGroup) {
  const prefix = `/${group}/`;
  return innerPages
    .filter((page) => page.route.startsWith(prefix))
    .map((page) => ({ slug: page.route.slice(prefix.length).replace(/\/$/, '') }));
}
