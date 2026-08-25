import { BossFeaturePage } from '@/components/guide/BossFeaturePage';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/bosses/mutated-bowhead-whale/');
export const metadata = guideMetadata(page);

export default function MutatedBowheadWhalePage() {
  return <BossFeaturePage page={page} />;
}
