'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { User } from '@kry/types';
import { useRouter } from 'next/navigation';

import { Loading } from '@/components/loading';

import { authProxyState } from '@/store/auth.state';
import { AuthServices } from '@/services/auth.services';
import { appProxyState } from '@/store/app.state';

import { getSavedUser, saveUser } from '@/utils/auth';
import { AppChildren } from '@/types';

const AuthProvider = ({ children }: AppChildren) => {
  const router = useRouter();

  const { lang } = useSnapshot(appProxyState);
  const { loading, ...auth } = useSnapshot(authProxyState);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated' && session) {
      saveUser(session.user as User);
      authProxyState.user = session.user as User;
    }
  }, [session]);

  useEffect(() => {
    if (auth.user) return;

    const user = getSavedUser();

    if (user) {
      onAuth(user.token as string);
    } else {
      authProxyState.loading = status == 'loading';
    }
  }, [session]);

  useEffect(() => {
    const { user } = auth;

    if (user && !user.confirmed) router.push('/auth/active');
  }, [auth]);

  const onAuth = async (token: string) => {
    const authServices = new AuthServices({
      lang,
      token,
    });

    const data = await authServices.auth();

    if (data) {
      authProxyState.user = data.Auth;
      saveUser(data.Auth);
    }

    authProxyState.loading = false;
  };

  return <>{loading && !auth.user ? <Loading /> : children}</>;
};

export default AuthProvider;
