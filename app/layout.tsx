import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { GlobalHeader } from '@/components/global-header/GlobalHeader';
import { ProfileProvider } from '@/providers/Profile.provider';
import { SessionProvider } from 'next-auth/react';
// @ts-ignore
import cssDesignLibraryStyles from '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elbum Wep App',
  description: 'by Bladimir and Patrick',
  assets: [cssDesignLibraryStyles],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <SessionProvider>
          <ProfileProvider>
            <div className="w-full">
              <div className="bg-violet-600 py-3">
                <div className="max-w-4xl mx-auto px-10 lg:px-0">
                  <GlobalHeader />
                </div>
              </div>
              <div className=" mx-auto bg-slate-100 px-10 lg:px-0">
                <div className="max-w-4xl mx-auto">{children}</div>
              </div>
            </div>
          </ProfileProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
