import { breadcrumbSchema } from '@/app/schema';
import { fishRows, gearRows } from './data';
import { JsonLd } from './JsonLd';
import { AdSlot, Breadcrumb, CalloutBox, SectionHeader, TierBadge } from './Primitives';

type Tier = 'S' | 'A' | 'B' | 'C';
type Row = readonly [string, Tier, string, string];

function DataTable({ headers, rows }: { headers: readonly string[]; rows: readonly Row[] }) {
  return <div className="overflow-x-auto rounded-lg border border-wiki-border"><table className="w-full min-w-[680px] border-collapse text-left text-sm"><thead className="bg-wiki-section text-xs uppercase tracking-[.08em] text-wiki-muted"><tr>{headers.map((header) => <th className="p-4" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map(([name, tier, detail, status]) => <tr className="border-t border-wiki-border" key={name}><td className="p-4 font-semibold text-wiki-primary">{name}</td><td className="p-4"><TierBadge tier={tier} /></td><td className="p-4 text-wiki-secondary">{detail}</td><td className="p-4 text-wiki-secondary">{status}</td></tr>)}</tbody></table></div>;
}

function TierLegend({ kind }: { kind: 'rarity' | 'strength' }) {
  return <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-wiki-border bg-wiki-card p-4 text-sm text-wiki-secondary"><span className="font-bold text-wiki-primary">Tier legend</span>{(['S', 'A', 'B', 'C'] as const).map((tier) => <span className="flex items-center gap-2" key={tier}><TierBadge tier={tier} />{kind === 'rarity' ? `${tier}-tier rarity category` : `${tier}-tier progression category`}</span>)}</div>;
}

export function FishPage() {
  return <main className="wiki-section"><div className="wiki-container"><Breadcrumb items={[{ label: 'Fish Index' }]} /><SectionHeader kicker="FISH DATABASE" title="How to Fish Fish Index" sub="Category-level launch data only. Species names, exact island spawns, and sale values remain marked until verified." /><TierLegend kind="rarity" /><DataTable headers={['Species', 'Tier', 'Island', 'Sale Value']} rows={fishRows} /><CalloutBox variant="warning" title="NO INVENTED FISH DATA">Rows are broad categories, not claimed species. “Still being documented” is different from a confirmed zero or missing value.</CalloutBox><AdSlot label="Ad placement - after fish index" /></div><JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Fish Index', item: '/fish' }])} /></main>;
}

export function GearPage() {
  return <main className="wiki-section"><div className="wiki-container"><Breadcrumb items={[{ label: 'Gear & Upgrades' }]} /><SectionHeader kicker="GEAR DATABASE" title="Gear & Upgrade Path" sub="The confirmed starter-to-firearm progression without invented costs, damage values, or undocumented item names." /><TierLegend kind="strength" /><DataTable headers={['Gear', 'Tier', 'Type', 'Unlock']} rows={gearRows} /><CalloutBox variant="warning" title="LIVE SHOP WINS">Check the current dock shop before spending. Exact prices and post-boss requirements are still being documented.</CalloutBox><AdSlot label="Ad placement - after gear table" /></div><JsonLd data={breadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Gear & Upgrades', item: '/gear' }])} /></main>;
}

export const WeaponsPage = GearPage;
