import { GuidePageView } from '@/components/guide/GuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/multiplayer/');
export const metadata = guideMetadata(page);
export default function MultiplayerPage() { return <GuidePageView page={page} />; }
