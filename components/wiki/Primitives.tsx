import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Info, TriangleAlert } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function SectionHeader({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return <div className="mb-7"><div className="wiki-kicker">{kicker}</div><h2 className="wiki-heading mt-2 text-3xl text-wiki-primary md:text-4xl">{title}</h2>{sub && <p className="mt-3 max-w-2xl text-wiki-secondary">{sub}</p>}</div>;
}

const evidenceMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function EvidenceBadge({ label = 'EVIDENCE CHECKED', date = siteConfig.evidenceDate }: { label?: string; date?: string }) {
  const [year, month, day] = date.split('-');
  const dateLabel = `${evidenceMonths[Number(month) - 1]} ${Number(day)}, ${year}`;
  return <span className="evidence-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold tracking-[.06em] text-wiki-success"><Check className="h-3.5 w-3.5" />{label} · {dateLabel}</span>;
}

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-wiki-muted" aria-label="Breadcrumb"><Link href="/" className="hover:text-wiki-primary">Home</Link>{items.map((item) => <span key={item.label} className="flex items-center gap-2"><span>/</span>{item.href ? <Link href={item.href} className="hover:text-wiki-primary">{item.label}</Link> : <span className="text-wiki-secondary">{item.label}</span>}</span>)}</nav>;
}

export function PlaceholderMedia({ label, ratio = 'aspect-[16/9]' }: { label: string; ratio?: string }) {
  return <div className={`wiki-placeholder ${ratio}`} role="img" aria-label={`Image placeholder: ${label}`}>Image: {label}</div>;
}

export function ImageMedia({ src, alt, ratio = 'aspect-[16/9]', priority = false }: { src: string; alt: string; ratio?: string; priority?: boolean }) {
  return <div className={`wiki-media ${ratio}`}><Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 720px" priority={priority} /></div>;
}

export function TierBadge({ tier }: { tier: 'S' | 'A' | 'B' | 'C' }) {
  return <span className={`grid h-8 w-8 place-items-center rounded-md font-display font-bold text-wiki-bg tier-${tier.toLowerCase()}`}>{tier}</span>;
}

export function CTAButton({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  return <Link href={href} className={`wiki-button ${variant === 'primary' ? 'wiki-button-primary' : 'wiki-button-secondary'}`}>{children}<ArrowRight className="h-4 w-4" /></Link>;
}

export function AdSlot({ label = 'Ad placement' }: { label?: string }) {
  return <div className="my-8 grid min-h-[90px] place-items-center border border-dashed border-wiki-border text-[11px] uppercase tracking-[.08em] text-wiki-muted" aria-label={label}>{label}</div>;
}

export function CalloutBox({ variant = 'tip', title, children }: { variant?: 'tip' | 'warning'; title: string; children: React.ReactNode }) {
  return <div className={`rounded-lg border p-5 ${variant === 'tip' ? 'callout-tip' : 'callout-warning'}`}><div className={`mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.08em] ${variant === 'tip' ? 'text-wiki-accent' : 'text-wiki-danger'}`}>{variant === 'tip' ? <Info className="h-4 w-4" /> : <TriangleAlert className="h-4 w-4" />}{title}</div><div className="text-sm text-wiki-secondary">{children}</div></div>;
}
