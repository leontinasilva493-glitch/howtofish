import { GuidesHub } from '@/components/wiki/GuidesPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Guides: Beginner, Money, Gear & Bosses', description: 'Answer-first How to Fish guides for the first catch, money routes, gear upgrades, boss progression, gambling, and co-op.', path: '/guides' });

export default function GuidesPage() { return <GuidesHub />; }
