import { Calculator } from '@/components/wiki/Calculator';
import { Breadcrumb, SectionHeader } from '@/components/wiki/Primitives';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Earnings Calculator: Trips to Your Coin Goal', description: 'Estimate fishing trips from current coins, target coins, and your observed earnings per trip, including a 2x trick-shot scenario.', path: '/calculator' });

export default function CalculatorPage() { return <main className="wiki-section"><div className="wiki-container"><Breadcrumb items={[{ label: 'Calculator' }]} /><SectionHeader kicker="INTERACTIVE TOOL" title="Fish Earnings Calculator" sub="Enter your current session values to estimate normal trips and a 2x trick-shot scenario." /><Calculator /></div></main>; }
