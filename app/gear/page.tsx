import { GearPage } from '@/components/wiki/WeaponsPage';
import { pageMetadata } from '@/config/seo';

export const metadata = pageMetadata({ title: 'How to Fish Gear Guide: Knife to Gun Upgrades', description: 'The confirmed gear progression from the starter knife toward better fishing and ranged equipment, without invented prices.', path: '/gear' });

export default function GearRoute() { return <GearPage />; }
