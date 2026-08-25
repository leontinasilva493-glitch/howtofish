'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { guides } from './data';

const filters = ['ALL', 'BEGINNER', 'MONEY', 'GEAR', 'BOSS', 'GAMBLING', 'CO-OP'];

export function GuideLibrary() {
  const [filter, setFilter] = useState('ALL');
  const visible = filter === 'ALL' ? guides : guides.filter((guide) => guide.category === filter);
  return <>
    <div className="mb-6 flex flex-wrap gap-2">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-xs font-bold tracking-[.06em] transition-colors ${filter === item ? 'border-wiki-accent bg-wiki-accent text-wiki-bg' : 'border-wiki-border-strong bg-wiki-card text-wiki-secondary hover:text-wiki-primary'}`}>{item}</button>)}</div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug} className="wiki-card wiki-card-link p-5"><div className="flex items-center justify-between gap-3"><span className="wiki-kicker">{guide.category}</span>{guide.isNew && <span className="text-[10px] font-bold text-wiki-danger">NEW</span>}</div><h2 className="mt-3 text-xl font-semibold text-wiki-primary">{guide.title}</h2><p className="mt-2 text-sm text-wiki-secondary">{guide.description}</p><div className="mt-5 flex items-center justify-between gap-3 text-xs text-wiki-muted"><span>{guide.date} · {guide.readTime}</span><span className="inline-flex items-center gap-1 font-bold text-wiki-accent">Read More <ArrowRight className="h-4 w-4" /></span></div></Link>)}</div>
    {visible.length === 0 && <div className="wiki-card p-8 text-center text-wiki-secondary">No guides are assigned to this category yet.</div>}
  </>;
}
