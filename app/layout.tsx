import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Fredoka, Inter } from 'next/font/google';
import { SiteHeader } from '@/components/wiki/SiteHeader';
import { SiteFooter } from '@/components/wiki/SiteFooter';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'How to Fish Game Guide & Wiki', template: '%s' },
  description: siteConfig.description,
  manifest: siteConfig.metadata.manifestPath,
  icons: {
    icon: siteConfig.images.icon.favicon,
    apple: siteConfig.images.icon.apple,
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'How to Fish Game Guide & Wiki',
    description: siteConfig.description,
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.images.og, alt: 'Cartoon tropical fishing adventure illustration' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: siteConfig.metadata.themeColor };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={siteConfig.visualPreset} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('wiki-theme');if(t==='reef-dark'||t==='editorial-light')document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${fredoka.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
