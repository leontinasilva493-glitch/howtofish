'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { WikiSearchDialog } from './WikiSearchDialog';

const links = [
  { label: 'Walkthrough', href: '/walkthrough/' },
  { label: 'Islands', href: '/islands/' },
  { label: 'Bosses', href: '/bosses/' },
  { label: 'Fish', href: '/fish/' },
  { label: 'Achievements', href: '/achievements/' },
  { label: 'Fixes', href: '/fixes/' },
];

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href) && href !== '/';
  const mobileLinks = [...links, { label: 'Multiplayer', href: '/multiplayer/' }, { label: 'Tips', href: '/tips/' }];

  return <header className="site-header">
    <div className="wiki-container site-header-inner">
      <Link href="/" className="site-logo" aria-label="HTF Wiki home">HTF WIKI</Link>
      <nav className="site-nav" aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href} className="site-nav-link" aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}</nav>
      <div className="site-header-actions"><WikiSearchDialog /><ThemeToggle /><a className="wiki-button wiki-button-primary site-steam-cta" href={siteConfig.links.game} target="_blank" rel="noopener noreferrer">View on Steam</a></div>
      <div className="site-mobile-actions"><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild><button className="site-menu-button" aria-label="Open navigation" type="button"><Menu aria-hidden="true" /></button></SheetTrigger><SheetContent className="mobile-navigation-sheet !border-wiki-border !bg-wiki-bg text-wiki-primary" side="right"><SheetHeader className="pr-10 text-left"><SheetTitle className="font-display text-xl text-wiki-primary">Browse HTF Wiki</SheetTitle><SheetDescription className="text-wiki-secondary">Search an answer or open a canonical guide.</SheetDescription></SheetHeader><div className="mobile-navigation-tools"><WikiSearchDialog expanded onNavigate={() => setMobileOpen(false)} /><ThemeToggle expanded /></div><nav className="mobile-navigation" aria-label="Mobile navigation">{mobileLinks.map((link) => <SheetClose asChild key={link.href}><Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link></SheetClose>)}<SheetClose asChild><a href={siteConfig.links.game} target="_blank" rel="noopener noreferrer">View on Steam</a></SheetClose></nav></SheetContent></Sheet></div>
    </div>
  </header>;
}
