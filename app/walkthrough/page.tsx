import { WalkthroughPageView } from '@/components/guide/WalkthroughPage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/walkthrough/');
export const metadata = guideMetadata(page);

export default function WalkthroughPage() {
  return <WalkthroughPageView page={page} />;
}
