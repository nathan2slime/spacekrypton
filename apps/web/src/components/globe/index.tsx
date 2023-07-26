'use client';

import { useEffect, useRef } from 'react';
import { Viewer, start } from '@kry/globe';

import { AppRef } from '@/types';

import { SatellitesProps } from './model';
import { styles } from './styles';

export const Globe = ({}: SatellitesProps) => {
  const ref: AppRef<HTMLDivElement> = useRef(null);
  const style = styles();

  useEffect(() => {
    const viewer = new Viewer(ref.current as HTMLElement);

    start(viewer);
  }, []);

  return (
    <div className={style.base()}>
      <div ref={ref} />
    </div>
  );
};
