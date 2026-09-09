import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PortfolioProvider } from '@/context/portfolio-context';
import { LanguageProvider } from '@/context/language-context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'portfolio-db.json');
    const content = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(content);
    const brandName = db.settings?.brandName || 'Portfolio';
    const title = db.settings?.seoTitle || `${brandName} • Full-Stack Developer`;
    const description = db.settings?.seoDescription || db.about?.subtext || 'Personal portfolio';
    const favicon = db.settings?.faviconUrl || '/images/portrait-hero.png';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [favicon],
      },
      icons: {
        icon: favicon,
      },
    };
  } catch {
    return {
      title: 'Filamsi Mabda Ghifary • Full-Stack Developer',
      description: 'Personal developer portfolio.',
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" translate="no" className={`${inter.variable} notranslate`}>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/images/portrait-hero.png" />
      </head>
      <body className="bg-[#f4f4f0] text-[#111111] antialiased selection:bg-[#d4e157] selection:text-[#111111] notranslate">
        <PortfolioProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
