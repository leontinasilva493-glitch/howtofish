import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideDetail } from '@/components/wiki/GuidesPage';
import { allGuides } from '@/components/wiki/data';
import { pageMetadata } from '@/config/seo';

export function generateStaticParams() { return allGuides.map((guide) => ({ slug: guide.slug })); }

const validSlugs = new Set(allGuides.map((guide) => guide.slug));

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = allGuides.find((item) => item.slug === params.slug);
  if (!guide) notFound();
  return pageMetadata({ title: `How to Fish ${guide.title}`, description: guide.description, path: `/guides/${params.slug}` });
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  if (!validSlugs.has(params.slug)) notFound();
  return <GuideDetail slug={params.slug} />;
}
