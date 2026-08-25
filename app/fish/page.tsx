import { FishDatabasePage } from '@/components/guide/FishDatabasePage';
import { JsonLd } from '@/components/wiki/JsonLd';
import { creatures } from '@/content/creatures';
import { getPageByRoute } from '@/content/pages';
import { siteConfig } from '@/config/site';
import { guideMetadata } from '@/config/seo';

const page = getPageByRoute('/fish/');
export const metadata = guideMetadata(page);

export default function FishPage() {
  const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: page.h1, numberOfItems: creatures.length, itemListElement: creatures.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `${siteConfig.url}/fish/#${item.id}` })) };
  return <><FishDatabasePage page={page} /><JsonLd data={itemList} /></>;
}
