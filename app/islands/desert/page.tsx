import { IslandGuidePage } from '@/components/guide/IslandGuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/desert/');
export const metadata = guideMetadata(page);
export default function DesertPage() { return <IslandGuidePage page={page} previous={{ label: 'Forest', href: '/islands/forest/' }} next={{ label: 'Rocks', href: '/islands/rocks/' }} />; }
