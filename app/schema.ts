import { siteConfig } from '@/config/site';
import type { Guide } from '@/components/wiki/data';
import { getPageByRoute } from '@/content/pages';

export const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { '@type': 'Organization', name: siteConfig.name, description: 'Unofficial fan-made resource.' },
};

const homePage = getPageByRoute('/');
export const homeFaq = homePage.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }));

export const gameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'How to Fish',
  url: siteConfig.links.game,
  datePublished: siteConfig.launchDate,
  author: { '@type': 'Organization', name: siteConfig.developer },
  publisher: { '@type': 'Organization', name: siteConfig.developer },
  gamePlatform: 'Windows / Steam',
  playMode: ['SinglePlayer', 'MultiPlayer', 'CoOp'],
  description: siteConfig.description,
};

export const homeBreadcrumbSchema = breadcrumbSchema([{ name: 'Home', item: '/' }]);

export const beginnerSteps = [
  { name: 'Learn one reliable cast', text: 'Use the opening area to understand the physics response before attempting trick shots.' },
  { name: 'Sell the first haul', text: 'Return to the dock and confirm the live sale value instead of relying on an unverified table.' },
  { name: 'Upgrade the current bottleneck', text: 'Choose gear that improves the next fishing trip or opens the next boss-gated route.' },
];

export function breadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${siteConfig.url}${item.item}` })) };
}

export function articleSchema(guide: Guide) {
  return { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, datePublished: siteConfig.evidenceDate, dateModified: siteConfig.evidenceDate, author: { '@type': 'Organization', name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}`, image: `${siteConfig.url}${guide.image}` };
}
