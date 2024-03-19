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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const mainWrapperCss =
    'main-wrapper w-full flex flex-col h-screen min-h-screen overflow-y-hidden';
  const headerCss = 'header bg-violet-600 py-3';
  const contentCss = 'content bg-slate-100 px-10 lg:px-0 grow overflow-y-auto';

  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <UserInfoProvider>
            <ModalProvider>
              <PostsProvider>
                <div className={mainWrapperCss}>
                  <div className={headerCss}>
                    <div className="global-width mx-auto px-10 lg:px-0">
                      <GlobalHeader />
                    </div>
                  </div>
                  <div className={contentCss}>{children}</div>
                </div>
              </PostsProvider>
            </ModalProvider>
          </UserInfoProvider>
        </SessionProvider>
        <ToastContainer autoClose={5000} />
      </body>
    </html>
  );
}
