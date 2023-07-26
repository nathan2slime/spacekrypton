'use client';

import { useSnapshot } from 'valtio';
import { useEffect, useState } from 'react';
import { KryModal } from '@kry/core';

import { Globe } from '@/components/globe';
import { Loading } from '@/components/loading';

import { authProxyState } from '@/store/auth.state';

import { SpaceGeolocation } from './model';

import { styles } from './styles';

const Space = () => {
  const [geolocation, setGeolocation] = useState<SpaceGeolocation>({
    modal: false,
    loading: true,
  });

  const style = styles();

  const { user, loading } = useSnapshot(authProxyState);

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    console.log(geolocation.location);
  }, [geolocation.location]);

  const getGeolocation = () =>
    navigator.geolocation.getCurrentPosition(
      location => setGeolocation({ ...geolocation, location, loading: false }),
      () => setGeolocation({ ...geolocation, modal: true, loading: false })
    );

  return (
    <div className={style.base()}>
      {geolocation.loading && <Loading blur center={false} screen={false} />}

      <Globe />
      <KryModal kryClose={() => {}}></KryModal>
    </div>
  );
};

export default Space;
