'use client';

import { Check, RotateCcw, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { filterTrackerItems, readTrackerProgress, serializeTrackerProgress, toggleTrackerProgress } from '@/lib/tracker';

const storageKey = 'how-to-fish-departure-checklist-v1';

const trackerItems = [
  { id: 'goal', category: 'READINESS', title: 'Choose the trip goal', description: 'Decide whether this run is for money, gear, a boss gate, or collection progress.' },
  { id: 'route', category: 'ROUTE', title: 'Choose the next island gate', description: 'Know which confirmed progression step the trip is meant to unlock.' },
  { id: 'gear', category: 'GEAR', title: 'Check current gear', description: 'Bring equipment you can replace and verify the live dock shop before spending.' },
  { id: 'reserve', category: 'MONEY', title: 'Protect upgrade money', description: 'Keep required progression coins outside any optional gamble.' },
  { id: 'callout', category: 'CO-OP', title: 'Agree on one shared objective', description: 'Tell the group whether the run is for catching, selling, a boss, or achievements.' },
  { id: 'regroup', category: 'CO-OP', title: 'Pick a regroup point', description: 'Return together before a boss fight or betting-table decision.' },
  { id: 'source', category: 'EVIDENCE', title: 'Check the evidence date', description: 'Re-check tactics that may have changed after a game update.' },
  { id: 'unknown', category: 'EVIDENCE', title: 'Label unresolved values', description: 'Keep uncertain fish prices, spawns, and boss stats out of confirmed guidance.' },
] as const;

const categories = ['ALL', ...Array.from(new Set(trackerItems.map((item) => item.category)))] as const;
const validIds = trackerItems.map((item) => item.id);

export function ChecklistTracker() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCompleted(readTrackerProgress(localStorage.getItem(storageKey), validIds));
    setLoaded(true);
  }, []);

  const visibleItems = useMemo(() => filterTrackerItems(trackerItems, query, category), [query, category]);
  const percentage = Math.round((completed.length / trackerItems.length) * 100);

  function toggleItem(itemId: string) {
    setCompleted((current) => {
      const next = toggleTrackerProgress(current, itemId);
      localStorage.setItem(storageKey, serializeTrackerProgress(next));
      return next;
    });
  }

  function resetProgress() {
    localStorage.removeItem(storageKey);
    setCompleted([]);
  }

  return <div>
    <div className="wiki-card grid gap-5 border-2 border-wiki-strong bg-wiki-elevated p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
      <div><div className="wiki-kicker">LOCAL PROGRESS</div><div className="mt-2 flex items-baseline gap-3"><span className="font-display text-5xl font-bold text-wiki-primary">{loaded ? completed.length : '—'}</span><span className="text-sm font-semibold text-wiki-secondary">/ {trackerItems.length} ready</span></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-wiki-bg" role="progressbar" aria-label="Checklist completion" aria-valuemin={0} aria-valuemax={trackerItems.length} aria-valuenow={completed.length}><div className="h-full rounded-full bg-wiki-accent transition-[width]" style={{ width: `${percentage}%` }} /></div></div>
      <button type="button" onClick={resetProgress} className="wiki-button wiki-button-secondary"><RotateCcw className="h-4 w-4" />Reset local progress</button>
    </div>
    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><label className="grid gap-2 text-sm font-semibold text-wiki-primary">Search checklist<span className="flex min-h-[48px] items-center gap-2 rounded-lg border border-wiki-border-strong bg-wiki-card px-3"><Search className="h-4 w-4 text-wiki-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none placeholder:text-wiki-muted" placeholder="Try route, light, or evidence" /></span></label><div className="flex flex-wrap gap-2" aria-label="Checklist categories">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-[44px] rounded-full border px-4 py-2 text-xs font-bold tracking-[.06em] ${category === item ? 'border-wiki-accent bg-wiki-accent text-wiki-bg' : 'border-wiki-border-strong bg-wiki-card text-wiki-secondary hover:text-wiki-primary'}`}>{item}</button>)}</div></div>
    <div className="mt-6 grid gap-3 md:grid-cols-2">{visibleItems.map((item) => { const isComplete = completed.includes(item.id); return <article key={item.id} className={`wiki-card grid grid-cols-[auto_1fr] gap-4 p-4 transition-colors ${isComplete ? 'border-wiki-success bg-wiki-elevated' : ''}`}><button type="button" onClick={() => toggleItem(item.id)} aria-pressed={isComplete} aria-label={`${isComplete ? 'Mark incomplete' : 'Mark complete'}: ${item.title}`} className={`grid h-11 w-11 place-items-center rounded-lg border-2 ${isComplete ? 'border-wiki-success bg-wiki-success text-wiki-bg' : 'border-wiki-border-strong bg-wiki-bg text-wiki-muted'}`}>{isComplete ? <Check className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}</button><div><div className="text-[10px] font-extrabold uppercase tracking-[.08em] text-wiki-accent">{item.category}</div><h2 className="mt-1 text-base font-semibold text-wiki-primary">{item.title}</h2><p className="mt-1 text-sm text-wiki-secondary">{item.description}</p></div></article>; })}</div>
    {visibleItems.length === 0 ? <div className="wiki-card mt-6 p-8 text-center text-sm text-wiki-secondary">No checklist item matches this filter.</div> : null}
  </div>;
}
