'use client';

import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { searchWikiEntries } from '@/lib/wiki-template';
import { completeNestedNavigation } from '@/lib/mobile-navigation';
import { searchEntries } from '@/content/pages';

export function WikiSearchDialog({ expanded = false, onNavigate }: { expanded?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(() => query.trim() ? searchWikiEntries(searchEntries, query, 8) : searchEntries.slice(0, 5), [query]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><button type="button" className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border border-wiki-border bg-wiki-card px-3 text-xs font-semibold text-wiki-secondary hover:bg-wiki-elevated hover:text-wiki-primary ${expanded ? 'w-full' : ''}`}><Search className="h-4 w-4" /><span className={expanded ? undefined : 'hidden sm:inline'}>Search wiki</span></button></DialogTrigger>
    <DialogContent className="max-h-[82vh] max-w-2xl overflow-hidden !border-wiki-border !bg-wiki-card p-0 text-wiki-primary shadow-2xl">
      <div className="border-b border-wiki-border p-5 pr-14"><DialogTitle className="font-display text-2xl">Find the next answer</DialogTitle><DialogDescription className="mt-2 text-wiki-secondary">Search walkthroughs, islands, bosses, fish, achievements, multiplayer, and fixes.</DialogDescription><label className="mt-4 flex min-h-[50px] items-center gap-3 rounded-lg border border-wiki-border-strong bg-wiki-bg px-4"><Search className="h-5 w-5 text-wiki-muted" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-base text-wiki-primary outline-none placeholder:text-wiki-muted" placeholder="Try “Radar”, “Bean”, or “black screen”" aria-label="Search the wiki" /></label></div>
      <div className="max-h-[52vh] overflow-y-auto p-3" aria-live="polite">{results.length > 0 ? <ul className="grid gap-1">{results.map((entry) => <li key={entry.href}><Link href={entry.href} onClick={() => completeNestedNavigation(() => { setOpen(false); setQuery(''); }, onNavigate)} className="group grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg p-3 hover:bg-wiki-elevated"><span><span className="block text-sm font-semibold text-wiki-primary">{entry.title}</span><span className="mt-1 block text-xs leading-relaxed text-wiki-secondary">{entry.summary}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.08em] text-wiki-accent">{entry.category}</span></span><ArrowRight className="h-4 w-4 text-wiki-muted transition-transform group-hover:translate-x-1 group-hover:text-wiki-accent" /></Link></li>)}</ul> : <div className="p-8 text-center"><div className="text-sm font-semibold text-wiki-primary">No matching answer yet</div><p className="mt-2 text-xs text-wiki-secondary">Try a broader route, item, warning, or player task.</p></div>}</div>
    </DialogContent>
  </Dialog>;
}
