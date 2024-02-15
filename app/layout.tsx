import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// @ts-ignore
import React from 'react';
import designStyles from '../node_modules/@ost-cas-fee-adv-23-24/elbmum-design/lib/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elbum Wep App',
  description: 'by Bladimir and Patrick',
  assets: [designStyles],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
