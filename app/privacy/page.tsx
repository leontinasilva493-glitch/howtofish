import { Breadcrumb } from '@/components/wiki/Primitives';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'Privacy Policy | How to Fish Wiki', description: 'Privacy policy for the unofficial How to Fish Wiki.', path: '/privacy' });

export default function PrivacyPage() { return <main className="wiki-section"><div className="wiki-container max-w-3xl"><Breadcrumb items={[{ label: 'Privacy Policy' }]} /><div className="wiki-kicker">LEGAL</div><h1 className="wiki-heading mt-3 text-4xl text-wiki-primary">Privacy Policy</h1><div className="wiki-prose mt-8"><p>This unofficial fan-made resource does not require an account and does not ask for gameplay credentials. Basic server logs may be processed by the hosting provider to keep the site available and secure.</p><h2>Analytics and advertising</h2><p>Optional analytics or advertising services may use cookies or similar technologies. Those services publish their own privacy notices and controls.</p><h2>Contact</h2><p>For privacy questions, contact the site owner through the address listed in the project configuration.</p></div></div></main>; }
