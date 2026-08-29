import type { GuidePage } from '@/content/types';
import { resolveSources } from '@/content/sources';
import { CreatureExplorer } from './CreatureExplorer';
import { FaqAccordion, GuideHeader, SourceLine } from './DesignSystem';
import { MobilePageNav } from './EditorialBlocks';
import { GuideStructuredData } from './StructuredData';

export function FishDatabasePage({ page }: { page: GuidePage }) {
  return <main className="core-page fish-database-page"><div className="wiki-container"><GuideHeader page={page} tone="fish" /><MobilePageNav page={page} extraItems={[{ href: '#creature-database-title', label: 'Search the creature database' }]} /><CreatureExplorer /><FaqAccordion title="Fish, Rods and Bait FAQ" items={page.faqs} /><SourceLine sources={resolveSources(page.sources)} lastUpdated={page.lastUpdated} /></div><GuideStructuredData page={page} /></main>;
}
