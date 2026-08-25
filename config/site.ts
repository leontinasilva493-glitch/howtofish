const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3110').replace(/\/+$/, '');

export const siteConfig = {
  name: 'How to Fish Game Guide & Wiki',
  shortName: 'HTF WIKI',
  description: "Complete Dazed Games' How to Fish with evidence-labelled walkthroughs, islands, bosses, fish, all 28 achievements, multiplayer help, and patch-aware fixes.",
  domain: new URL(siteUrl).host,
  url: siteUrl,
  author: 'How to Fish Wiki',
  email: 'hello@howtofish.wiki',
  developer: 'Dazed Games',
  links: {
    game: 'https://store.steampowered.com/app/4001890/How_to_Fish/',
    group: 'https://discord.gg/N9bfGzNP4J',
  },
  launchDate: '2026-08-20',
  evidenceDate: '2026-08-25',
  visualPreset: 'reef-dark' as 'reef-dark' | 'editorial-light',
  social: { twitter: '', facebook: '' },
  metadata: { keywords: ['how to fish game guide', 'how to fish game wiki', 'how to fish walkthrough', 'how to fish bosses', 'how to fish achievements', 'how to fish multiplayer'], themeColor: '#081C2A', manifestPath: '/assets/site.webmanifest' },
  images: {
    icon: {
      favicon: '/assets/how-to-fish/fish-hook.svg',
      favicon16: '/assets/how-to-fish/fish-hook.svg',
      favicon32: '/assets/how-to-fish/fish-hook.svg',
      apple: '/assets/how-to-fish/fish-hook.svg',
      android192: '/assets/how-to-fish/fish-hook.svg',
      android512: '/assets/how-to-fish/fish-hook.svg',
      maskable512: '/assets/how-to-fish/fish-hook.svg',
    },
    og: '/assets/how-to-fish/hero-island-v2.webp',
  },
} as const;
