import { IslandGuidePage } from '@/components/guide/IslandGuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/volcano/');
export const metadata = guideMetadata(page);
export default function VolcanoPage() { return <IslandGuidePage page={page} previous={{ label: 'Rocks', href: '/islands/rocks/' }} />; }
