import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { GlobalHeader } from '@/components/global-header/GlobalHeader';
import { SessionProvider } from 'next-auth/react';

import { UserInfoProvider } from '@/providers/UserInfo.provider';
const inter = Inter({ subsets: ['latin'] });
import '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';
import { ModalProvider } from '@/providers/Modal.provider';
import { PostsProvider } from '@/providers/Posts.provider';

export const metadata: Metadata = {
  title: 'Elbum Wep App',
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
    <html>
      <body className={inter.className}>
        <SessionProvider>
          <UserInfoProvider>
            <ModalProvider>
              <PostsProvider>
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
              </PostsProvider>
            </ModalProvider>
          </UserInfoProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
