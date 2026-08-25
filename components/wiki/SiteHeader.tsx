'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/config/site';

const links = [
  { label: 'Walkthrough', href: '/walkthrough/' },
  { label: 'Islands', href: '/islands/' },
  { label: 'Bosses', href: '/bosses/' },
  { label: 'Fish', href: '/fish/' },
  { label: 'Achievements', href: '/achievements/' },
  { label: 'Fixes', href: '/fixes/' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href) && href !== '/';

  return <header className="site-header">
    <div className="wiki-container site-header-inner">
      <Link href="/" className="site-logo" onClick={() => setOpen(false)} aria-label="HTF Wiki home">HTF WIKI</Link>
      <nav className="site-nav" aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} className="site-nav-link" aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}</nav>
      <a className="wiki-button wiki-button-primary site-steam-cta" href={siteConfig.links.game} target="_blank" rel="noopener noreferrer">View on Steam</a>
      <button className="site-menu-button" onClick={() => setOpen((current) => !current)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" type="button">{open ? <X /> : <Menu />}</button>
    </div>
    {open ? <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{[...links, { label: 'Multiplayer', href: '/multiplayer/' }, { label: 'Tips', href: '/tips/' }].map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}<a href={siteConfig.links.game} target="_blank" rel="noopener noreferrer">View on Steam</a></nav> : null}
  </header>;
}
