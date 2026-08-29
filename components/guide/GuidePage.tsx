import Image from 'next/image';
import type { GuidePage } from '@/content/types';
import { resolveSources } from '@/content/sources';
import { FaqAccordion, GuideHeader, KeyFacts, RelatedGuideChips, SourceLine } from './DesignSystem';
import { EvidenceSplitTable, FailureBranchTable, GuideMediaBlock, GuideSections, MobilePageNav } from './EditorialBlocks';
import { GuideStructuredData } from './StructuredData';

function routeLabel(route: string) {
  if (route === '/') return 'Home';
  const clean = route.split('#')[0].replace(/^\/+|\/+$/g, '');
  return clean.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) || route;
}

function pageTone(page: GuidePage) {
  if (page.pageType.includes('boss')) return 'boss' as const;
  if (page.pageType.includes('creature')) return 'fish' as const;
  if (page.pageType.includes('troubleshooting') || page.pageType.includes('multiplayer')) return 'wiki' as const;
  return 'walkthrough' as const;
}

export function GuidePageView({ page, children }: { page: GuidePage; children?: React.ReactNode }) {
  const tone = pageTone(page);
  return <main className={`core-page shared-guide-page shared-guide-${tone}`}><div className="wiki-container"><GuideHeader page={page} tone={tone} /><MobilePageNav page={page} /><KeyFacts facts={page.keyFacts} />{page.image ? <figure className="guide-article-image"><Image src={page.image} alt={page.imageAlt || ''} fill sizes="(max-width: 768px) 100vw, 1200px" /></figure> : null}{children}<GuideSections sections={page.sections} /><EvidenceSplitTable rows={page.evidenceRows} /><FailureBranchTable rows={page.failureBranches} title={page.failureHeading} /><GuideMediaBlock media={page.media} /><FaqAccordion title={`${page.h1} FAQ`} items={page.faqs} /><RelatedGuideChips routes={page.relatedPages.slice(0, 6).map((route) => ({ label: routeLabel(route), href: route }))} /><div className="v2-update-line"><span>Page update</span>{page.updateLog.map((item) => <p key={`${item.date}-${item.note}`}><time>{item.date}</time>{item.note}</p>)}</div><SourceLine sources={resolveSources(page.sources)} lastUpdated={page.lastUpdated} /></div><GuideStructuredData page={page} /></main>;
}
