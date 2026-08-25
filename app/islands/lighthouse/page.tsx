import { IslandGuidePage } from '@/components/guide/IslandGuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/lighthouse/');
export const metadata = guideMetadata(page);
export default function LighthousePage() { return <IslandGuidePage page={page} next={{ label: 'Forest', href: '/islands/forest/' }} />; }
