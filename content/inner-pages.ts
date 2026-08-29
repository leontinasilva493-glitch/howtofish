import { siteStatus } from './site-status';
import type { GuidePage } from './types';

const shared: Pick<GuidePage, 'lastUpdated' | 'verifiedPatch' | 'updateLog' | 'indexable'> = {
  lastUpdated: siteStatus.lastChecked,
  verifiedPatch: siteStatus.verifiedPatch,
  updateLog: [{ date: siteStatus.lastChecked, note: 'Route and status rechecked against current patch notes, Steam reports, and attributed gameplay coverage.' }],
  indexable: true,
};

const innerPage = (input: Omit<GuidePage, keyof typeof shared> & Partial<typeof shared>): GuidePage => ({ ...shared, ...input });

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
    route: '/bosses/pufferfish/', priority: 'P0', pageType: 'boss-guide', primaryKeyword: 'how to beat pufferfish how to fish', secondaryKeywords: ['how to fish pufferfish boss', 'how to fish carrot bait', 'how to fish endangered fish', 'how to fish pufferfish poison'],
    title: 'How to Beat Pufferfish in How to Fish', description: 'Choose the correct Carrot quest branch, read the purple poison cue, follow a safe solo movement loop, and complete the fin hand-in.', h1: 'How to Beat the Pufferfish', eyebrow: 'Desert · P0 Boss Route',
    quickAnswer: 'Complete the tourist’s endangered-catch request, keep the Carrot reward, and use it to trigger Pufferfish. Circle through open lanes, fire only while moving, and leave purple poison immediately instead of timing another burst. For solo, prioritize ammunition and healing; after the kill, keep the distinct fin and finish the tourist hand-in.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-pufferfish.jpg', imageAlt: 'Official How to Fish screenshot showing the Pufferfish encounter', keyFacts: [{ label: 'Area', value: 'Desert' }, { label: 'Trigger', value: 'Carrot' }, { label: 'Patch status', value: 'Nerfed in 1.0.4' }, { label: 'Poison cue', value: 'Exit purple ground immediately' }],
    sections: [
      { id: 'carrot', title: 'Which catch unlocks the Carrot?', paragraphs: ['The tourist asks for an endangered catch before awarding the Carrot. PC Gamer records Bowlfish; Destructoid records Needlefish. Because those first-hand routes disagree, inspect the catch with the live UI and use the quest response as the authority instead of treating either species as the only valid branch.'] },
      { id: 'solo-loadout', title: 'What should a solo loadout prioritize?', paragraphs: ['PC Gamer succeeded with an upgraded SMG after unsuccessful shotgun attempts. That is one tested route, not a required loadout. Solo preparation should solve three observable needs: sustained ranged pressure, enough ammunition to avoid a forced stop, and healing that can be used without crossing the boss’s path.'] },
      { id: 'poison-timing', title: 'How should you time the purple poison cloud?', paragraphs: ['Do not count a fixed number of seconds. When purple poison occupies the next part of your loop, stop extending the damage window and leave it immediately; PC Gamer describes the damage ticks as becoming lethal quickly. Re-enter only after you can see clean ground and a clear route.'] },
      { id: 'movement', title: 'Which movement loop survives each phase?', steps: ['Start with a wide circle through open lanes around trees and the shop.', 'Keep the boss turning instead of backing into the edge of the island.', 'Fire in short moving bursts; never plant your feet for a full magazine.', 'When poison cuts the route, widen or reverse before taking another shot.', 'Heal during separation, then rebuild the loop before resuming pressure.'] },
      { id: 'hand-in', title: 'What must you do after the kill?', paragraphs: ['Pick up the distinct fin or quest-marked result and return it to the tourist before leaving the Desert route. A boss kill without the hand-in is not the full progression step. If the dialogue does not advance, confirm you carried the trophy rather than ordinary meat.'] },
    ],
    evidenceRows: [
      { topic: 'Difficulty', official: 'Patch 1.0.4 nerfed Pufferfish; Patch 1.0.9 added Easy and Hard creature modifiers.', community: 'Current guides still describe the encounter as a major movement check.', guidance: 'Use the selected mode as context; do not copy fixed HP or damage tables.' },
      { topic: 'Carrot branch', official: 'No official patch note publishes one eligible species.', community: 'PC Gamer records Bowlfish while Destructoid records Needlefish.', guidance: 'Follow the live endangered label and tourist response.' },
      { topic: 'Weapon and poison', official: 'The developer does not publish a required weapon or poison timer.', community: 'An upgraded SMG, constant movement, trees, and immediate poison exits are repeated first-hand observations.', guidance: 'Treat them as a safe route, not a guarantee.' },
    ],
    failureBranches: [
      { symptom: 'The tourist will not give the Carrot', likelyState: 'Wrong quest stage or catch not accepted as endangered', nextStep: 'Re-read the objective, inspect the catch, and try the live quest response before farming another species.' },
      { symptom: 'Pufferfish never appears', likelyState: 'Carrot not equipped or another encounter remains active', nextStep: 'Confirm the Carrot is still present, the quest is active, and no boss is already running.' },
      { symptom: 'Poison kills the run', likelyState: 'Damage burst continued after the purple ground cue', nextStep: 'Leave immediately on the cue and rebuild the movement loop before firing again.' },
      { symptom: 'The island does not advance after the kill', likelyState: 'Fin or quest trophy was not returned', nextStep: 'Recover the distinct result and finish the tourist hand-in before sailing away.' },
    ],
    media: {
      video: { href: 'https://www.youtube.com/watch?v=M2isiOmxH7w', embedUrl: 'https://www.youtube-nocookie.com/embed/M2isiOmxH7w', title: 'Pufferfish fight video reference', description: 'Use the footage to study route shape and poison cues. The page does not convert one run into a fixed timer or required loadout.', sourceId: 'pufferfish-video' },
      gallery: [
        { src: '/assets/how-to-fish/steam-pufferfish.jpg', alt: 'Official screenshot of the Pufferfish encounter in How to Fish', caption: 'Official encounter context; not a health or timing reference.', sourceId: 'steam-media' },
        { src: '/assets/how-to-fish/steam-gear.jpg', alt: 'Official How to Fish screenshot showing weapons and equipment', caption: 'Official equipment context for preparing a replaceable ranged setup.', sourceId: 'steam-media' },
        { src: '/assets/how-to-fish/steam-catch.jpg', alt: 'Official How to Fish screenshot showing a caught creature near shore', caption: 'Official catch context; use the live item label for the endangered branch.', sourceId: 'steam-media' },
      ],
    },
    faqs: [{ question: 'Which endangered fish gives the Carrot?', answer: 'Published runs show more than one eligible endangered catch. Use the current tourist dialogue and the endangered label instead of relying on one claimed exclusive species.' }, { question: 'Did Patch 1.0.4 make Pufferfish easy?', answer: 'It officially nerfed the boss, but the encounter can still be a movement and equipment check. Patch 1.0.9 difficulty also changes creature health and damage.' }],
    relatedPages: ['/islands/desert/', '/bosses/giant-piranha/', '/bosses/albatross/', '/tips/'], sources: ['patch104', 'patch109', 'pcGamerPufferfish', 'destructoidWalkthrough', 'pufferfishVideo', 'steamMedia'],
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
      { id: 'objective', title: 'Is the three-Leech objective actually active?', paragraphs: ['Three independent route sources agree on three Leeches, but Steam reports show players searching before dialogue has fully advanced. Talk through the NPC interaction and confirm the visible 0/3-style counter before treating the absence as a spawn failure.'] },
      { id: 'search', title: 'Are you searching for a ground pickup?', bullets: ['Walk the Forest floor and lake-side area slowly.', 'Watch for the interaction prompt through grass and terrain.', 'Do not switch to a fishing rod expecting a normal catch.', 'Recheck the counter after every pickup.'] },
      { id: 'reload', title: 'When should you try one controlled reload?', paragraphs: ['A Steam thread contains conflicting reports: dialogue helped some players, while others only recovered the pickups after reloading. Preserve the current save, reload once, and recheck the same area. This is a community workaround, not an official fix.'] },
      { id: 'host-client', title: 'Does host or client state change the diagnosis?', paragraphs: ['If the objective works for the host but not a joining player, stop treating it as a universal spawn absence. Record who owns the save, who sees the counter, and whether each player can see or collect the same pickup before recreating the lobby.'] },
      { id: 'report', title: 'What makes a reproducible stuck-state report?', paragraphs: ['Record patch number, solo or multiplayer, host or client, visible objective count, whether the Leeches appeared earlier, and what happened before they disappeared. That evidence is more useful than repeatedly restarting or deleting files.'] },
    ],
    evidenceRows: [
      { topic: 'Quest target', official: 'Steam lists Dinnertime, but does not publish a Leech spawn map.', community: 'Independent routes agree that the Forest request uses three ground Leeches.', guidance: 'Use the live objective counter as the deciding evidence.' },
      { topic: 'Recovery', official: 'No patch note guarantees a Leech recovery command.', community: 'Full dialogue helped some players; one controlled reload helped others.', guidance: 'Try reversible checks once, then report the exact state.' },
    ],
    failureBranches: [
      { symptom: 'No Leech counter appears', likelyState: 'NPC dialogue or earlier objective is incomplete', nextStep: 'Finish the full conversation and wait for the visible objective before searching.' },
      { symptom: 'Counter is active but no prompt appears', likelyState: 'Pickup is obscured or the spawn state is stuck', nextStep: 'Sweep slowly for prompts, preserve the save, then try one reload.' },
      { symptom: 'Host can collect them but a client cannot', likelyState: 'Session replication or quest ownership issue', nextStep: 'Record host/client behavior and recreate a small private lobby before adding players.' },
      { symptom: 'Counter stays below three after pickup', likelyState: 'Quest state did not register', nextStep: 'Stop repeated overwrites and report the counter, patch, role, and last successful pickup.' },
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
    route: '/fixes/black-screen/', priority: 'P1', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish game black screen', secondaryKeywords: ['how to fish multiplayer black screen', 'how to fish cant join friends', 'how to fish steam relay red', 'how to fish 8 player lobby black screen'],
    title: 'How to Fish Game Black Screen: Lobby Fix Order', description: 'Separate solo startup from join-only black screens, test the intended 1–4 flow before larger rooms, and use the Steam Relay diagnostic.', h1: 'How to Fish Black Screen: Safe Lobby Checks', eyebrow: 'Co-op · Still Reported',
    quickAnswer: 'First confirm the game reaches solo play, then update every player, restart Steam, and create a fresh private lobby with a simple name. Test one host and one joiner, expand to the intended 1–4 group, and only then test players five through eight. If Steam Relay is red, use the developer-linked common-bugs guidance.',
    contentStatus: 'still-reported', spoilerLevel: 'none', image: '/assets/how-to-fish/steam-quest.jpg', imageAlt: 'Official How to Fish screenshot showing players together during a quest', keyFacts: [{ label: 'Official status', value: 'Attempted fix in 1.0.4' }, { label: 'Diagnostic', value: 'Steam Relay in 1.0.9' }, { label: 'Core test', value: '1–4 players first' }, { label: 'Extended test', value: 'Players 5–8 separately' }],
    sections: [
      { id: 'scope', title: 'Is this a startup black screen or a join-only black screen?', paragraphs: ['If solo play reaches the world but joining a friend turns black, keep the diagnosis on multiplayer and Steam connection state. If solo also fails, use the fixes hub for display, file, or launch checks instead of repeatedly recreating lobbies.'] },
      { id: 'align', title: 'Are every host and client on the same build?', steps: ['Install the same current game update on host and joiners.', 'Restart Steam and the game after session-type changes.', 'Use a simple server name without special characters.', 'Create a fresh private lobby and send a new invite.'] },
      { id: 'one-to-four', title: 'Does the intended 1–4 player room work?', paragraphs: ['Start with one host and one joiner, then add players up to four one at a time. This tests the store-described design before introducing the later eight-slot support. Swap the host once if the first joiner consistently fails while solo play works.'] },
      { id: 'five-to-eight', title: 'Does the failure begin with players five through eight?', paragraphs: ['Patch 1.0.4 added support for up to eight-player lobbies, but Steam reports describe inconsistent joins above four. If the first four load and the fifth or later player black-screens, record that exact threshold and keep the smaller working room instead of presenting eight as equally reliable.'] },
      { id: 'relay', title: 'What does the Steam Relay indicator show?', paragraphs: ['Patch 1.0.9 added a short Steam connection diagnostic in the main menu. A red Steam Relay result is the official signal to use the #common-bugs guidance in the developer-linked Discord. Do not claim a network accelerator or DNS change can fix every lobby.'] },
    ],
    evidenceRows: [
      { topic: 'Player count', official: 'The store describes 1–4 players; Patch 1.0.4 added lobby support up to eight.', community: 'Players report that fifth-or-later joins can fail even when a smaller room works.', guidance: 'Test 1–4 first, then add players five through eight one at a time.' },
      { topic: 'Fix status', official: 'Patch 1.0.4 said the join black screen was hopefully fixed.', community: 'Join-only black screens continued to be reported after release.', guidance: 'Use “attempted fix,” isolate the failing role, and avoid a guarantee.' },
      { topic: 'Relay', official: 'Patch 1.0.9 added the red Steam Relay diagnostic and points to common-bugs guidance.', community: 'Overlay, invite, and lobby-ID failures can look similar.', guidance: 'Read the official indicator before testing community workarounds.' },
    ],
    failureBranches: [
      { symptom: 'Solo is also black', likelyState: 'Not a join-only lobby failure', nextStep: 'Return to the fixes hub and test display, files, and startup separately.' },
      { symptom: 'First joiner black-screens', likelyState: 'Host/client, build, overlay, or Relay problem', nextStep: 'Match builds, recreate a private room, inspect Relay, and swap host once.' },
      { symptom: 'Players 1–4 work; player 5+ fails', likelyState: 'Extended-lobby join threshold', nextStep: 'Keep the smaller room, add players one at a time, and report the exact failing slot.' },
      { symptom: 'Steam Relay text is red', likelyState: 'Steam connection initialization failed', nextStep: 'Follow the current developer-linked common-bugs guidance.' },
    ],
    faqs: [{ question: 'Does the current game support eight players?', answer: 'Patch 1.0.4 added support for lobbies of up to eight. The Steam store still positions the original experience as 1–4 players.' }, { question: 'What does red Steam Relay text mean?', answer: 'Patch 1.0.9 says connection initialization failed and directs players to the official Discord common-bugs guidance.' }],
    relatedPages: ['/multiplayer/', '/fixes/save-autosave/', '/fixes/error-0x11c7/', '/fixes/'], sources: ['patch104', 'patch109', 'patch110', 'blackScreenDiscussion', 'eightPlayerDiscussion', 'lobbySetupDiscussion'],
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
    relatedPages: ['/fixes/', '/fixes/missing-radar/', '/fixes/black-screen/', '/multiplayer/'], sources: ['patch109', 'patch110', 'saveDiscussion', 'inventorySaveDiscussion'],
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
    relatedPages: ['/fixes/', '/fixes/black-screen/', '/fixes/save-autosave/', '/multiplayer/'], sources: ['error011c7Discussion', 'microsoftSmartAppControl', 'steamStore'],
  }),
];

export const p2AchievementPages: GuidePage[] = [
  innerPage({
    route: '/achievements/bean/', priority: 'P0', pageType: 'achievement-guide', primaryKeyword: 'how to fish bean achievement', secondaryKeywords: ['how to fish finish under one hour', 'how to fish speedrun achievement', 'how to fish bean legitimate route', 'how to fish patch 1.0.9 bean'],
    title: 'How to Get Bean in How to Fish: Legal 1.0.9+ Route', description: 'Use a legitimate five-island sub-one-hour route after the old skip was patched, with island budgets, reset rules, and a protected practice save.', h1: 'Bean Achievement: Legitimate Current-Patch Route', eyebrow: 'P0 Achievement · Under One Hour',
    quickAnswer: 'Bean still requires finishing the game within one hour. Use a separate solo save, follow every intended island unlock, spend only on the next combat blocker, and carry each boss trophy straight to its hand-in. The documented post-1.0.5 route finished in about 54 minutes, but practice splits and reset rules before treating that pace as repeatable.',
    contentStatus: 'version-sensitive', spoilerLevel: 'full', image: '/assets/how-to-fish/steam-quest.jpg', imageAlt: 'Official How to Fish screenshot showing a quest interaction during the story route', keyFacts: [{ label: 'Official requirement', value: 'Finish within 1 hour' }, { label: 'Old shortcut', value: 'Closed in 1.0.5' }, { label: 'Route', value: 'All intended islands' }, { label: 'Baseline', value: '1.0.9+ legitimate route' }],
    sections: [
      { id: 'legal', title: 'What makes this a legitimate current-patch route?', paragraphs: ['Patch 1.0.5 closed travel to islands before they were unlocked. This route follows Lighthouse, Forest, Desert, Rocks, and Volcano in order; it does not edit saves, inject items, or use the removed island skip. Steam defines only the one-hour finish, so every optimization below remains player-reported.'] },
      { id: 'practice', title: 'What should you practice before starting the timer?', steps: ['Use a separate practice save and rehearse each NPC hand-in.', 'Learn the Spider Crab route with only the minimum early purchase.', 'Practice the three-Leech sweep and Giant Piranha trophy return.', 'Practice the Carrot branch, Pufferfish movement loop, and fin hand-in.', 'Practice Tuna into Albatross, then both Volcano whale encounters and the final hand-in.'] },
      { id: 'island-budget', title: 'What is the post-1.0.5 island budget?', paragraphs: ['The loomy Steam guide uses Knife plus Crabbing Rod and Beer on Lighthouse, a Pistol on Forest, then an SMG with ammunition and magazine upgrades from Desert onward. It saves the Island 4 boss meat for Volcano healing and reports about 30–32 minutes on reaching Rocks as a workable practice split. Treat prices and exact upgrades as route evidence, not requirements.'] },
      { id: 'combat', title: 'Where does the legal route usually lose time?', paragraphs: ['Pufferfish punishes a stopped firing stance, Albatross punishes exposed movement, and the two Whale fights punish weak healing preparation. The route’s core decision is to buy only what removes the next blocker, then carry the trophy directly to the quest giver instead of farming optional systems.'] },
      { id: 'reset', title: 'When should you reset the attempt?', paragraphs: ['Reset if a required trophy is lost, an island hand-in fails, or repeated boss deaths consume the remaining margin. The published route allows some failures, but a 54-minute reported finish is not a guaranteed split. Record your own island arrival times and reset threshold over practice runs.'] },
    ],
    evidenceRows: [
      { topic: 'Requirement', official: 'Steam says “Finish the game within 1 hour.”', community: 'A post-1.0.5 solo guide reports a legitimate roughly 54-minute finish.', guidance: 'Use the official timer target and treat the route as a practice baseline.' },
      { topic: 'Old skip', official: 'Patch 1.0.5 fixed travel to locked islands.', community: 'Older videos and guides still show the removed shortcut.', guidance: 'Reject any route that depends on early locked-island access.' },
      { topic: 'Difficulty', official: 'The achievement text does not name a difficulty; Patch 1.0.9 added Easy and Hard.', community: 'Players report Bean unlocking on Easy.', guidance: 'Recheck the live unlock; do not call a community report guaranteed.' },
    ],
    failureBranches: [
      { symptom: 'An old route sails directly to Volcano', likelyState: 'Pre-1.0.5 island-skip guide', nextStep: 'Discard it and rehearse all intended island gates.' },
      { symptom: 'Pace is already far behind at Rocks', likelyState: 'Early farming, deaths, or overbuying consumed the margin', nextStep: 'Review the previous island split and reset under your preselected rule.' },
      { symptom: 'A boss dies but the route does not advance', likelyState: 'Distinct trophy was not carried to the hand-in', nextStep: 'Recover the quest item; reset if it is lost.' },
      { symptom: 'Finish occurs but Bean does not unlock', likelyState: 'Timer, Steam sync, or version-sensitive behavior', nextStep: 'Record the final time and patch, wait for Steam sync, and report without editing the save.' },
    ],
    faqs: [{ question: 'Does the old direct-to-Volcano route work?', answer: 'Patch 1.0.5 says travel to locked islands was fixed, so the old skip is not a reliable current route.' }, { question: 'Does Easy mode invalidate Bean?', answer: 'The official requirement does not mention difficulty. Players report current runs on Easy, but confirm the live achievement behavior before relying on that report.' }],
    relatedPages: ['/walkthrough/', '/achievements/', '/bosses/pufferfish/', '/bosses/bowhead-whale/'], sources: ['steamAchievements', 'patch105', 'patch109', 'patch110', 'beanDiscussion', 'beanSoloGuide'],
  }),
  innerPage({
    route: '/achievements/im-the-bird-now/', priority: 'P0', pageType: 'achievement-guide', primaryKeyword: 'how to fish make boat fly achievement', secondaryKeywords: ['how to fish im the bird now', "how to fish i'm the bird now", 'how to fish flying boat', 'how to fish dynamite boat'],
    title: "How to Get I'm the Bird Now in How to Fish", description: 'Make the boat fly with a controlled dynamite launch, protect loose equipment, and recover safely if the boat lands in a bad position.', h1: "I'm the Bird Now: Make the Boat Fly", eyebrow: 'P0 Achievement · Physics Stunt',
    quickAnswer: 'Unlock the boat, reach the Forest where dynamite becomes available, and move the boat into open water. Put valuable loose items in inventory, place a small explosive setup directly under the hull, retreat, and detonate. Steam only requires the boat to fly; dynamite placement is a community method, so increase cautiously if one blast only flips it.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', image: '/assets/how-to-fish/steam-seagull.jpg', imageAlt: 'Official How to Fish screenshot showing a boat and airborne seagull over open water', keyFacts: [{ label: 'Official requirement', value: 'Make the boat fly' }, { label: 'Common method', value: 'Dynamite under hull' }, { label: 'Engine tier', value: 'Not required by Steam text' }, { label: 'Main risk', value: 'Scattered loose items' }],
    sections: [
      { id: 'requirements', title: 'What do you need before the boat can fly?', paragraphs: ['Finish the Lighthouse hand-in that opens boat travel, reach the Forest shop route, and obtain dynamite. Steam does not require a named engine tier. Use open water so the hull can move without immediately catching terrain.'] },
      { id: 'protect', title: 'How do you protect the boat and your items?', paragraphs: ['Move weapons, tools, quest objects, and valuable catches into inventory or far from the blast. Patch 1.0.10 limits explosion velocity and saves some dropped items, but that does not make scattering important gear a safe achievement method.'] },
      { id: 'launch', title: 'How do you perform the dynamite launch?', steps: ['Float the boat in open water.', 'Place one small dynamite setup directly under the hull.', 'Move outside the blast radius.', 'Detonate and watch whether the whole hull clearly leaves the water.', 'Check the Steam achievement before changing the setup.'] },
      { id: 'retry', title: 'What should you change after a failed launch?', paragraphs: ['If the boat only rolls or slides, move the explosive closer under the center of the hull before adding more. Community guides disagree on whether one bundle is always enough, so placement is the first variable; do not jump directly to a large pile.'] },
      { id: 'recover', title: 'What should you do after the boat lands badly?', paragraphs: ['First confirm that the Steam unlock registered. Retrieve the boat normally if it remains accessible. A reload is a community-reported recovery, not an official guarantee; Patch 1.0.10 improves dropped-item persistence but you should still verify inventory and quest items before saving again.'] },
    ],
    evidenceRows: [
      { topic: 'Unlock condition', official: 'Steam says only “Make the boat fly.”', community: 'Multiple guides use dynamite under or against a floating hull.', guidance: 'Require visible boat flight; do not invent an engine requirement.' },
      { topic: 'Explosion behavior', official: 'Patch 1.0.10 limits maximum explosion velocity.', community: 'One bundle works in some reports; others need tighter placement or more force.', guidance: 'Adjust placement first and increase cautiously.' },
      { topic: 'Recovery', official: 'Patch 1.0.10 adds limited dropped-item persistence, prioritizing important objects.', community: 'Players often reload when the boat lands far away.', guidance: 'Confirm the achievement and inspect items before saving or reloading.' },
    ],
    failureBranches: [
      { symptom: 'The boat only tips or slides', likelyState: 'Blast is beside the hull rather than underneath', nextStep: 'Reposition under the center before increasing the explosive amount.' },
      { symptom: 'The boat flies but no unlock appears', likelyState: 'Flight threshold or Steam sync did not register', nextStep: 'Wait for sync, then retry with a clearer vertical launch.' },
      { symptom: 'Valuable items scatter', likelyState: 'Loose gear was inside the blast area', nextStep: 'Stop saving, recover what is visible, and inspect the current Patch 1.0.10 item state.' },
      { symptom: 'The boat lands somewhere unusable', likelyState: 'Physics launch displaced the hull', nextStep: 'Confirm the unlock, attempt normal retrieval, then treat reload as community-only recovery.' },
    ],
    media: {
      video: { href: 'https://www.youtube.com/watch?v=nnFQFXgFxZI', embedUrl: 'https://www.youtube-nocookie.com/embed/nnFQFXgFxZI', title: 'Boat-flight gameplay reference', description: 'Use this clip to understand the launch result, not as proof that one explosive placement is guaranteed.', sourceId: 'boat-fly-video' },
      gallery: [
        { src: '/assets/how-to-fish/steam-seagull.jpg', alt: 'Official How to Fish screenshot of the boat and sky above open water', caption: 'Official open-water context for a clear launch area.', sourceId: 'steam-media' },
        { src: '/assets/how-to-fish/steam-gear.jpg', alt: 'Official How to Fish screenshot showing portable gear', caption: 'Store valuable loose equipment before using explosives near the boat.', sourceId: 'steam-media' },
      ],
    },
    faqs: [{ question: 'Do I need the best engine?', answer: 'Steam only says to make the boat fly. The dynamite route does not depend on a published engine requirement.' }, { question: 'Does one bundle always work?', answer: 'Community reports differ. Start with placement directly under the hull and increase cautiously only after a clean failed attempt.' }],
    relatedPages: ['/achievements/', '/multiplayer/', '/islands/forest/', '/fixes/'], sources: ['steamAchievements', 'patch110', 'boatFlyGuide', 'boatFlyVideo', 'steamMedia'],
  }),
  innerPage({
    route: '/achievements/fishipedia/', priority: 'P2', pageType: 'achievement-guide', primaryKeyword: 'how to fish game fishipedia achievement', secondaryKeywords: ['how to fish all drip creatures', 'how to fish drip variants', 'how to fish fishipedia checklist', 'how to fish rare fish'],
    title: 'How to Fish Game Fishipedia Achievement Guide', description: 'Noindex evidence draft for the How to Fish Fishipedia achievement, the in-game Drip tracker, and the Patch 1.0.5 extra-entry fix.', h1: 'How to Fish Fishipedia Achievement', eyebrow: 'P2 Draft · Drip Evidence Gate',
    quickAnswer: 'Fishipedia officially requires finding and killing all Drip creatures. Use the in-game encyclopedia as the account authority and the local checklist only for planning. Patch 1.0.5 removed the obsolete extra-Drip requirement. This draft remains noindex because current Drip frequency, complete variant coverage, and lure-by-lure reproduction have not been verified directly by this site.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', indexable: false, keyFacts: [{ label: 'Official requirement', value: 'All Drip creatures' }, { label: 'Tracker', value: 'In-game encyclopedia' }, { label: 'Patch fix', value: 'All + 1 fixed in 1.0.5' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'official', title: 'What does Steam officially require?', paragraphs: ['Steam defines the goal as finding and killing all Drip creatures. The live encyclopedia knows your actual account state; this site stores a private planning checklist and does not connect to Steam.'] },
      { id: 'patch', title: 'Which old Fishipedia instruction is outdated?', paragraphs: ['Patch 1.0.5 says Fishipedia previously failed until the player found all Drip creatures plus one. The patch corrected that condition, so another catch after completion should not be treated as the current requirement.'] },
      { id: 'route', title: 'How should a cleanup route be organized?', steps: ['Check the missing encyclopedia entries.', 'Filter the Fish database by the first documented progression stage.', 'Equip the cross-checked lure and rod for that catch.', 'Confirm the kill updates the in-game entry before moving on.', 'Record conflicts rather than assuming an exclusive island.'] },
      { id: 'boundary', title: 'Why is this page still a noindex draft?', paragraphs: ['Drip frequency, variant eligibility, and area behavior remain unconfirmed through direct site testing. The database shows a cross-source catch intersection, but it does not verify every Drip variant or promise a percentage, fixed location, or guaranteed cast count.'] },
    ],
    evidenceRows: [
      { topic: 'Unlock requirement', official: 'Steam requires finding and killing all Drip creatures.', community: 'Guides use the in-game encyclopedia and lure-based cleanup routes.', guidance: 'Treat the live encyclopedia as the account authority.' },
      { topic: 'Patch condition', official: 'Patch 1.0.5 removed the erroneous all-plus-one Drip requirement.', community: 'Older guides may still advise one extra Drip after completion.', guidance: 'Reject the obsolete workaround on the current patch.' },
      { topic: 'Coverage', official: 'No official source checked publishes Drip odds or a full lure table.', community: 'Two media lists overlap on normal catches and bosses, not every Drip reproduction.', guidance: 'Keep the page noindex until variant-by-variant evidence exists.' },
    ],
    failureBranches: [
      { symptom: 'The encyclopedia still shows a missing Drip', likelyState: 'Collection cleanup is incomplete', nextStep: 'Identify the exact gap and test the cross-checked lure without assuming one island is exclusive.' },
      { symptom: 'Every visible Drip is marked but Steam does not unlock', likelyState: 'Sync delay, hidden gap, or version-sensitive state', nextStep: 'Recheck the live encyclopedia, wait for Steam sync, and record the patch before another catch.' },
      { symptom: 'The local checklist disagrees with the game', likelyState: 'Browser-only planning state is stale', nextStep: 'Trust the in-game encyclopedia and reset only the local checklist entry.' },
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

export const p2DraftPages: GuidePage[] = [
  innerPage({
    route: '/fixes/audio-glitch/', priority: 'P2', pageType: 'troubleshooting-guide', primaryKeyword: 'how to fish game audio glitch', secondaryKeywords: ['how to fish audio repeating', 'how to fish crackling audio', 'how to fish sound bug'],
    title: 'How to Fish Game Audio Glitch: Evidence Draft', description: 'Noindex diagnostic draft for repeating, crackling, or degraded How to Fish audio without claiming a guaranteed fix.', h1: 'How to Fish Audio Glitch Checks', eyebrow: 'P2 Draft · Audio Evidence Gate',
    quickAnswer: 'Restart the game and Steam, verify files, then test whether the problem changes with the in-game FX volume, one output device, and overlays disabled. Record the patch, area, and trigger before reporting it. This page stays noindex because the available forum reports do not establish one cause or a verified universal fix.',
    contentStatus: 'still-reported', spoilerLevel: 'none', indexable: false, keyFacts: [{ label: 'Status', value: 'Player-reported' }, { label: 'Official cause', value: 'Not confirmed' }, { label: 'Fix promise', value: 'None' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'scope', title: 'What exact audio symptom is happening?', paragraphs: ['Separate repeating sounds, crackling, slowed audio, missing effects, and full audio loss. A single “audio glitch” label hides different failure paths, and the current reports do not prove they share a cause.'] },
      { id: 'safe', title: 'Which reversible checks come first?', steps: ['Restart the game and Steam.', 'Verify installed files.', 'Select one known output device.', 'Disable nonessential overlays for one test.', 'Change the in-game FX slider and record what changes.'] },
      { id: 'capture', title: 'What evidence should a report include?', paragraphs: ['Record game patch, Windows version, output device, solo or multiplayer, the island or action that triggered the symptom, and whether the sound persists after returning to the menu.'] },
      { id: 'gate', title: 'What evidence would make this page indexable?', paragraphs: ['A developer acknowledgement, patch-note fix, or repeatable current-build reproduction that separates cause from symptom would clear the evidence gate. Until then, this is a noindex diagnostic draft.'] },
    ],
    evidenceRows: [
      { topic: 'Symptom', official: 'The official store does not describe an audio failure state.', community: 'Steam players report repeating, slowed, or degraded audio.', guidance: 'Classify the exact symptom before testing.' },
      { topic: 'Fix', official: 'No current patch note guarantees a universal audio fix.', community: 'Restart, file verification, and device isolation are common diagnostics.', guidance: 'Use reversible checks and report results without a promise.' },
    ],
    failureBranches: [
      { symptom: 'Only one effect repeats', likelyState: 'Event-specific or session audio state', nextStep: 'Record the triggering action and test a fresh session.' },
      { symptom: 'All audio crackles or slows', likelyState: 'Output-device, load, or session-wide issue', nextStep: 'Test one output device and overlays off after a restart.' },
      { symptom: 'FX slider changes nothing', likelyState: 'Symptom may sit outside the expected mixer path', nextStep: 'Capture the result with patch and device details for a report.' },
    ],
    faqs: [{ question: 'Is there a guaranteed audio fix?', answer: 'No. Current evidence supports only reversible diagnostics and a reproducible report.' }, { question: 'Why is this page noindex?', answer: 'The issue is real enough to document, but the cause and current universal remedy are not verified.' }],
    relatedPages: ['/fixes/', '/multiplayer/', '/tips/'], sources: ['steamStore', 'audioDiscussion', 'patch110'],
  }),
  innerPage({
    route: '/tips/bing-bong/', priority: 'P2', pageType: 'mechanics-draft', primaryKeyword: 'how to fish game bing bong', secondaryKeywords: ['how to fish bing bong', 'how to fish coconut secret', 'how to fish desert secret creature'],
    title: 'How to Fish Game Bing Bong: Noindex Evidence Draft', description: 'Evidence-threshold draft for the How to Fish Bing Bong secret catch and Coconut lead without unsupported odds or fixed stats.', h1: 'How to Fish Bing Bong Evidence Draft', eyebrow: 'P2 Draft · Secret Catch',
    quickAnswer: 'Third-party guides place Bing Bong on the Desert route and connect it to a Coconut used with the Fishing Rod. This site has not directly verified the purchase prompt, price, exclusive catch pool, or fight values. Treat the live item name and successful catch as the authority; the page remains noindex until the route is reproduced independently.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', indexable: false, keyFacts: [{ label: 'Reported area', value: 'Desert' }, { label: 'Reported bait', value: 'Coconut' }, { label: 'Official entry', value: 'Not found' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'claim', title: 'What is currently being claimed?', paragraphs: ['Pro Game Guides reports a Coconut route to Bing Bong on the Desert. The official Steam store and patch notes do not document the secret, so the relationship remains community evidence here.'] },
      { id: 'verify', title: 'What should be checked in the live game?', steps: ['Confirm the item is named Coconut.', 'Record the purchase prompt and location.', 'Use it with the displayed compatible rod.', 'Capture the hooked creature name.', 'Record whether another catch can occur.'] },
      { id: 'avoid', title: 'Which claims are not verified?', paragraphs: ['This draft does not publish a guaranteed catch chance, fixed price, exclusive island, exact health, damage, escape timer, or universal best weapon.'] },
      { id: 'gate', title: 'What clears the evidence gate?', paragraphs: ['Two independent current-build reproductions or a developer source showing the item, catch, and result would support a publishable route.'] },
    ],
    evidenceRows: [
      { topic: 'Secret route', official: 'No official route was found in the store or patch notes.', community: 'Multiple media guides connect Desert Coconut to Bing Bong.', guidance: 'Keep the relationship unconfirmed until reproduced.' },
      { topic: 'Combat values', official: 'Patch 1.0.9 confirms difficulty modifiers generally.', community: 'Guides publish specific stats and loadouts.', guidance: 'Do not reuse fixed values without direct evidence.' },
    ],
    failureBranches: [
      { symptom: 'No Coconut prompt appears', likelyState: 'Wrong interaction, patch, or guide location', nextStep: 'Record the live area and prompt state instead of claiming the item was removed.' },
      { symptom: 'Coconut catches something else', likelyState: 'Exclusive pool claim is false or version-sensitive', nextStep: 'Capture the result and keep the page noindex.' },
      { symptom: 'Bing Bong appears but differs from a guide', likelyState: 'Difficulty or patch variation', nextStep: 'Follow live cues and avoid copying fixed stats.' },
    ],
    faqs: [{ question: 'Is Bing Bong confirmed by Dazed Games?', answer: 'Not in the official sources checked for this draft.' }, { question: 'Does Coconut guarantee Bing Bong?', answer: 'Third-party guides claim that relationship, but this site has not directly verified a guaranteed pool.' }],
    relatedPages: ['/tips/coconut-bait/', '/islands/desert/', '/bosses/pufferfish/', '/fish/'], sources: ['steamStore', 'patch109', 'bingBongGuide'],
  }),
  innerPage({
    route: '/tips/coconut-bait/', priority: 'P2', pageType: 'mechanics-draft', primaryKeyword: 'how to fish game coconut bait', secondaryKeywords: ['how to fish coconut lure', 'how to fish desert coconut', 'how to catch bing bong'],
    title: 'How to Fish Game Coconut Bait: Noindex Draft', description: 'Evidence draft for the reported Desert Coconut bait, its interaction prompt, and its connection to Bing Bong.', h1: 'How to Fish Coconut Bait Evidence Draft', eyebrow: 'P2 Draft · Bait Evidence Gate',
    quickAnswer: 'Community guides report that a Coconut can be obtained from a Desert palm interaction and equipped on the Fishing Rod for the Bing Bong secret catch. The current official sources do not publish that item route. Confirm the live prompt, item name, rod compatibility, and catch before spending it; this page remains noindex pending independent reproduction.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', indexable: false, keyFacts: [{ label: 'Reported area', value: 'Desert' }, { label: 'Reported rod', value: 'Fishing Rod' }, { label: 'Official route', value: 'Not published' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'find', title: 'Where do players report finding the Coconut?', paragraphs: ['The current media lead points to a palm interaction on the Desert rather than normal shop stock. This site has not captured the prompt directly.'] },
      { id: 'check', title: 'What should you verify before buying or using it?', bullets: ['Exact item name.', 'Displayed price rather than a copied price.', 'Compatible rod shown in the UI.', 'Whether one use consumes the item.', 'The name of the creature actually caught.'] },
      { id: 'risk', title: 'Which assumptions should you avoid?', paragraphs: ['Do not assume every palm works, that the item is permanent, that it is stocked on later islands, or that it guarantees one creature until the current build shows those states.'] },
      { id: 'gate', title: 'When can this become a public guide?', paragraphs: ['The evidence gate requires a current capture of the prompt, inventory item, compatible rod, and completed catch plus an independent source or developer confirmation.'] },
    ],
    evidenceRows: [
      { topic: 'Item route', official: 'The official store and patch notes checked do not publish Coconut bait.', community: 'A current media guide reports a Desert palm interaction.', guidance: 'Confirm the live prompt before treating the route as fact.' },
      { topic: 'Catch relationship', official: 'No developer source checked links Coconut to Bing Bong.', community: 'Media guides report the Coconut and Fishing Rod combination.', guidance: 'Do not publish a guaranteed pool until independently reproduced.' },
    ],
    failureBranches: [
      { symptom: 'The shop does not sell Coconut', likelyState: 'Reported route uses a world interaction', nextStep: 'Check the live palm prompt without assuming one tree is universal.' },
      { symptom: 'The item cannot equip', likelyState: 'Wrong rod, item label, or patch behavior', nextStep: 'Record the compatibility text and stop before consuming it.' },
      { symptom: 'The catch differs', likelyState: 'Pool or exclusivity claim is unverified', nextStep: 'Capture the result and keep the route in draft.' },
    ],
    faqs: [{ question: 'Is Coconut officially documented bait?', answer: 'Not in the official sources checked for this draft.' }, { question: 'Is the reported price permanent?', answer: 'No price is published here until the current prompt is verified.' }],
    relatedPages: ['/tips/bing-bong/', '/islands/desert/', '/fish/', '/tips/'], sources: ['steamStore', 'bingBongGuide', 'patch109'],
  }),
  innerPage({
    route: '/tips/cooking/', priority: 'P2', pageType: 'mechanics-draft', primaryKeyword: 'how to fish game cooking', secondaryKeywords: ['how to fish grill', 'how to cook fish how to fish game', 'how to fish burnt creature'],
    title: 'How to Fish Game Cooking and Grill: Noindex Draft', description: 'Evidence draft for unlocking the grill, inspecting cooked items, avoiding burns, and Patch 1.0.10 tool cleaning.', h1: 'How to Fish Cooking Evidence Draft', eyebrow: 'P2 Draft · Cooking Evidence Gate',
    quickAnswer: 'Steam achievements confirm starting the grill and eating a burnt creature, while community guides describe the Desert Blue Shark quest and live inspect multiplier. Patch 1.0.10 says cooked weapons and tools can be cleaned in water. Exact cooking windows and value formulas are not verified here, so use the live inspection panel and keep quest items off the heat.',
    contentStatus: 'version-sensitive', spoilerLevel: 'minor', indexable: false, keyFacts: [{ label: 'Official evidence', value: 'Grill + burnt achievement' }, { label: 'Patch 1.0.10', value: 'Clean tools in water' }, { label: 'Exact timer', value: 'Not verified' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'official', title: 'What does official evidence confirm?', paragraphs: ['Steam names Grillmaster and Yummy in my tummy, and Patch 1.0.10 documents cleaning cooked weapons and tools in water. Official sources checked here do not publish a grill timer or price formula.'] },
      { id: 'unlock', title: 'How do community guides unlock the grill?', paragraphs: ['The current lead places the grill route on the Desert and uses the Blue Shark request. Follow the live NPC objective and boss-bait label rather than treating one guide’s price list as permanent.'] },
      { id: 'inspect', title: 'How should you time cooking safely?', paragraphs: ['Inspect the item while it heats and remove it using the live multiplier and visual state. This draft deliberately avoids seconds because the timing has not been reproduced by this site.'] },
      { id: 'gate', title: 'What keeps this page noindex?', paragraphs: ['The unlock route, cooking curve, eligible objects, and value cap need direct current-build captures before this becomes a public mechanics guide.'] },
    ],
    evidenceRows: [
      { topic: 'Grill achievements', official: 'Steam confirms starting the grill and eating a burnt creature.', community: 'Guides connect the Desert Blue Shark request to grill access.', guidance: 'Use the live NPC objective for the unlock route.' },
      { topic: 'Tool recovery', official: 'Patch 1.0.10 says cooked weapons and tools are cleaned in water.', community: 'Guides describe cooking multipliers and timing windows.', guidance: 'Publish the official recovery; keep exact timing unverified.' },
    ],
    failureBranches: [
      { symptom: 'The grill is inactive', likelyState: 'NPC or Blue Shark objective incomplete', nextStep: 'Follow the live Desert objective and finish the hand-in.' },
      { symptom: 'An item turns black or loses value', likelyState: 'Cooking passed the useful window', nextStep: 'Use the result only if required for the burnt-food achievement; do not sell it as a profit route.' },
      { symptom: 'A weapon or tool was cooked', likelyState: 'Non-food item entered the heat area', nextStep: 'Use the Patch 1.0.10 water-cleaning behavior and inspect the item before saving.' },
    ],
    faqs: [{ question: 'What is the exact cooking timer?', answer: 'This draft does not publish one because it has not been directly verified.' }, { question: 'Can cooked tools be cleaned?', answer: 'Patch 1.0.10 officially says weapons and tools are cleaned from cooking when dipped in water.' }],
    relatedPages: ['/tips/killscore/', '/tips/', '/achievements/', '/islands/desert/'], sources: ['steamAchievements', 'patch110', 'cookingGuide'],
  }),
  innerPage({
    route: '/tips/killscore/', priority: 'P2', pageType: 'mechanics-draft', primaryKeyword: 'how to fish game killscore', secondaryKeywords: ['how to fish killscore multiplier', 'how to fish trick shots', 'how to fish impressive achievement'],
    title: 'How to Fish Game Killscore: Noindex Draft', description: 'Evidence draft separating the official trick-shot value promise from community multiplier names and setup advice.', h1: 'How to Fish Killscore Evidence Draft', eyebrow: 'P2 Draft · Combat Economy Gate',
    quickAnswer: 'The Steam store confirms that trick shots can earn more money, and achievements confirm both a zero-multiplier kill and a 5x Killscore target. Community guides document named modifiers and stacking routes, but this site has not reproduced the full formula. Use visible on-screen feedback, cheap targets, and replaceable catches; the page remains noindex pending verification.',
    contentStatus: 'version-sensitive', spoilerLevel: 'none', indexable: false, keyFacts: [{ label: 'Official promise', value: 'Trick shots earn more' }, { label: 'Achievement target', value: '5x' }, { label: 'Formula', value: 'Not verified' }, { label: 'Index status', value: 'Noindex draft' }],
    sections: [
      { id: 'official', title: 'What is officially confirmed?', paragraphs: ['The store says trick shots can increase earnings. Steam achievements define Noob as a zero-multiplier kill and Impressive as a 5x multiplier.'] },
      { id: 'community', title: 'What do community routes add?', paragraphs: ['Community guides name headshots, no-scope, range, rotation, last bullet, and other modifiers. Their exact values and stacking order remain unverified here.'] },
      { id: 'practice', title: 'How should you practice safely?', steps: ['Use a low-risk replaceable creature.', 'Change one action at a time.', 'Read the on-screen modifier feedback.', 'Record the displayed multiplier.', 'Keep quest trophies out of the experiment.'] },
      { id: 'gate', title: 'What evidence would support an indexable page?', paragraphs: ['A current-build table reproduced from live on-screen results across repeated controlled kills, or developer documentation of the scoring formula, would clear the evidence gate.'] },
    ],
    evidenceRows: [
      { topic: 'Money effect', official: 'The Steam store says trick shots can earn more money.', community: 'Guides name and stack individual Killscore modifiers.', guidance: 'Use the live displayed multiplier instead of a copied formula.' },
      { topic: 'Achievement boundaries', official: 'Noob requires zero multiplier and Impressive requires 5x.', community: 'Players propose headshot, no-scope, range, rotation, and last-bullet setups.', guidance: 'Treat setups as practice leads until their values are reproduced.' },
    ],
    failureBranches: [
      { symptom: 'No modifier appears', likelyState: 'Action did not meet the live trigger', nextStep: 'Change one input and watch the result rather than stacking guesses.' },
      { symptom: 'Displayed multiplier differs from a guide', likelyState: 'Guide version or formula assumption is stale', nextStep: 'Trust the live UI and record the patch.' },
      { symptom: 'A valuable quest item is at risk', likelyState: 'Wrong practice target', nextStep: 'Stop and switch to a replaceable ordinary catch.' },
    ],
    faqs: [{ question: 'What is the exact Killscore formula?', answer: 'It is not published here because the full current formula has not been reproduced.' }, { question: 'What does Steam confirm?', answer: 'Trick shots can increase money, and there are official zero-multiplier and 5x achievements.' }],
    relatedPages: ['/tips/', '/tips/cooking/', '/achievements/360-no-scope/', '/achievements/'], sources: ['steamStore', 'steamAchievements', 'communityGuide'],
  }),
];

export const innerPages: GuidePage[] = [...p1InnerPages, ...p2AchievementPages, ...p2DraftPages];

export type InnerRouteGroup = 'bosses' | 'fixes' | 'achievements' | 'tips';

export function getInnerRoutePage(group: InnerRouteGroup, slug: string) {
  return innerPages.find((page) => page.route === `/${group}/${slug}/`);
}

export function getInnerStaticParams(group: InnerRouteGroup) {
  const prefix = `/${group}/`;
  return innerPages
    .filter((page) => page.route.startsWith(prefix))
    .map((page) => ({ slug: page.route.slice(prefix.length).replace(/\/$/, '') }));
}
