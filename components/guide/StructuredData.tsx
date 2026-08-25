import { JsonLd } from '@/components/wiki/JsonLd';
import type { GuidePage } from '@/content/types';
import { siteConfig } from '@/config/site';

function buildSchemas(page: GuidePage) {
  const parts = page.route.split('/').filter(Boolean);
  let current = '';
  const crumbs = [{ name: 'Home', item: '/' }, ...parts.map((part) => {
    current += `/${part}`;
    return { name: part.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), item: `${current}/` };
  })];
  return [
    { '@context': 'https://schema.org', '@type': 'Article', headline: page.h1, description: page.description, datePublished: siteConfig.launchDate, dateModified: page.lastUpdated, mainEntityOfPage: `${siteConfig.url}${page.route}`, author: { '@type': 'Organization', name: siteConfig.author }, publisher: { '@type': 'Organization', name: siteConfig.author }, image: `${siteConfig.url}${page.image || siteConfig.images.og}` },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${siteConfig.url}${item.item}` })) },
    ...(page.faqs.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] : []),
  ];
}

export function GuideStructuredData({ page }: { page: GuidePage }) {
  return <JsonLd data={buildSchemas(page)} />;
}
