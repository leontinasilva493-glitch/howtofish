'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { creatures } from '@/content/creatures';
import { getBrowserStorage, readStoredIds, removeStoredIds, writeStoredIds, type StorageLike } from '@/lib/client-storage';
import { GuideCallout, ProgressBar, VerificationBadge } from './DesignSystem';
import { ProgressBackup } from './ProgressBackup';

const storageKey = 'how-to-fish-creatures-v2';
const creatureIds = creatures.map((creature) => creature.id);
type Filter = 'all' | 'boss' | 'mini-boss' | 'drip' | 'missing';

const distinct = (key: 'rod' | 'firstAvailableArea') => Array.from(new Set(creatures.map((item) => item[key]).filter((value): value is string => Boolean(value))));

export function CreatureExplorer() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [rod, setRod] = useState('all');
  const [area, setArea] = useState('all');
  const [storageAvailable, setStorageAvailable] = useState(true);
  const storageRef = useRef<StorageLike | null>(null);

  useEffect(() => {
    const storage = getBrowserStorage();
    storageRef.current = storage;
    const stored = readStoredIds(storage, storageKey, creatureIds);
    setCompleted(stored.ids);
    setStorageAvailable(stored.available);
  }, []);

  function toggle(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      if (!writeStoredIds(storageRef.current, storageKey, next)) setStorageAvailable(false);
      return next;
    });
  }

  function restoreProgress(ids: string[]) {
    setCompleted(ids);
    if (!writeStoredIds(storageRef.current, storageKey, ids)) setStorageAvailable(false);
  }

  function resetProgress() {
    setCompleted([]);
    if (!removeStoredIds(storageRef.current, storageKey)) setStorageAvailable(false);
  }

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return creatures.filter((creature) => {
      if (filter === 'boss' && creature.type !== 'boss') return false;
      if (filter === 'mini-boss' && creature.type !== 'mini-boss') return false;
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

  const clearFilters = () => { setQuery(''); setFilter('all'); setRod('all'); setArea('all'); };
  return <section className="creature-database" aria-labelledby="creature-database-title"><h2 id="creature-database-title" className="sr-only">Creature database</h2><div className="database-controls"><label className="database-search"><Search aria-hidden="true" /><span className="sr-only">Search by creature name</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by creature name" /></label><div className="filter-chips" aria-label="Creature filters">{([['all', 'All types'], ['boss', 'Boss'], ['mini-boss', 'Mini-boss'], ['drip', 'Drip'], ['missing', 'Missing only']] as const).map(([value, label]) => <button type="button" className={filter === value ? 'is-active' : undefined} onClick={() => setFilter(value)} aria-pressed={filter === value} key={value}>{label}</button>)}</div><label className="database-select"><span>By rod</span><select value={rod} onChange={(event) => setRod(event.target.value)}><option value="all">All rods</option>{distinct('rod').map((value) => <option value={value} key={value}>{value}</option>)}</select></label><label className="database-select"><span>By area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="all">All areas</option>{distinct('firstAvailableArea').map((value) => <option value={value} key={value}>{value}</option>)}</select></label></div><p className="data-result-summary" aria-live="polite">{results.length} documented {results.length === 1 ? 'creature' : 'creatures'}</p><div className="database-progress"><ProgressBar label="Collector progress (documented)" value={collectorDone} max={collector.length} /><ProgressBar label="Fishipedia Drip progress (documented)" value={dripDone} max={drip.length} tone="sky" /></div>{results.length ? <><div className="table-scroll creature-desktop-table" role="region" aria-label="Creature database table" tabIndex={0}><table className="creature-table"><thead><tr><th>Creature</th><th>Type</th><th>Lure / bait</th><th>Rod</th><th>First area</th><th>Evidence</th></tr></thead><tbody>{results.map((creature) => <tr key={creature.id}><th scope="row"><label className="creature-check"><input type="checkbox" checked={completed.includes(creature.id)} onChange={() => toggle(creature.id)} /><span aria-hidden="true" />{creature.name}</label></th><td className={creature.type === 'boss' ? 'text-coral' : undefined}>{creature.type}</td><td className={creature.lure ? 'text-teal' : 'text-muted'}>{creature.lure || 'Unconfirmed'}</td><td className={creature.rod ? undefined : 'text-muted'}>{creature.rod || 'Unconfirmed'}</td><td className={creature.firstAvailableArea ? undefined : 'text-muted'}>{creature.firstAvailableArea || 'Unconfirmed'}</td><td><Evidence level={creature.sourceLevel} /></td></tr>)}</tbody></table></div><div className="creature-mobile-list">{results.map((creature) => <details className="creature-mobile-card" key={creature.id}><summary>{creature.name}<span>{creature.type} · {creature.firstAvailableArea || 'Area unconfirmed'}</span></summary><div><label className="creature-check"><input type="checkbox" checked={completed.includes(creature.id)} onChange={() => toggle(creature.id)} /><span aria-hidden="true" />Mark documented</label><dl><div><dt>Lure / bait</dt><dd>{creature.lure || 'Unconfirmed'}</dd></div><div><dt>Rod</dt><dd>{creature.rod || 'Unconfirmed'}</dd></div><div><dt>First area</dt><dd>{creature.firstAvailableArea || 'Unconfirmed'}</dd></div><div><dt>Evidence</dt><dd><Evidence level={creature.sourceLevel} /></dd></div></dl></div></details>)}</div></> : <div className="data-empty-state"><strong>No documented creature matches these filters.</strong><p>Try a broader name, rod, area, or creature type.</p><button type="button" className="wiki-button wiki-button-secondary" onClick={clearFilters}>Clear all filters</button></div>}{!storageAvailable ? <p className="storage-warning" role="status">Progress works for this tab, but this browser is blocking saved storage.</p> : null}<ProgressBackup tracker="creatures" ids={completed} validIds={creatureIds} onRestore={restoreProgress} onReset={resetProgress} /><GuideCallout title="Data accuracy rule" variant="tip"><p>G2A and AllThings.How independently publish the same 44 catch and encounter records. We list the first documented progression area, not an exclusive spawn claim; the current game and Fishipedia remain authoritative.</p></GuideCallout></section>;
}

function Evidence({ level }: { level: typeof creatures[number]['sourceLevel'] }) {
  if (level === 'official') return <VerificationBadge kind="official" />;
  if (level === 'verified-in-game') return <VerificationBadge kind="verified" />;
  if (level === 'community') return <VerificationBadge kind="community" />;
  return <VerificationBadge kind="unconfirmed" />;
}
