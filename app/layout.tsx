import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

import { UserInfoProvider } from '@/providers/UserInfo.provider';

const inter = Inter({ subsets: ['latin'] });
import '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecommendationsProvider } from '@/providers/Recommendations.provider';
import { PostsProvider } from '@/providers/posts/Posts.provider';
import { BreakpointsProvider } from '@/providers/Breakpoints.provider';
import frontendConfig from '@/config/configFrontend';
import { LayoutProvider } from '@/providers/layout/Layout.provider';

export const metadata: Metadata = {
  title: 'Welcome to Mumble',
  description: 'by Bladimir and Patrick',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Elbum Wep Apps',
    description: 'by Bladimir and Patrick',
    type: 'website',
    locale: 'en_IE',
    url: 'https://cusconews.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <UserInfoProvider>
            <BreakpointsProvider>
              <PostsProvider>
                <RecommendationsProvider>
                  <LayoutProvider>{children}</LayoutProvider>
                </RecommendationsProvider>
              </PostsProvider>
            </BreakpointsProvider>
          </UserInfoProvider>
        </SessionProvider>
        <ToastContainer autoClose={frontendConfig.notificationDuration} />
      </body>
    </html>
  );
}
