import { CommunityPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Community: Steam & Official Discord', description: 'Open the verified How to Fish Steam page and the Dazed Games Discord linked from the developer website.', path: '/community' });

export default function CommunityRoute() { return <CommunityPage />; }
