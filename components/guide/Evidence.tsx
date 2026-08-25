import { CheckCircle2, CircleAlert, Radio, ShieldCheck } from 'lucide-react';
import type { ContentStatus, SourceLevel } from '@/content/types';

const sourceCopy: Record<SourceLevel, { label: string; icon: typeof ShieldCheck; className: string }> = {
  official: { label: 'Official', icon: ShieldCheck, className: 'evidence-official' },
  'verified-in-game': { label: 'Verified In-Game', icon: CheckCircle2, className: 'evidence-verified' },
  community: { label: 'Community Report', icon: Radio, className: 'evidence-community' },
  unconfirmed: { label: 'Unconfirmed', icon: CircleAlert, className: 'evidence-unconfirmed' },
};

export function SourceLevelBadge({ level }: { level: SourceLevel }) {
  const item = sourceCopy[level];
  const Icon = item.icon;
  return <span className={`guide-badge ${item.className}`}><Icon className="h-3.5 w-3.5" />{item.label}</span>;
}

const statusCopy: Record<ContentStatus, string> = {
  current: 'Current',
  'version-sensitive': 'Version-Sensitive',
  'attempted-fix': 'Attempted Fix',
  'still-reported': 'Still Reported',
  outdated: 'Outdated',
};

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  return <span className={`guide-badge status-${status}`}>{statusCopy[status]}</span>;
}
