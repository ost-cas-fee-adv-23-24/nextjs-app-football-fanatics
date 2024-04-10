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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { frontendConfig } from '@/config';
import { RecommendationsProvider } from '@/providers/Recommendations.provider';
import { PostsProvider } from '@/providers/posts/Posts.provider';

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <UserInfoProvider>
            <ModalProvider>
              <PostsProvider>
                <RecommendationsProvider>
                  <div className={mainWrapperCss}>
                    <div className={headerCss}>
                      <div className="global-width mx-auto px-10 lg:px-0">
                        <GlobalHeader />
                      </div>
                    </div>
                    <div className={contentCss}>{children}</div>
                  </div>
                </RecommendationsProvider>
              </PostsProvider>
            </ModalProvider>
          </UserInfoProvider>
        </SessionProvider>

        <ToastContainer autoClose={frontendConfig.notificationDuration} />
      </body>
    </html>
  );
}
