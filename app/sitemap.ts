import type { MetadataRoute } from 'next';
import { seoPages } from '@/content/pages';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return seoPages.filter((page) => page.indexable).map((page) => ({
    url: page.route === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${page.route}`,
    lastModified: `${page.lastUpdated}T00:00:00.000Z`,
    changeFrequency: page.priority === 'P0' ? 'weekly' : 'monthly',
    priority: page.priority === 'P0' ? 1 : page.priority === 'P1' ? 0.9 : 0.8,
  }));
}
