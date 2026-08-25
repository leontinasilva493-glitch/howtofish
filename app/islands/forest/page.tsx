import { IslandGuidePage } from '@/components/guide/IslandGuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/forest/');
export const metadata = guideMetadata(page);
export default function ForestPage() { return <IslandGuidePage page={page} previous={{ label: 'Lighthouse', href: '/islands/lighthouse/' }} next={{ label: 'Desert', href: '/islands/desert/' }} />; }
