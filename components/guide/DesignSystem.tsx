import Link from 'next/link';
import { AlertTriangle, BadgeCheck, CalendarDays, CheckCircle2, ExternalLink, Info, Radio, ShieldCheck } from 'lucide-react';
import type { GuidePage, SourceReference } from '@/content/types';

export type AccentTone = 'walkthrough' | 'boss' | 'fish' | 'wiki';
export type VerificationKind = 'official' | 'verified' | 'patch' | 'community' | 'unconfirmed' | 'version-sensitive';
export type IssueState = 'official-fix' | 'officially-acknowledged' | 'attempted-fix' | 'community-workaround' | 'still-reported' | 'unverified';

const verification: Record<VerificationKind, { label: string; icon: typeof BadgeCheck }> = {
  official: { label: 'Official', icon: ShieldCheck },
  verified: { label: 'Verified In-Game', icon: CheckCircle2 },
  patch: { label: 'Verified on Patch', icon: BadgeCheck },
  community: { label: 'Community Report', icon: Radio },
  unconfirmed: { label: 'Unconfirmed', icon: Info },
  'version-sensitive': { label: 'Version-Sensitive', icon: AlertTriangle },
};

export function VerificationBadge({ kind, label }: { kind: VerificationKind; label?: string }) {
  const item = verification[kind];
  const Icon = item.icon;
  return <span className={`v2-badge v2-badge-${kind}`}><Icon aria-hidden="true" />{label || item.label}</span>;
}

const issueLabels: Record<IssueState, string> = {
  'official-fix': 'Official Fix',
  'officially-acknowledged': 'Officially Acknowledged',
  'attempted-fix': 'Attempted Fix',
  'community-workaround': 'Community Workaround',
  'still-reported': 'Still Reported',
  unverified: 'Unverified',
};

export function IssueStatusTag({ state, label }: { state: IssueState; label?: string }) {
  return <span className={`issue-tag issue-tag-${state}`}>{label || issueLabels[state]}</span>;
}

export function QuickAnswer({ answer, tone = 'walkthrough' }: { answer: string; tone?: AccentTone }) {
  return <aside className={`v2-quick-answer v2-tone-${tone}`} aria-labelledby="quick-answer-title"><div id="quick-answer-title">Quick Answer</div><p>{answer}</p></aside>;
}

export function GuideHeader({ page, tone = 'walkthrough' }: { page: GuidePage; tone?: AccentTone }) {
  const parts = page.route.split('/').filter(Boolean);
  let current = '';
  const crumbs = [{ label: 'Home', href: '/' }, ...parts.map((part) => {
    current += `/${part}`;
    return { label: part.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), href: `${current}/` };
  })];
  return <header className="v2-guide-header"><nav className="v2-breadcrumb" aria-label="Breadcrumb">{crumbs.map((crumb, index) => <span key={crumb.href}>{index ? <i aria-hidden="true">/</i> : null}{index === crumbs.length - 1 ? <b>{crumb.label}</b> : <Link href={crumb.href}>{crumb.label}</Link>}</span>)}</nav><div className="v2-header-badges"><span className={`v2-category v2-category-${tone}`}>{page.eyebrow}</span><VerificationBadge kind="patch" label={`Verified on Patch ${page.verifiedPatch}`} />{page.contentStatus === 'version-sensitive' || page.contentStatus === 'attempted-fix' ? <VerificationBadge kind="version-sensitive" /> : <VerificationBadge kind="official" />}</div><h1>{page.h1}</h1><div className="v2-guide-meta"><CalendarDays aria-hidden="true" />Last updated {page.lastUpdated}<span>·</span>Verified patch {page.verifiedPatch}</div><QuickAnswer answer={page.quickAnswer} tone={tone} /></header>;
}

export function KeyFacts({ facts, columns }: { facts: Array<{ label: string; value: string; emphasis?: boolean }>; columns?: 4 | 5 }) {
  return <dl className={`v2-key-facts v2-key-facts-${columns || (facts.length >= 5 ? 5 : 4)}`}>{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd className={fact.emphasis ? 'is-emphasis' : undefined}>{fact.value}</dd></div>)}</dl>;
}

export function GuideCallout({ title, children, variant = 'tip' }: { title: string; children: React.ReactNode; variant?: 'tip' | 'warning' | 'version' }) {
  return <aside className={`v2-callout v2-callout-${variant}`}><strong>{title}</strong><div>{children}</div></aside>;
}

export function ProgressBar({ label, value, max, tone = 'teal' }: { label: string; value: number; max: number; tone?: 'teal' | 'sky' }) {
  const safeMax = Math.max(max, 1);
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  return <div className="v2-progress"><div><span>{label}</span><strong>{safeValue} / {safeMax}</strong></div><div className="v2-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={safeValue}><span className={`v2-progress-fill v2-progress-${tone}`} style={{ width: `${(safeValue / safeMax) * 100}%` }} /></div></div>;
}

export function FaqAccordion({ title, items }: { title: string; items: Array<{ question: string; answer: string }> }) {
  return <section className="v2-faq" id="faq"><div className="v2-kicker v2-kicker-wiki">FAQ</div><h2>{title}</h2><div>{items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></section>;
}

export function SourceLine({ sources, lastUpdated }: { sources: SourceReference[]; lastUpdated: string }) {
  return <div className="v2-source-line"><span>Sources:</span>{sources.map((source) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.id}>{source.label}<ExternalLink aria-hidden="true" /></a>)}<span>Last verified {lastUpdated}.</span></div>;
}

export function RelatedGuideChips({ routes }: { routes: Array<{ label: string; href: string }> }) {
  return <nav className="v2-related" aria-label="Related guides"><span>Related guides</span><div>{routes.map((route) => <Link href={route.href} key={route.href}>{route.label}</Link>)}</div></nav>;
}
