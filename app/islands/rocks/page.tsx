import { IslandGuidePage } from '@/components/guide/IslandGuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/islands/rocks/');
export const metadata = guideMetadata(page);
export default function RocksPage() { return <IslandGuidePage page={page} previous={{ label: 'Desert', href: '/islands/desert/' }} next={{ label: 'Volcano', href: '/islands/volcano/' }} />; }
