import { WikiHubPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Wiki Directory: Guides, Fish & Gear', description: 'Browse How to Fish guides, the fish and gear indexes, islands, bosses, gambling mechanics, updates, and tools.', path: '/wiki' });

export default function WikiPage() { return <WikiHubPage />; }
