import { WeaponsPage } from '@/components/wiki/WeaponsPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'Gear | How to Fish Wiki', description: 'This legacy URL redirects to the How to Fish gear guide.', path: '/weapons' });

export default function WeaponsRoute() { return <WeaponsPage />; }
