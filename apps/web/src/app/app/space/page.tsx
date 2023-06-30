'use client';

import { useSnapshot } from 'valtio';
import { useEffect } from 'react';

import { authProxyState } from '@/store/auth.state';
import { Satellites } from '@/components/satellites';

import { styles } from './styles';

const Space = () => {
  const style = styles();

  const { user, loading } = useSnapshot(authProxyState);

  useEffect(() => {}, []);

  return (
    <div className={style.base()}>
      <Satellites />
    </div>
  );
};

export default Space;
