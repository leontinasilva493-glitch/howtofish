import { GamblingPage } from '@/components/wiki/CodesPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Gambling Guide: Trick Shots & Fish Betting', description: 'How trick-shot payouts and fish betting differ, plus the confirmed no-real-money boundary.', path: '/gambling' });

export default function GamblingRoute() { return <GamblingPage />; }
