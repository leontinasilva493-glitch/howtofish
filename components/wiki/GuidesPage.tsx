import Link from 'next/link';
import { ArrowRight, BookOpen, ExternalLink, List, Route } from 'lucide-react';
import { articleSchema, breadcrumbSchema } from '@/app/schema';
import { siteConfig } from '@/config/site';
import { JsonLd } from './JsonLd';
import { AdSlot, Breadcrumb, EvidenceBadge, SectionHeader } from './Primitives';
import { GuideLibrary } from './GuideLibrary';
import { allGuides, beginnerGuide, type ContentSource, type Guide } from './data';
import { MediaGuideCard } from './MediaBlocks';

export function GuidesHub() {
  return (
    <main className="wiki-section">
      <div className="wiki-container">
        <Breadcrumb items={[{ label: 'Guides' }]} />
        <SectionHeader kicker="GUIDE LIBRARY" title="Answers for the next decision" sub="Every guide begins with a short answer, then shows the route, caveats, evidence boundary, and useful next pages." />
        <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <MediaGuideCard guide={beginnerGuide} featured />
          {allGuides.slice(1, 3).map((guide) => <MediaGuideCard guide={guide} key={guide.slug} />)}
        </div>
        <GuideLibrary />
      </div>
    </main>
  );
}

export function GuideDetail({ slug }: { slug: string }) {
  const guide = allGuides.find((item) => item.slug === slug) as Guide;
  const breadcrumbs = [{ name: 'Home', item: '/' }, { name: 'Guides', item: '/guides' }, { name: guide.title, item: `/guides/${slug}` }];

  return (
    <main>
      <ArticleHero guide={guide} />
      <div className="wiki-container grid items-start gap-10 py-10 lg:grid-cols-[minmax(0,var(--wiki-reading))_280px] lg:gap-16 lg:py-16">
        <article className="wiki-prose min-w-0">
          <QuickAnswer answer={guide.quickAnswer} />
          <MobileArticleNav guide={guide} />
          {guide.sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.steps ? <ol className="grid !list-none !gap-3 !ml-0">{section.steps.map((step, stepIndex) => <li key={step} className="wiki-card relative !m-0 min-h-[58px] py-3 pl-16 pr-4"><span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-wiki-accent text-xs font-black text-wiki-bg">{String(stepIndex + 1).padStart(2, '0')}</span>{step}</li>)}</ol> : null}
              {index === 1 ? <AdSlot label="Ad placement - after the second answer section" /> : null}
            </section>
          ))}
          {guide.communityNote ? <div className="mt-8 rounded-[var(--wiki-radius-card)] border-l-4 border-wiki-success bg-wiki-elevated p-5"><div className="text-xs font-extrabold uppercase tracking-[.08em] text-wiki-success">Community evidence note</div><p className="!mb-0 mt-2">{guide.communityNote}</p></div> : null}
          <SourceList sources={guide.sources} />
          <RelatedGuides currentSlug={guide.slug} />
        </article>
        <DesktopArticleNav guide={guide} />
      </div>
      <JsonLd data={[articleSchema(guide), breadcrumbSchema(breadcrumbs), { '@context': 'https://schema.org', '@type': 'HowTo', name: guide.title, step: guide.sections.flatMap((section) => section.steps?.map((step, index) => ({ '@type': 'HowToStep', position: index + 1, name: step, text: step })) ?? []) }]} />
    </main>
  );
}

function ArticleHero({ guide }: { guide: Guide }) {
  return (
    <header className="relative isolate overflow-hidden bg-[#082c3b] py-12 text-white md:py-16">
      <div className="absolute inset-y-0 right-0 -z-20 hidden w-[48%] md:block"><div className="reef-placeholder h-full border-0 opacity-70" role="img" aria-label={guide.imageAlt}><span>{guide.imageAlt}</span></div></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061722] via-[#082c3bf2] to-[#082c3b4a]" />
      <div className="wiki-container">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#bcd7da]" aria-label="Breadcrumb"><Link href="/" className="hover:text-white">Home</Link><span>/</span><Link href="/guides" className="hover:text-white">Guides</Link><span>/</span><span aria-current="page">{guide.title}</span></nav>
        <div className="max-w-3xl"><div className="text-xs font-extrabold uppercase tracking-[.1em] text-[#f6c84a]">{guide.category} GUIDE</div><h1 className="wiki-heading mt-3 max-w-[15ch] text-4xl text-white md:text-6xl">{guide.title}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-[#dceff0] md:text-lg">{guide.description}</p><div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[#c6e0e3]"><span>Updated {guide.date}</span><span>·</span><span>{guide.readTime}</span><span>·</span><span>By {siteConfig.shortName} editorial team</span><EvidenceBadge label="EVIDENCE CHECKED" /></div></div>
      </div>
    </header>
  );
}

function QuickAnswer({ answer }: { answer: string }) {
  return <div className="wiki-card border-2 border-wiki-strong p-5 shadow-[5px_5px_0_var(--wiki-accent)] md:p-6"><div className="text-xs font-extrabold uppercase tracking-[.1em] text-wiki-accent">Quick answer</div><p className="!mb-0 mt-3 !text-base !leading-relaxed !text-wiki-primary">{answer}</p></div>;
}

function MobileArticleNav({ guide }: { guide: Guide }) {
  return <details className="wiki-card mt-6 p-4 lg:hidden"><summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 font-semibold text-wiki-primary"><List className="h-4 w-4 text-wiki-accent" />On this page</summary><nav className="mt-3 grid gap-1 border-t border-wiki-border pt-3">{guide.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="rounded-md px-2 py-2 text-sm text-wiki-secondary hover:bg-wiki-elevated hover:text-wiki-primary">{section.title}</a>)}{guide.fastRoutes.map((route) => <Link key={route.href} href={route.href} className="rounded-md px-2 py-2 text-sm font-semibold text-wiki-accent">{route.label} <ArrowRight className="inline h-3.5 w-3.5" /></Link>)}</nav></details>;
}

function DesktopArticleNav({ guide }: { guide: Guide }) {
  return <aside className="sticky top-[88px] hidden gap-4 lg:grid"><div className="wiki-card p-5"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.08em] text-wiki-muted"><List className="h-4 w-4" />On this page</div><nav className="mt-4 grid gap-1">{guide.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="rounded-md px-2 py-2 text-sm text-wiki-secondary hover:bg-wiki-elevated hover:text-wiki-primary">{section.title}</a>)}</nav></div><div className="wiki-card p-5"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.08em] text-wiki-muted"><Route className="h-4 w-4" />Fast routes</div><nav className="mt-4 grid gap-1">{guide.fastRoutes.map((route) => <Link key={route.href} href={route.href} className="flex items-center justify-between rounded-md px-2 py-2 text-sm font-semibold text-wiki-accent hover:bg-wiki-elevated">{route.label}<ArrowRight className="h-3.5 w-3.5" /></Link>)}</nav></div></aside>;
}

function SourceList({ sources }: { sources: ContentSource[] }) {
  return <section id="sources" className="mt-12"><div className="wiki-kicker">SOURCES USED ON THIS PAGE</div><h2 className="!mt-3">Trace the evidence</h2><ul className="!ml-0 grid !list-none gap-3">{sources.map((source) => <li className="wiki-card !m-0 p-4" key={source.title}><SourceLink source={source} /><div className="mt-1 text-xs text-wiki-muted">{source.publisher} · accessed {source.accessed}</div><p className="!mb-0 mt-2 !text-sm">{source.note}</p></li>)}</ul></section>;
}

function SourceLink({ source }: { source: ContentSource }) {
  const className = 'inline-flex items-center gap-2 font-semibold text-wiki-primary hover:text-wiki-accent';
  return source.url.startsWith('/') ? <Link href={source.url} className={className}>{source.title}<ArrowRight className="h-4 w-4" /></Link> : <a href={source.url} target="_blank" rel="noreferrer" className={className}>{source.title}<ExternalLink className="h-4 w-4" /></a>;
}

function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const related = allGuides.filter((guide) => guide.slug !== currentSlug).slice(0, 3);
  return <section className="mt-12"><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.08em] text-wiki-muted"><BookOpen className="h-4 w-4" />Related guides</div><div className="mt-4 grid gap-3 md:grid-cols-3">{related.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug} className="wiki-card wiki-card-link p-4"><div className="text-[10px] font-bold tracking-[.08em] text-wiki-accent">{guide.category}</div><h3 className="mt-2 text-sm font-semibold leading-snug text-wiki-primary">{guide.title}</h3><div className="mt-3 text-xs text-wiki-muted">{guide.readTime} · Open answer</div></Link>)}</div></section>;
}
