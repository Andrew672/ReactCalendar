import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/styles/globals.css';
import { SnackProvider } from './providers/SnackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'A simple, fully customizable React Calendar, styled with TailwindCSS.',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="fr" className="bg-gray-200">
          <body className={inter.className}>
              <SnackProvider>
                {children}
              </SnackProvider>
          </body>
      </html>
  );
}
