'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search, Trophy } from 'lucide-react';
import { achievements } from '@/content/achievements';
import { ProgressBar } from './DesignSystem';

const storageKey = 'how-to-fish-achievements-v1';

export function AchievementChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(value)) setCompleted(value.filter((id): id is string => typeof id === 'string' && achievements.some((item) => item.id === id)));
    } catch {
      setCompleted([]);
    }
  }, []);

  function toggle(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return achievements.filter((item) => (category === 'all' || item.category === category) && (!needle || `${item.name} ${item.officialDescription}`.toLowerCase().includes(needle)));
  }, [category, query]);

  const percent = Math.round((completed.length / achievements.length) * 100);

  return <section className="data-module" aria-labelledby="achievement-checklist-title">
    <div className="data-module-head"><div><span className="v2-kicker v2-kicker-walkthrough">Your browser · No login</span><h2 id="achievement-checklist-title">Interactive achievement checklist</h2></div><div className="progress-dial"><Trophy className="h-5 w-5" /><strong>{percent}%</strong><small>{completed.length} of 28</small></div></div>
    <ProgressBar label="Achievement progress" value={completed.length} max={achievements.length} />
    <div className="data-controls"><label className="data-search"><Search className="h-4 w-4" /><span className="sr-only">Search achievements</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search achievement or requirement" /></label><label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option><option value="story">Story</option><option value="combat">Combat</option><option value="collection">Collection</option><option value="money">Money</option><option value="challenge">Challenge</option></select></label></div>
    <div className="achievement-list">{filtered.map((item) => <div className={`achievement-row ${completed.includes(item.id) ? 'is-complete' : ''}`} id={item.id} key={item.id}><label className="achievement-toggle" aria-label={`Mark ${item.name} complete`}><input type="checkbox" checked={completed.includes(item.id)} onChange={() => toggle(item.id)} /><span className="achievement-checkmark" aria-hidden="true" /></label><span className="achievement-copy"><strong>{item.name}</strong><small>{item.officialDescription}</small><em>{item.unlockMethod}</em>{item.relatedGuide ? <Link className="achievement-detail-link" href={item.relatedGuide}>Open detailed route →</Link> : null}</span><span className="achievement-meta"><b>{item.steamCompletionRate}%</b><small>{item.category}</small>{item.versionSensitive ? <i>Version-sensitive</i> : null}</span></div>)}</div>
    <p className="data-footnote">Progress is stored in localStorage on this device only. Steam remains the source of truth for actual unlocks.</p>
  </section>;
}
