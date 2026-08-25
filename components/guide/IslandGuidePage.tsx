import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPinned } from 'lucide-react';
import type { GuidePage } from '@/content/types';
import { GuidePageView } from './GuidePage';

export function IslandGuidePage({ page, previous, next }: { page: GuidePage; previous?: { label: string; href: string }; next?: { label: string; href: string } }) {
  return <GuidePageView page={page}><nav className="island-neighbors" aria-label="Island sequence"><div>{previous ? <Link href={previous.href}><ArrowLeft className="h-4 w-4" /><span><small>Previous area</small><strong>{previous.label}</strong></span></Link> : <span className="island-neighbor-empty"><MapPinned className="h-4 w-4" /><span><small>Previous area</small><strong>Starting point</strong></span></span>}</div><div>{next ? <Link href={next.href}><span><small>Next area</small><strong>{next.label}</strong></span><ArrowRight className="h-4 w-4" /></Link> : <Link href="/bosses/mutated-bowhead-whale/"><span><small>Next area</small><strong>Final boss & ending</strong></span><ArrowRight className="h-4 w-4" /></Link>}</div></nav></GuidePageView>;
}
