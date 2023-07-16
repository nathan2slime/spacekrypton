'use client';

import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';

import { AppChildren } from '@/types';
import { authProxyState } from '@/store/auth.state';

import { styles } from './styles';

const style = styles();

const AuthLayout = ({ children }: AppChildren) => {
  const router = useRouter();
  const { user } = useSnapshot(authProxyState);

  useEffect(() => {
    if (user) {
      if (!user.confirmed) return router.push('/auth/active');

      router.push('/app/space');
    }
  }, [user]);

  return (
    <div className={style.base()}>
      {children}

      <div />
    </div>
  );
};

export default AuthLayout;
