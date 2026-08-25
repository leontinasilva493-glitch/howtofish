import { BossesPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Bosses: Fights & Island Unlocks', description: 'Boss progression, preparation, and island unlocks without invented names, health values, or damage stats.', path: '/entities/bosses' });

export default function BossesRoute() { return <BossesPage />; }
