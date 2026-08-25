import { MapsPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'Islands | How to Fish Wiki', description: 'This legacy URL redirects to the How to Fish islands guide.', path: '/maps' });

export default function MapsRoute() { return <MapsPage />; }
