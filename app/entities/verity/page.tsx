import { VerityPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'Bosses | How to Fish Wiki', description: 'This legacy URL redirects to the How to Fish boss guide.', path: '/entities/verity' });

export default function VerityRoute() { return <VerityPage />; }
