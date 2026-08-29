import { GuidePageView } from '@/components/guide/GuidePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/platforms/');
export const metadata = guideMetadata(page);

export default function PlatformsPage() {
  return <GuidePageView page={page} />;
}
