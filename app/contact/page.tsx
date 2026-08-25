import type { Metadata } from 'next';
import { TrustPage } from '@/components/guide/TrustPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = { title: 'Contact the How to Fish Guide', description: 'Send corrections, current-patch evidence, and source-backed How to Fish guide updates.', alternates: { canonical: '/contact/' }, robots: { index: false, follow: true } };

export default function ContactPage() { return <TrustPage eyebrow="CORRECTIONS & EVIDENCE" title="Help keep the route current" intro={`Send source-backed corrections to ${siteConfig.email}. For game support, save recovery, or bug reports, use Dazed Games' official Discord rather than this fan site.`} sections={[{ title: 'A useful correction includes', paragraphs: ['The page URL, exact claim, game patch, solo or co-op context, and a first-hand screenshot or official source link. Avoid copied values without a reproducible source.'] }, { title: 'We cannot provide account or save support', paragraphs: ['This site does not operate the game, Steam, or Dazed Games support. It cannot inspect private saves, restore inventory, or guarantee a community workaround.'] }]} />; }
