import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CreaturePreview } from '@/components/guide/CreaturePreview';
import { FaqAccordion, IssueStatusTag, SourceLine, VerificationBadge, type IssueState } from '@/components/guide/DesignSystem';
import { IslandProgression } from '@/components/guide/IslandProgression';
import { getPageByRoute } from '@/content/pages';
import { resolveSources } from '@/content/sources';

const stuck = [
  ['I do not know what to do next', 'Follow the full route from the Lighthouse to the Volcano.', 'Full walkthrough', '/walkthrough/'],
  ['I cannot unlock the next island', 'Unlock requirements, quest hand-ins and Radar routes.', 'All islands', '/islands/'],
  ['I cannot beat a boss', 'Triggers, required bait and strategies for every boss.', 'Boss guides', '/bosses/'],
  ['I need a fish, rod or bait', 'Search every documented creature by lure, rod and area.', 'Fish database', '/fish/'],
  ['I am completing achievements', 'A route-based checklist for all 28 Steam achievements.', 'Achievement route', '/achievements/'],
  ['My save or multiplayer is broken', 'Diagnose lost items, missing Radar and join black screens.', 'Fixes and multiplayer', '/fixes/'],
] as const;

const featured = [
  ['Final boss', 'Mutated Bowhead Whale', 'Summon requirements, best strategy and the Handyman method.', 'Beat the final boss', '/bosses/mutated-bowhead-whale/', 'boss'],
  ['Completion', 'All 28 Achievements', 'A realistic 100% route with Bean, Handyman and Fishipedia warnings.', 'Open the checklist', '/achievements/', 'default'],
  ['Walkthrough', 'Full Walkthrough', 'Every quest gate, boss trigger and hand-in from start to ending.', 'Start Chapter 1', '/walkthrough/', 'default'],
  ['Islands', 'All Islands', 'Lighthouse plus four unlockable areas, in order, with Radar routes.', 'See island order', '/islands/', 'fish'],
] as const;

const quickSteps = [
  ['1', 'Learn the core loop', 'Catch, sell, upgrade, defeat the boss, move on.'],
  ['2', 'Know what not to sell', 'Keep quest drops safe until the related hand-in.'],
  ['3', 'Upgrade in the right order', 'Rod and inventory first, firepower before bosses.'],
  ['4', 'Use the Radar', 'It marks quest targets and the next island route.'],
  ['5', 'Reel differently later', 'After Island 1, fish need the new reeling mechanic.'],
] as const;

const problems: Array<[string, string, IssueState, string, string]> = [
  ['Fish are not biting after the first island', 'Check active reeling, lure and rod before assuming a bug.', 'community-workaround', 'Community workaround', '/tips/#fishing'],
  ['Radar is missing from the inventory', 'Protect the save copy before testing recovery steps.', 'attempted-fix', 'Attempted fix', '/fixes/#saves'],
  ['Items disappeared after loading a save', 'Patch 1.0.9 attempted a save-corruption fix.', 'attempted-fix', 'Attempted fix', '/fixes/#saves'],
  ['Black screen when joining a friend', 'Check matching patches and the Steam Relay indicator.', 'still-reported', 'Still reported', '/multiplayer/#relay'],
  ['Old Bean achievement route no longer works', 'Patch 1.0.5 closed the old island-skip route.', 'unverified', 'Version-sensitive', '/achievements/#warnings'],
  ['Boss is not spawning at the trigger spot', 'Recheck quest stage, bait, rod and NPC dialogue.', 'community-workaround', 'Community report', '/bosses/#not-spawning'],
];

export function HomePage() {
  const page = getPageByRoute('/');
  const pageSources = resolveSources(page.sources);
  return <main>
    <section className="home-hero" data-home-section="hero"><div className="wiki-container home-hero-grid"><div className="home-hero-copy"><div className="v2-kicker v2-kicker-fish">Dazed Games&apos; How to Fish on Steam</div><h1><span>How to Fish Game</span><span className="home-title-accent">Guide and Wiki</span></h1><p>Complete the game with verified walkthroughs, island routes, boss strategies, fish and bait data, achievements, multiplayer help and current patch fixes.</p><div className="home-actions"><Link href="/walkthrough/" className="wiki-button wiki-button-primary">Start the Full Walkthrough</Link><Link href="/fish/" className="wiki-button wiki-button-secondary">Browse the How to Fish Wiki</Link></div><div className="home-badges"><VerificationBadge kind="official" /><VerificationBadge kind="patch" label="Verified in-game" /><VerificationBadge kind="community" /></div><small>Unofficial fan-made resource. Not affiliated with Dazed Games.</small></div><figure className="home-hero-media"><Image src="/assets/how-to-fish/hero-island-v2.webp" alt="AI-generated cartoon castaway fishing beside a washed-up boat on a tropical island" fill priority sizes="(max-width: 900px) 100vw, 48vw" /></figure></div></section>

    <section className="status-deck" data-home-section="status"><div className="wiki-container status-grid"><StatusCard label="Current verified patch" value="1.0.9" /><StatusCard label="Guides last updated" value="Aug 25, 2026" /><StatusCard label="Save issues" value="Attempted fix" tone="amber" /><StatusCard label="Multiplayer" value="Steam Relay added" tone="teal" /></div></section>

    <section className="wiki-section" data-home-section="stuck"><div className="wiki-container"><SectionHeading kicker="Start here" title="Where Are You Stuck?" /><div className="stuck-grid">{stuck.map(([title, copy, link, href]) => <Link href={href} className="v2-card stuck-card" key={title}><h3>{title}</h3><p>{copy}</p><span>{link}<ArrowRight /></span></Link>)}</div></div></section>

    <section className="wiki-section wiki-section-alt" data-home-section="featured"><div className="wiki-container"><SectionHeading kicker="Most wanted" title="Featured How to Fish Game Guides" /><div className="featured-grid">{featured.map(([kicker, title, copy, link, href, tone]) => <Link href={href} className={`v2-card featured-card featured-card-${tone}`} key={href}><div className={`v2-kicker v2-kicker-${tone === 'boss' ? 'boss' : tone === 'fish' ? 'fish' : 'walkthrough'}`}>{kicker}</div><h3>{title}</h3><p>{copy}</p><span>{link}</span></Link>)}</div></div></section>

    <section className="wiki-section" data-home-section="quick-start"><div className="wiki-container"><SectionHeading kicker="Quick start" title="How to Fish Quick Start Guide" /><div className="quick-start-steps">{quickSteps.map(([number, title, copy]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="wiki-section wiki-section-alt" data-home-section="islands"><div className="wiki-container"><SectionHeading kicker="Progression" title="Complete How to Fish Island Progression" sub="Lighthouse → Forest → Desert → Rocks → Volcano. Complete each local request, encounter and hand-in before moving on." tone="fish" /><IslandProgression /></div></section>

    <section className="wiki-section" data-home-section="fish"><div className="wiki-container"><SectionHeading kicker="Fish database" title="Fish, Rods and Bait Wiki" tone="fish" /><CreaturePreview /></div></section>

    <section className="wiki-section wiki-section-alt" data-home-section="problems"><div className="wiki-container"><SectionHeading kicker="From Steam and Reddit" title="Common How to Fish Problems" /><div className="problem-grid">{problems.map(([title, copy, state, label, href]) => <Link href={href} className="v2-card problem-card" key={title}><h3>{title}</h3><p>{copy}</p><IssueStatusTag state={state} label={label} /></Link>)}</div></div></section>

    <section className="wiki-section" data-home-section="faq"><div className="wiki-container"><FaqAccordion title="How to Fish Game FAQ" items={page.faqs} /><SourceLine sources={pageSources} lastUpdated={page.lastUpdated} /></div></section>
  </main>;
}

function StatusCard({ label, value, tone }: { label: string; value: string; tone?: 'amber' | 'teal' }) {
  return <article className="status-card"><span>{label}</span><strong className={tone ? `text-${tone}` : undefined}>{value}</strong></article>;
}

function SectionHeading({ kicker, title, sub, tone = 'walkthrough' }: { kicker: string; title: string; sub?: string; tone?: 'walkthrough' | 'fish' }) {
  return <header className="section-heading"><div className={`v2-kicker v2-kicker-${tone}`}>{kicker}</div><h2>{title}</h2>{sub ? <p>{sub}</p> : null}</header>;
}
