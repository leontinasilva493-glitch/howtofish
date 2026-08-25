import Link from 'next/link';
import { ArrowRight, Coins, Dices, ShieldCheck, Sparkles } from 'lucide-react';
import { breadcrumbSchema } from '@/app/schema';
import { JsonLd } from './JsonLd';
import { AdSlot, Breadcrumb, CalloutBox, EvidenceBadge, PlaceholderMedia, SectionHeader } from './Primitives';

const mechanics = [
  ['TRICK SHOTS', 'Earned upside', 'Stylish shots can increase the money earned from a catch. Confirm the live result rather than assuming every attempt pays 2x.', Sparkles],
  ['BETTING TABLE', 'Optional risk', 'The gambling system can multiply an in-game haul or wipe it out. Protect required upgrade money first.', Dices],
  ['REAL MONEY', 'Not involved', 'The developer explicitly describes gambling with fish and no real-money transactions.', ShieldCheck],
] as const;

export function GamblingPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Gambling & Trick Shots' }]} />
    <SectionHeader kicker="HIGH STAKES" title="Gambling & Trick Shots Explained" sub="Two different risk decisions: perform a stylish catch for more money, then choose whether the betting table is worth risking the result." />
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><PlaceholderMedia label="Cartoon fish on a casino table with dice and coins, dark teal background" ratio="aspect-square" /><div className="wiki-card p-6"><Coins className="h-7 w-7 text-wiki-accent" /><div className="font-display mt-5 text-7xl text-wiki-accent">2X</div><h2 className="wiki-heading mt-2 text-2xl text-wiki-primary">Trick-shot payout scenario</h2><p className="mt-4 text-sm text-wiki-secondary">The calculator shows a 2x comparison so you can see the upside without treating it as a guaranteed rate for every catch.</p><div className="mt-6 flex flex-wrap gap-3"><EvidenceBadge label="NO REAL MONEY" /><Link href="/calculator" className="wiki-button wiki-button-secondary">Open calculator <ArrowRight className="h-4 w-4" /></Link></div></div></div>
    <section className="mt-10"><SectionHeader kicker="MECHANICS" title="Keep execution, betting, and progression separate" /><div className="grid gap-4 md:grid-cols-3">{mechanics.map(([kicker, title, description, Icon]) => <article className="wiki-card p-5" key={kicker}><Icon className="h-6 w-6 text-wiki-accent" /><div className="wiki-kicker mt-5">{kicker}</div><h2 className="mt-2 text-xl font-semibold text-wiki-primary">{title}</h2><p className="mt-3 text-sm text-wiki-secondary">{description}</p></article>)}</div></section>
    <CalloutBox variant="warning" title="NO CODES, NO CASH WAGERING">How to Fish is a paid Steam game, not a Roblox experience. It has no redeem-code system, and its gambling uses fish/in-game value rather than real money.</CalloutBox>
    <AdSlot label="Ad placement - gambling guide" />
    <Link href="/guides/gambling-guide" className="wiki-button wiki-button-primary">Read the full strategy guide <ArrowRight className="h-4 w-4" /></Link>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Gambling & Trick Shots', item: '/gambling' }])} />
  </div></main>;
}

export const CodesPage = GamblingPage;
