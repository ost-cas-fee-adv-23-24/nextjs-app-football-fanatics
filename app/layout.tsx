import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// @ts-ignore
import cssDesignLibraryStyles from '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elbum Wep Apps',
  description: 'by Bladimir and Patrick',
  openGraph: {
    title: 'Elbum Wep Apps',
    description: 'by Bladimir and Patrick',
    type: 'website',
    locale: 'en_IE',
    url: 'https://elbum-web-apps.vercel.app/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href={cssDesignLibraryStyles} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
