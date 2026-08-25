'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { creatures } from '@/content/creatures';
import { GuideCallout, ProgressBar, VerificationBadge } from './DesignSystem';

const storageKey = 'how-to-fish-creatures-v2';
type Filter = 'all' | 'boss' | 'drip' | 'missing';

const distinct = (key: 'rod' | 'firstAvailableArea') => Array.from(new Set(creatures.map((item) => item[key]).filter((value): value is string => Boolean(value))));

export function CreatureExplorer() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [rod, setRod] = useState('all');
  const [area, setArea] = useState('all');

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (Array.isArray(parsed)) setCompleted(parsed.filter((id): id is string => typeof id === 'string' && creatures.some((creature) => creature.id === id)));
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

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return creatures.filter((creature) => {
      if (filter === 'boss' && creature.type !== 'boss') return false;
      if (filter === 'drip' && !creature.hasDripVariant) return false;
      if (filter === 'missing' && creature.lure && creature.rod && creature.firstAvailableArea) return false;
      if (rod !== 'all' && creature.rod !== rod) return false;
      if (area !== 'all' && creature.firstAvailableArea !== area) return false;
      return !needle || `${creature.name} ${creature.lure || ''} ${creature.rod || ''} ${creature.firstAvailableArea || ''}`.toLowerCase().includes(needle);
    });
  }, [area, filter, query, rod]);

  const collector = creatures.filter((item) => item.collectorRequired);
  const drip = creatures.filter((item) => item.fishipediaRequired);
  const collectorDone = collector.filter((item) => completed.includes(item.id)).length;
  const dripDone = drip.filter((item) => completed.includes(item.id)).length;

  return <section className="creature-database" aria-labelledby="creature-database-title"><h2 id="creature-database-title" className="sr-only">Creature database</h2><div className="database-controls"><label className="database-search"><Search aria-hidden="true" /><span className="sr-only">Search by creature name</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by creature name" /></label><div className="filter-chips" aria-label="Creature filters">{([['all', 'All types'], ['boss', 'Boss'], ['drip', 'Drip'], ['missing', 'Missing only']] as const).map(([value, label]) => <button type="button" className={filter === value ? 'is-active' : undefined} onClick={() => setFilter(value)} aria-pressed={filter === value} key={value}>{label}</button>)}</div><label className="database-select"><span>By rod</span><select value={rod} onChange={(event) => setRod(event.target.value)}><option value="all">All rods</option>{distinct('rod').map((value) => <option value={value} key={value}>{value}</option>)}</select></label><label className="database-select"><span>By area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="all">All areas</option>{distinct('firstAvailableArea').map((value) => <option value={value} key={value}>{value}</option>)}</select></label></div><div className="database-progress"><ProgressBar label="Collector progress (documented)" value={collectorDone} max={collector.length} /><ProgressBar label="Fishipedia Drip progress (documented)" value={dripDone} max={drip.length} tone="sky" /></div><div className="table-scroll"><table className="creature-table"><thead><tr><th>Creature</th><th>Type</th><th>Lure / bait</th><th>Rod</th><th>First area</th><th>Evidence</th></tr></thead><tbody>{results.map((creature) => <tr key={creature.id}><th scope="row"><label className="creature-check"><input type="checkbox" checked={completed.includes(creature.id)} onChange={() => toggle(creature.id)} /><span aria-hidden="true" />{creature.name}</label></th><td className={creature.type === 'boss' ? 'text-coral' : undefined}>{creature.type}</td><td className={creature.lure ? 'text-teal' : 'text-muted'}>{creature.lure || 'Unconfirmed'}</td><td className={creature.rod ? undefined : 'text-muted'}>{creature.rod || 'Unconfirmed'}</td><td className={creature.firstAvailableArea ? undefined : 'text-muted'}>{creature.firstAvailableArea || 'Unconfirmed'}</td><td><Evidence level={creature.sourceLevel} /></td></tr>)}</tbody></table></div><GuideCallout title="Data accuracy rule" variant="tip"><p>Community testing suggests catches are driven mainly by lure, not island. We list first available and observed areas only; we never claim a creature is exclusive to one island until verified in-game.</p></GuideCallout></section>;
}

function Evidence({ level }: { level: typeof creatures[number]['sourceLevel'] }) {
  if (level === 'official') return <VerificationBadge kind="official" />;
  if (level === 'verified-in-game') return <VerificationBadge kind="verified" />;
  if (level === 'community') return <VerificationBadge kind="community" />;
  return <VerificationBadge kind="unconfirmed" />;
}
