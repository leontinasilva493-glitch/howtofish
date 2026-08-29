import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { GuidePage } from '@/content/types';
import { resolveSources } from '@/content/sources';
import { FaqAccordion, GuideHeader, RelatedGuideChips, SourceLine } from './DesignSystem';
import { GuideSections } from './EditorialBlocks';
import { GuideStructuredData } from './StructuredData';

const chapters = [
  ['1', 'Chapter 1: Lighthouse', 'Get the Radar, catch the Spider Crab, keep its quest result, and receive the Boat Keys.', 'Lighthouse area guide', '/islands/lighthouse/'],
  ['2', 'Chapter 2: Forest', 'Find three leeches, confirm the boss bait, defeat the Giant Piranha, and return its quest drop.', 'Forest area guide', '/islands/forest/'],
  ['3', 'Chapter 3: Desert', 'Complete the endangered-creature quest, get the carrot-bait lead, defeat Pufferfish, and return its drop.', 'Desert area guide', '/islands/desert/'],
  ['4', 'Chapter 4: Rocks', 'Catch the Tuna, use the current trigger for the Terrorizing Bird, fight from cover, and collect the reward.', 'Rocks area guide', '/islands/rocks/'],
  ['5', 'Chapter 5: Volcano', 'Finish the military and scientist quests, catch the Bowhead Whale, trigger the final boss, and complete the hand-in.', 'Volcano area guide + final boss guide', '/islands/volcano/'],
] as const;

export function WalkthroughPageView({ page }: { page: GuidePage }) {
  return <main className="core-page walkthrough-page"><div className="wiki-container"><GuideHeader page={page} tone="walkthrough" /><section className="chapter-list" aria-label="Walkthrough chapter shortcuts">{chapters.map(([number, title, copy, label, href], index) => <article className={`chapter-card ${index === chapters.length - 1 ? 'chapter-card-final' : ''}`} key={href}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p><Link href={href}>{label}<ArrowRight aria-hidden="true" /></Link></div></article>)}</section><GuideSections sections={page.sections} /><FaqAccordion title="How to Fish Walkthrough FAQ" items={page.faqs} /><RelatedGuideChips routes={[{ label: 'All Islands', href: '/islands/' }, { label: 'All Bosses', href: '/bosses/' }, { label: 'Fixes', href: '/fixes/' }, { label: 'Final Boss', href: '/bosses/mutated-bowhead-whale/' }]} /><SourceLine sources={resolveSources(page.sources)} lastUpdated={page.lastUpdated} /></div><GuideStructuredData page={page} /></main>;
}
