import type { Metadata } from 'next';
import React, { ReactNode } from 'react';
import '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { SessionProvider } from 'next-auth/react';
import { UserInfoProvider } from '@/providers/UserInfo.provider';
import { ToastContainer } from 'react-toastify';
import { RecommendationsProvider } from '@/providers/Recommendations.provider';
import { PostsProvider } from '@/providers/posts/Posts.provider';
import { BreakpointsProvider } from '@/providers/Breakpoints.provider';
import { LayoutProvider } from '@/providers/layout/Layout.provider';
import { Poppins } from 'next/font/google';

import frontendConfig from '@/config/configFrontend';

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

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.className}`}>
      <body className={`h-screen bg-slate-100`}>
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
        <ToastContainer
          autoClose={frontendConfig.notificationDuration}
          theme="colored"
        />
      </body>
    </html>
  );
}
