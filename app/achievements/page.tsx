import { AchievementChecklist } from '@/components/guide/AchievementChecklist';
import { GuidePageView } from '@/components/guide/GuidePage';
import { JsonLd } from '@/components/wiki/JsonLd';
import { achievements } from '@/content/achievements';
import { getPageByRoute } from '@/content/pages';
import { siteConfig } from '@/config/site';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/achievements/');
export const metadata = guideMetadata(page);

export default function AchievementsPage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: page.h1, numberOfItems: achievements.length, itemListElement: achievements.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `${siteConfig.url}/achievements/#${item.id}` })) };
  return <><GuidePageView page={page}><AchievementChecklist /></GuidePageView><JsonLd data={itemList} /></>;
}
