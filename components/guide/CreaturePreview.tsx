'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { creatures } from '@/content/creatures';

type Filter = 'all' | 'boss' | 'drip';

export function CreaturePreview() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return creatures.filter((creature) => {
      if (filter === 'boss' && creature.type !== 'boss') return false;
      if (filter === 'drip' && !creature.hasDripVariant) return false;
      return !needle || `${creature.name} ${creature.lure || ''} ${creature.rod || ''} ${creature.firstAvailableArea || ''}`.toLowerCase().includes(needle);
    }).slice(0, 4);
  }, [filter, query]);

  return <div className="creature-preview"><div className="preview-controls"><label><Search aria-hidden="true" /><span className="sr-only">Search creatures, rods, bait</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search creatures, rods, bait..." /></label><div className="filter-chips" aria-label="Creature type filters">{([['all', 'All types'], ['boss', 'Boss'], ['drip', 'Drip']] as const).map(([value, label]) => <button type="button" className={filter === value ? 'is-active' : undefined} onClick={() => setFilter(value)} aria-pressed={filter === value} key={value}>{label}</button>)}</div></div><div className="table-scroll"><table className="preview-table"><thead><tr><th>Creature</th><th>Type</th><th>Lure / bait</th><th>First area</th></tr></thead><tbody>{results.map((creature) => <tr key={creature.id}><th scope="row">{creature.name}</th><td className={creature.type === 'boss' ? 'text-coral' : undefined}>{creature.type}</td><td className={creature.lure ? 'text-teal' : 'text-muted'}>{creature.lure || 'Unconfirmed'}</td><td>{creature.firstAvailableArea || 'Unconfirmed'}</td></tr>)}</tbody></table></div><Link href="/fish/" className="v2-text-link">Open the full fish database</Link></div>;
}
