import { GuidePageView } from '@/components/guide/GuidePage';
import { IssueStatusTable } from '@/components/guide/IssueStatusTable';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/fixes/');
export const metadata = guideMetadata(page);

export default function FixesPage() {
  return <GuidePageView page={page}><IssueStatusTable /></GuidePageView>;
}
