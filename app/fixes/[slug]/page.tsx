import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuidePageView } from '@/components/guide/GuidePage';
import { guideMetadata } from '@/config/seo';
import { getInnerRoutePage, getInnerStaticParams } from '@/content/inner-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getInnerStaticParams('fixes');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getInnerRoutePage('fixes', slug);
  return page ? guideMetadata(page) : {};
}

export default async function FixGuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getInnerRoutePage('fixes', slug);
  if (!page) notFound();
  return <GuidePageView page={page} />;
}
