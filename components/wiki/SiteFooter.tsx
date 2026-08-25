import Link from 'next/link';

const links = [
  ['Walkthrough', '/walkthrough/'], ['Islands', '/islands/'], ['Bosses', '/bosses/'], ['Fish', '/fish/'],
  ['Achievements', '/achievements/'], ['Multiplayer', '/multiplayer/'], ['Fixes', '/fixes/'],
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="wiki-container"><div className="site-footer-top"><Link href="/" className="site-footer-logo">HTF WIKI</Link><nav className="footer-inline-links" aria-label="Footer navigation">{links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav></div><div className="site-footer-bottom"><p>Unofficial fan-made guide and wiki. Not affiliated with Dazed Games. Sources: official store, patch notes, Steam community, and in-game verification.</p><div><Link href="/about/">About</Link><Link href="/contact/">Contact</Link><Link href="/privacy-policy/">Privacy</Link><Link href="/terms/">Terms</Link></div></div></div></footer>;
}
