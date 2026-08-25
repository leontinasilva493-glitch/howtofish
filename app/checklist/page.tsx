import { ChecklistPage } from '@/components/wiki/ChecklistPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({
  title: 'How to Fish Departure Checklist: Gear, Route & Evidence',
  description: 'Search and save a local How to Fish checklist for the next trip, boss gate, co-op session, and evidence check.',
  path: '/checklist',
});

export default function ChecklistRoute() { return <ChecklistPage />; }
