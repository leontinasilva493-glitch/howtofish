import { GuidePageView } from '@/components/guide/GuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/tips/');
export const metadata = guideMetadata(page);
export default function TipsPage() { return <GuidePageView page={page} />; }
