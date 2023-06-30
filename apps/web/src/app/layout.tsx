'use client';

import classNames from 'classnames';

import { SessionProvider } from 'next-auth/react';
import { Ubuntu_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { useSnapshot } from 'valtio';

import AuthProvider from '@/components/providers/auth';

import { AppChildren } from '@/types';
import { appProxyState } from '@/store/app.state';
import { configToster } from '@/global';

import '@/global/styles.scss';

const fonts = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const RootLayout = ({ children, session }: AppChildren) => {
  const { lang } = useSnapshot(appProxyState);

  return (
    <html lang={lang}>
      <body className={classNames({ [fonts.className]: true, dark: true })}>
        <SessionProvider session={session}>
          <AuthProvider>{children}</AuthProvider>
        </SessionProvider>

        <Toaster toastOptions={configToster} />
      </body>
    </html>
  );
};

export default RootLayout;
