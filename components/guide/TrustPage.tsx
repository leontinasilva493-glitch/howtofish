import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function TrustPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: Array<{ title: string; paragraphs: string[] }> }) {
  return <main className="trust-page"><div className="wiki-container"><Link href="/" className="trust-back"><ArrowLeft className="h-4 w-4" />Back to the guide</Link><div className="wiki-kicker">{eyebrow}</div><h1>{title}</h1><p className="trust-intro">{intro}</p><div className="trust-sections">{sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div><aside className="trust-disclaimer"><strong>Unofficial fan resource</strong><p>How to Fish, its screenshots, names, and trademarks belong to their respective owners. This site is not affiliated with Dazed Games or Valve.</p><a href={siteConfig.links.game} target="_blank" rel="noopener noreferrer">Official Steam page <ExternalLink className="h-4 w-4" /></a></aside></div></main>;
}
