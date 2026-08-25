import { UpdatesPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Updates: Patch Notes & Evidence Log', description: 'Track official How to Fish changes and the verification status of fish, gear, island, and boss information.', path: '/updates' });

export default function UpdatesRoute() { return <UpdatesPage />; }
