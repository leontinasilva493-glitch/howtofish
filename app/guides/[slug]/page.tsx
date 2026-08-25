import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideDetail } from '@/components/wiki/GuidesPage';
import { allGuides } from '@/components/wiki/data';
import { pageMetadata } from '@/config/seo';

export function generateStaticParams() { return allGuides.map((guide) => ({ slug: guide.slug })); }

const validSlugs = new Set(allGuides.map((guide) => guide.slug));

type GuidePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = allGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return pageMetadata({ title: `How to Fish ${guide.title}`, description: guide.description, path: `/guides/${slug}` });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  if (!validSlugs.has(slug)) notFound();
  return <GuideDetail slug={slug} />;
}
