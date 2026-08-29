import Image from 'next/image';
import type { GuidePage } from '@/content/types';
import { resolveSources } from '@/content/sources';
import { FaqAccordion, GuideHeader, KeyFacts, RelatedGuideChips, SourceLine } from './DesignSystem';
import { GuideStructuredData } from './StructuredData';
import { EvidenceSplitTable, FailureBranchTable, GuideMediaBlock, GuideSections } from './EditorialBlocks';

export function BossFeaturePage({ page }: { page: GuidePage }) {
  const facts = page.keyFacts.map((fact, index) => ({ ...fact, emphasis: index === page.keyFacts.length - 1 }));
  return <main className="core-page boss-feature-page"><div className="wiki-container"><GuideHeader page={page} tone="boss" /><KeyFacts columns={5} facts={facts} />{page.image ? <figure className="boss-hero-image"><Image src={page.image} alt={page.imageAlt || ''} fill priority sizes="(max-width: 768px) 100vw, 1200px" /></figure> : null}<GuideSections sections={page.sections} /><EvidenceSplitTable rows={page.evidenceRows} /><FailureBranchTable rows={page.failureBranches} /><GuideMediaBlock media={page.media} /><RelatedGuideChips routes={[{ label: 'Volcano Island Guide', href: '/islands/volcano/' }, { label: 'Full Walkthrough', href: '/walkthrough/' }, { label: 'Handyman Achievement', href: '/achievements/handyman/' }]} /><FaqAccordion title="Mutated Bowhead Whale FAQ" items={page.faqs} /><SourceLine sources={resolveSources(page.sources)} lastUpdated={page.lastUpdated} /></div><GuideStructuredData page={page} /></main>;
}
