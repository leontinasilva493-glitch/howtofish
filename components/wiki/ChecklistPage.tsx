import Link from 'next/link';
import { ArrowRight, Database, LockKeyhole } from 'lucide-react';
import { breadcrumbSchema } from '@/app/schema';
import { JsonLd } from './JsonLd';
import { ChecklistTracker } from './ChecklistTracker';
import { Breadcrumb, CalloutBox, EvidenceBadge, SectionHeader } from './Primitives';

export function ChecklistPage() {
  return <main className="wiki-section"><div className="wiki-container">
    <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Departure checklist' }]} />
    <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]"><SectionHeader kicker="INTERACTIVE TRACKER" title="Departure Checklist" sub="Search gear, money, co-op, route, and evidence checks before the next fishing trip. Completion stays in this browser and never connects to a Steam account." /><EvidenceBadge label="CHECKLIST REVIEWED" /></div>
    <ChecklistTracker />
    <CalloutBox title="NOT AN OFFICIAL ACHIEVEMENT LIST">This is a planning tool for wiki readers, not the game’s 28-achievement list. It stores only the checklist item IDs you mark complete.</CalloutBox>
    <section className="mt-10 grid gap-4 md:grid-cols-2"><div className="wiki-card p-5"><LockKeyhole className="h-5 w-5 text-wiki-accent" /><h2 className="mt-4 text-lg font-semibold text-wiki-primary">Private by default</h2><p className="mt-2 text-sm text-wiki-secondary">Progress uses versioned local storage. There is no login, sync, analytics payload, or account lookup in the tracker.</p></div><div className="wiki-card p-5"><Database className="h-5 w-5 text-wiki-accent" /><h2 className="mt-4 text-lg font-semibold text-wiki-primary">Evidence before automation</h2><p className="mt-2 text-sm text-wiki-secondary">The checklist avoids invented stats and directs unstable claims back to the evidence date and update log.</p></div></section>
    <div className="mt-8 flex flex-wrap gap-3"><Link href="/guides/beginner-guide" className="wiki-button wiki-button-primary">Open beginner guide <ArrowRight className="h-4 w-4" /></Link><Link href="/updates" className="wiki-button wiki-button-secondary">Check evidence updates</Link></div>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Tools', item: '/tools' }, { name: 'Departure checklist', item: '/checklist' }])} />
  </div></main>;
}
