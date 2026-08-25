import Link from 'next/link';
import { Anchor, ArrowRight } from 'lucide-react';

const areas = [
  { name: 'Lighthouse', note: 'Spider Crab · Boat Keys', href: '/islands/lighthouse/' },
  { name: 'Forest', note: 'Leeches · Giant Piranha', href: '/islands/forest/' },
  { name: 'Desert', note: 'Carrot Bait · Pufferfish', href: '/islands/desert/' },
  { name: 'Rocks', note: 'Tuna · Terrorizing Bird', href: '/islands/rocks/' },
  { name: 'Volcano', note: 'Bowhead Whale · Ending', href: '/islands/volcano/' },
];

export function IslandProgression({ compact = false }: { compact?: boolean }) {
  return <div className={`island-route ${compact ? 'island-route-compact' : ''}`} aria-label="How to Fish island progression">
    {areas.map((area, index) => <div className="contents" key={area.href}>
      <Link href={area.href} className="island-stop group">
        <span className="island-stop-number">{String(index + 1).padStart(2, '0')}</span>
        <Anchor className="h-4 w-4 text-wiki-accent" />
        <span><strong>{area.name}</strong><small>{area.note}</small></span>
      </Link>
      {index < areas.length - 1 ? <ArrowRight className="island-arrow h-4 w-4" aria-hidden="true" /> : null}
    </div>)}
  </div>;
}
