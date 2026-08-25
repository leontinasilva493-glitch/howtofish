import Link from 'next/link';
import { Anchor, ArrowRight, BookOpen, CalculatorIcon, CalendarClock, ExternalLink, Fish, MapPinned, Package, Shield, ShipWheel, Users } from 'lucide-react';
import { breadcrumbSchema } from '@/app/schema';
import { siteConfig } from '@/config/site';
import { bossCards, categories } from './data';
import { AdSlot, Breadcrumb, CalloutBox, EvidenceBadge, PlaceholderMedia, SectionHeader, TierBadge } from './Primitives';
import { JsonLd } from './JsonLd';

const iconByCategory = { ESSENTIAL: BookOpen, FISH: Fish, GEAR: Package, ISLANDS: MapPinned, BOSS: Shield, GAMBLING: Anchor, 'CO-OP': Users, ACHIEVEMENTS: ShipWheel } as const;

export function WikiHubPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Wiki' }]} />
    <SectionHeader kicker="WIKI DIRECTORY" title="Explore the How to Fish Wiki" sub="Choose the next player question, then open the guide, index, progression page, or tool that answers it." />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{categories.map((card) => { const [kicker, title, description, meta, href] = card; const Icon = iconByCategory[kicker]; return <Link href={href} className="wiki-card wiki-card-link p-5" key={title}><Icon className="h-6 w-6 text-wiki-accent" /><div className="wiki-kicker mt-5">{kicker}</div><h2 className="mt-2 text-xl font-semibold text-wiki-primary">{title}</h2><p className="mt-2 min-h-[48px] text-sm text-wiki-secondary">{description}</p><div className="mt-5 border-t border-wiki-border pt-3 text-[11px] font-bold tracking-[.07em] text-wiki-muted">{meta}</div></Link>; })}</div>
    <AdSlot label="Ad placement - wiki directory" />
    <section className="wiki-card mt-10 grid gap-5 p-6 md:grid-cols-3"><Link href="/guides/beginner-guide" className="wiki-card-link rounded-xl p-3"><div className="font-display text-4xl text-wiki-accent">01</div><h2 className="mt-3 font-semibold text-wiki-primary">Newly cast away?</h2><p className="mt-2 text-sm text-wiki-secondary">Start with the catch-sell-upgrade loop.</p></Link><Link href="/fish" className="wiki-card-link rounded-xl p-3"><div className="font-display text-4xl text-wiki-accent">02</div><h2 className="mt-3 font-semibold text-wiki-primary">Building the index?</h2><p className="mt-2 text-sm text-wiki-secondary">See which fish data is confirmed or unresolved.</p></Link><Link href="/calculator" className="wiki-card-link rounded-xl p-3"><div className="font-display text-4xl text-wiki-accent">03</div><h2 className="mt-3 font-semibold text-wiki-primary">Saving for gear?</h2><p className="mt-2 text-sm text-wiki-secondary">Estimate trips from your own live values.</p></Link></section>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Wiki', item: '/wiki' }])} />
  </div></main>;
}

const islands = [
  ['STARTING ISLAND', 'Crash Site', 'Opening area for the first catch-sell loop.', 'DEFAULT · EXACT SPAWNS STILL BEING DOCUMENTED'],
  ['PROGRESSION', 'First Boss Gate', 'The exit toward the next island is tied to a boss encounter.', 'BOSS-GATED · MECHANICS UNCONFIRMED'],
  ['LATER ISLANDS', 'Richer Waters', 'Officially described as more dangerous areas with better gear.', 'NAMES & VALUES STILL BEING DOCUMENTED'],
] as const;

export function IslandsPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Wiki', href: '/wiki' }, { label: 'Islands' }]} />
    <SectionHeader kicker="ISLAND DATABASE" title="How to Fish Islands & Progression" sub="A launch-week map of confirmed progression gates. Island names, exact spawns, and boss values remain unresolved until checked in the current build." />
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><PlaceholderMedia label="Cartoon island chain with boss-gated routes and richer waters" ratio="aspect-[16/10]" /><div className="wiki-card p-6"><MapPinned className="h-7 w-7 text-wiki-success" /><h2 className="wiki-heading mt-4 text-2xl text-wiki-primary">Progression, not fake coordinates</h2><p className="mt-4 text-sm text-wiki-secondary">Use this page to understand what opens the next route. It does not publish copied spawn maps or invented island names.</p><div className="mt-6"><EvidenceBadge label="PROGRESSION CHECKED" /></div></div></div>
    <div className="mt-10 grid gap-4 md:grid-cols-3">{islands.map(([kicker, title, description, meta]) => <article className="wiki-card p-5" key={title}><div className="wiki-kicker text-wiki-success">{kicker}</div><h2 className="mt-3 text-xl font-semibold text-wiki-primary">{title}</h2><p className="mt-3 text-sm text-wiki-secondary">{description}</p><div className="mt-5 border-t border-wiki-border pt-3 text-[10px] font-bold tracking-[.08em] text-wiki-muted">{meta}</div></article>)}</div>
    <CalloutBox variant="warning" title="ISLAND EVIDENCE RULE">Do not turn community nicknames, copied maps, or one-off spawn observations into confirmed facts.</CalloutBox>
    <div className="mt-8 flex flex-wrap gap-3"><Link href="/entities/bosses" className="wiki-button wiki-button-primary">Open boss gates <ArrowRight className="h-4 w-4" /></Link><Link href="/gear" className="wiki-button wiki-button-secondary">Compare gear</Link></div>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Wiki', item: '/wiki' }, { name: 'Islands', item: '/islands' }])} />
  </div></main>;
}

export function BossesPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Wiki', href: '/wiki' }, { label: 'Bosses' }]} />
    <SectionHeader kicker="BOSS DATABASE" title="Boss Fights & Island Unlocks" sub="Boss progression is confirmed; names, health values, damage, and attack timings stay unconfirmed until repeatable evidence is logged." />
    <PlaceholderMedia label="Cartoon tropical island boss encounter with fishing gear and a distant unlocked island" ratio="aspect-[16/8]" />
    <div className="mt-8 grid gap-4 lg:grid-cols-3">{bossCards.map(([tier, title, role, description]) => <article className={`wiki-card p-6 ${tier === 'S' ? 'border-2 border-wiki-accent' : ''}`} key={title}><div className="flex items-center justify-between"><TierBadge tier={tier} /><span className="text-[10px] font-bold tracking-[.08em] text-wiki-muted">{role}</span></div><h2 className="mt-5 text-xl font-semibold text-wiki-primary">{title}</h2><p className="mt-3 text-sm text-wiki-secondary">{description}</p></article>)}</div>
    <CalloutBox variant="warning" title="UNCONFIRMED COMBAT DATA">This template deliberately avoids boss names, health pools, damage values, and phase timings until they are verified in the current game build.</CalloutBox>
    <div className="mt-8"><Link href="/guides/boss-fights-guide" className="wiki-button wiki-button-primary">Read the boss guide <ArrowRight className="h-4 w-4" /></Link></div>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Wiki', item: '/wiki' }, { name: 'Bosses', item: '/entities/bosses' }])} />
  </div></main>;
}

const updates = [
  ['Launch baseline', 'OFFICIAL', 'Release date, 1–4 player online co-op, 28 achievements, and the core progression loop checked against Steam.', 'CHECKED AUG 25, 2026'],
  ['Fish & sale values', 'DOCUMENTATION', 'Category-level placeholders remain public while species names and prices are verified.', 'STILL BEING DOCUMENTED'],
  ['Boss & island mechanics', 'DOCUMENTATION', 'Progression gates are confirmed; exact combat and spawn details remain unconfirmed.', 'STILL BEING DOCUMENTED'],
] as const;

export function UpdatesPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Wiki', href: '/wiki' }, { label: 'Updates' }]} />
    <SectionHeader kicker="UPDATE TRACKER" title="Patch Notes & Evidence Log" sub="A compact freshness log for official changes and launch-week details that are not ready to publish as facts." />
    <div className="mb-7"><EvidenceBadge label="BASELINE CHECKED" /></div>
    <div className="grid gap-4 lg:grid-cols-3">{updates.map(([title, kicker, description, meta]) => <article className="wiki-card p-5" key={title}><CalendarClock className="h-5 w-5 text-wiki-accent" /><div className="wiki-kicker mt-4">{kicker}</div><h2 className="mt-3 text-xl font-semibold text-wiki-primary">{title}</h2><p className="mt-3 text-sm text-wiki-secondary">{description}</p><div className="mt-5 border-t border-wiki-border pt-3 text-[10px] font-bold tracking-[.08em] text-wiki-muted">{meta}</div></article>)}</div>
    <CalloutBox variant="warning" title="FRESHNESS RULE">An old community post or copied value is not a current game fact. Recheck unstable details before updating the evidence date.</CalloutBox>
    <a href={siteConfig.links.game} target="_blank" rel="noreferrer" className="wiki-button wiki-button-secondary mt-8">Open Steam page <ExternalLink className="h-4 w-4" /></a>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Wiki', item: '/wiki' }, { name: 'Updates', item: '/updates' }])} />
  </div></main>;
}

export function CommunityPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Wiki', href: '/wiki' }, { label: 'Community' }]} />
    <SectionHeader kicker="OFFICIAL CHANNELS" title="Steam & Dazed Games Community" sub="Use the verified game page and developer-linked Discord for announcements, bug reports, and suggestions." />
    <div className="grid gap-4 md:grid-cols-2"><a href={siteConfig.links.game} target="_blank" rel="noreferrer" className="wiki-card wiki-card-link p-6"><ExternalLink className="h-6 w-6 text-wiki-accent" /><div className="wiki-kicker mt-5">OFFICIAL GAME</div><h2 className="mt-2 text-xl font-semibold text-wiki-primary">How to Fish on Steam</h2><p className="mt-3 text-sm text-wiki-secondary">Check the current game description, reviews, achievements, and update history.</p></a><a href={siteConfig.links.group} target="_blank" rel="noreferrer" className="wiki-card wiki-card-link p-6"><Users className="h-6 w-6 text-wiki-success" /><div className="wiki-kicker mt-5 text-wiki-success">OFFICIAL DISCORD</div><h2 className="mt-2 text-xl font-semibold text-wiki-primary">Dazed Games Discord</h2><p className="mt-3 text-sm text-wiki-secondary">The developer website directs bug reports and suggestions to this server.</p></a></div>
    <CalloutBox variant="warning" title="LINK SAFETY">Do not present unrelated fishing communities or copied invite links as official. This Discord was resolved through the website linked from the Steam page.</CalloutBox>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Community', item: '/community' }])} />
  </div></main>;
}

export function ToolsPage() {
  return <main className="wiki-section"><div className="wiki-container"><Breadcrumb items={[{ label: 'Tools' }]} /><SectionHeader kicker="PLAYER TOOLS" title="Plan the next fishing trip" sub="Use your own live values; the template does not hard-code launch-week prices." /><div className="grid gap-4 md:grid-cols-2"><Link href="/calculator" className="wiki-card wiki-card-link p-6"><CalculatorIcon className="h-6 w-6 text-wiki-accent" /><h2 className="mt-4 text-xl font-semibold text-wiki-primary">Fish Earnings Calculator</h2><p className="mt-2 text-sm text-wiki-secondary">Estimate normal trips and a 2x trick-shot scenario.</p></Link><Link href="/checklist" className="wiki-card wiki-card-link p-6"><ShipWheel className="h-6 w-6 text-wiki-success" /><h2 className="mt-4 text-xl font-semibold text-wiki-primary">Departure Checklist</h2><p className="mt-2 text-sm text-wiki-secondary">Save your preparation checks locally in this browser.</p></Link></div></div></main>;
}

// Legacy component names remain export-compatible while their URLs issue 301 redirects.
export const MapsPage = IslandsPage;
export const VerityPage = BossesPage;
