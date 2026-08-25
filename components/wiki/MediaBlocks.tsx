import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Guide } from './data';

export function MediaGuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  return (
    <Link href={`/guides/${guide.slug}`} className={`wiki-card wiki-card-link group overflow-hidden ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`reef-placeholder relative overflow-hidden ${featured ? 'aspect-[16/8]' : 'aspect-video'}`} role="img" aria-label={guide.imageAlt}>
        <span>{guide.imageAlt}</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-[#fffdf7]/95 px-3 py-1 text-[10px] font-extrabold tracking-[.08em] text-[#102630]">{guide.category}</span>
      </div>
      <div className="p-5">
        <h3 className={`font-semibold leading-snug text-wiki-primary ${featured ? 'text-2xl' : 'text-xl'}`}>{guide.title}</h3>
        <p className="mt-2 text-sm text-wiki-secondary">{guide.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-wiki-accent">Open answer <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}

export type MediaItem = { src: string; alt: string; caption: string; source: string };

export function MediaGallery({ items }: { items: readonly MediaItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {items.map((item, index) => (
        <figure key={item.src + item.caption} className={`m-0 ${index === 0 ? 'md:col-span-7' : 'md:col-span-5'}`}>
          <div className="reef-placeholder aspect-video rounded-[var(--wiki-radius-card)] border border-white/15" role="img" aria-label={item.alt}><span>{item.alt}</span></div>
          <figcaption className="mt-2 text-xs leading-relaxed text-[#bcd7da]">{item.caption} <span className="text-[#8ee1d6]">{item.source}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

export type VideoResource = { href: string; poster: string; title: string; description: string; source: string };

export function VideoCard({ video }: { video: VideoResource }) {
  return (
    <a href={video.href} target="_blank" rel="noreferrer" className="wiki-card wiki-card-link group overflow-hidden">
      <div className="reef-placeholder aspect-video"><span>Video placeholder: {video.title}</span></div>
      <div className="p-5"><div className="wiki-kicker">{video.source}</div><h3 className="mt-2 text-xl font-semibold text-wiki-primary">{video.title}</h3><p className="mt-2 text-sm text-wiki-secondary">{video.description}</p></div>
    </a>
  );
}
