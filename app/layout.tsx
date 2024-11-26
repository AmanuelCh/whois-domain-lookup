import type { Metadata } from 'next';
import { inter } from './fonts/fonts';
import './globals.css';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'WHOIS Domain Lookup',
  description: 'Get quick domain info',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <Head>
          <meta
            property='og:image'
            content='https://www.pexels.com/photo/web-text-1591060/'
          />
        </Head>
        {children}
      </body>
    </html>
  );
}
