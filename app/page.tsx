import { HomePage } from '@/components/wiki/HomePage';
import { JsonLd } from '@/components/wiki/JsonLd';
import { gameSchema, homeBreadcrumbSchema, homeFaq, siteSchema } from '@/app/schema';
import { getPageByRoute } from '@/content/pages';
import { guideMetadata } from '@/config/seo';

export const metadata = guideMetadata(getPageByRoute('/'));

export default function HomePageRoute() {
  return (
    <>
      <HomePage />
      <JsonLd data={[siteSchema, gameSchema, homeBreadcrumbSchema, { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: homeFaq }]} />
    </>
  );
}
