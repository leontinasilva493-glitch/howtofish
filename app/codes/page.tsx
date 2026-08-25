import { CodesPage } from '@/components/wiki/CodesPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'Gambling | How to Fish Wiki', description: 'This legacy URL redirects to the How to Fish gambling guide.', path: '/codes' });

export default function CodesRoute() { return <CodesPage />; }
