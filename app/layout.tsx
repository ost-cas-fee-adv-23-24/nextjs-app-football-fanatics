import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
// @ts-ignore
import cssDesignLibraryStyles from '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ProfileProvider } from '@/providers/Profile.provider';
import GlobalHeader from '@/components/global-header/GlobalHeader';
import designStyles from '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elbum Wep App',
  description: 'by Bladimir and Patrick',
  assets: [cssDesignLibraryStyles],
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
    <html>
      <SessionProvider>
        <ProfileProvider>
          <body className={inter.className}>
            <div className="w-full">
              <div className="bg-violet-600 py-3">
                <div className="max-w-4xl mr-auto ml-auto px-10 lg:px-0">
                  <GlobalHeader />
                </div>
              </div>
              <div className=" mr-auto ml-auto bg-slate-100 px-10 lg:px-0">
                <div className="max-w-4xl mr-auto ml-auto">{children}</div>
              </div>
            </div>
          </body>
        </ProfileProvider>
      </SessionProvider>
    </html>
  );
}
