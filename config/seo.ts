import type { Metadata } from 'next';
import { siteConfig } from './site';
import type { GuidePage } from '@/content/types';

export function canonicalPath(path: string) {
  if (path === '/') return '/';
  return `${path.replace(/\/+$/, '')}/`;
}

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonical = canonicalPath(path);
  const url = canonical === '/' ? siteConfig.url : `${siteConfig.url}${canonical}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url, type: 'article', siteName: siteConfig.name, images: [{ url: siteConfig.images.og, alt: siteConfig.name }] }, twitter: { card: 'summary_large_image', title, description, images: [siteConfig.images.og] } };
}

export function guideMetadata(page: GuidePage): Metadata {
  const metadata = pageMetadata({ title: page.title, description: page.description, path: page.route });
  return { ...metadata, keywords: [page.primaryKeyword, ...page.secondaryKeywords], robots: { index: page.indexable, follow: true }, openGraph: { ...metadata.openGraph, images: [{ url: page.image || siteConfig.images.og, alt: page.imageAlt || page.h1 }] } };
}
