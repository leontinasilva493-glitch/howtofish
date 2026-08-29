export type SourceLevel = 'official' | 'verified-in-game' | 'community' | 'unconfirmed';

export type ContentStatus = 'current' | 'version-sensitive' | 'attempted-fix' | 'still-reported' | 'outdated';

export type SourceReference = {
  id: string;
  label: string;
  publisher: string;
  url: string;
  sourceLevel: SourceLevel;
  sourceType: 'steam-store' | 'steam-patch' | 'steam-achievements' | 'steam-discussion' | 'reddit' | 'youtube' | 'media-guide' | 'platform-support' | 'in-game';
  accessedAt: string;
  notes: string;
};

export type GuideSection = {
  id: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  callout?: { tone: 'tip' | 'warning' | 'status'; title: string; text: string };
};

export type EvidenceRow = {
  topic: string;
  official: string;
  community: string;
  guidance: string;
};

export type FailureBranch = {
  symptom: string;
  likelyState: string;
  nextStep: string;
};

export type GuideMedia = {
  gallery: Array<{
    src: string;
    alt: string;
    caption: string;
    sourceId: string;
  }>;
};

export type GuidePage = {
  route: string;
  priority: 'P0' | 'P1' | 'P2';
  pageType: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  quickAnswer: string;
  lastUpdated: string;
  verifiedPatch: string;
  contentStatus: ContentStatus;
  spoilerLevel: 'none' | 'minor' | 'full';
  image?: string;
  imageAlt?: string;
  keyFacts: Array<{ label: string; value: string }>;
  evidenceRows?: EvidenceRow[];
  failureBranches?: FailureBranch[];
  failureHeading?: string;
  media?: GuideMedia;
  sections: GuideSection[];
  faqs: Array<{ question: string; answer: string }>;
  relatedPages: string[];
  sources: string[];
  updateLog: Array<{ date: string; note: string }>;
  indexable: boolean;
};

export type Achievement = {
  id: string;
  name: string;
  officialDescription: string;
  category: 'story' | 'combat' | 'collection' | 'money' | 'challenge';
  unlockMethod: string;
  recommendedStage: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  missable: boolean;
  versionSensitive: boolean;
  steamCompletionRate: number;
  relatedGuide?: string;
  verifiedPatch?: string;
};

export type Creature = {
  id: string;
  name: string;
  type: 'normal' | 'boss' | 'mini-boss';
  lure?: string;
  rod?: string;
  firstAvailableArea?: string;
  observedAreas?: string[];
  questUse?: string;
  importantDrop?: string;
  hasDripVariant?: boolean;
  collectorRequired?: boolean;
  fishipediaRequired?: boolean;
  sourceLevel: SourceLevel;
  sourceIds?: string[];
  verifiedPatch?: string;
  lastVerified?: string;
  notes?: string;
};
