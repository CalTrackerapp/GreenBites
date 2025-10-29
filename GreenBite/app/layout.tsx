"use client";
import { ClerkProvider } from '@clerk/nextjs';
import UserContextProvider from '../src/context/user-context';
import Header from './_components/Header';
import '../src/index.css';
import '../src/App.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <UserContextProvider>
            <Header />
            {children}
          </UserContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

