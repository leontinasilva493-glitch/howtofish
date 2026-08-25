import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | How to Fish Wiki',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="wiki-section min-h-[60vh]">
      <div className="wiki-container grid max-w-3xl gap-6">
        <div className="wiki-kicker">404 / LOST AT SEA</div>
        <h1 className="wiki-heading text-5xl text-wiki-primary md:text-7xl">Page not found</h1>
        <p className="max-w-xl text-wiki-secondary">This route is not in the current evidence index. Return to the hub or open the guide library.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="wiki-button wiki-button-primary"><ArrowLeft className="h-4 w-4" />Return home</Link>
          <Link href="/walkthrough/" className="wiki-button wiki-button-secondary"><Search className="h-4 w-4" />Browse guides</Link>
        </div>
      </div>
    </main>
  );
}
