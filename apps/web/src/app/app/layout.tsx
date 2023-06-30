'use client';

import { useSnapshot } from 'valtio';

import { Sidebar } from '@/components/sidebar';
import { appProxyState } from '@/store/app.state';

import { AppChildren } from '@/types';
import { styles } from './styles';

const AppLayout = ({ children }: AppChildren) => {
  const style = styles();

  const { sidebar } = useSnapshot(appProxyState);

  return (
    <div className={style.base()}>
      <Sidebar
        onToggle={open => (appProxyState.sidebar.open = open)}
        open={sidebar.open}
      />

      {children}
    </div>
  );
};

export default AppLayout;
