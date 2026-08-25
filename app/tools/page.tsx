import { ToolsPage } from '@/components/wiki/CategoryPages';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Tools: Earnings Calculator & Checklist', description: 'Plan fishing trips with your own live values and save a local departure checklist.', path: '/tools' });

export default function ToolsRoute() { return <ToolsPage />; }
