'use client';

import { useEffect, useRef } from 'react';
import { Viewer, start } from '@kry/satellites';

import { AppRef } from '@/types';

import { SatellitesProps } from './model';
import { styles } from './styles';

export const Satellites = ({}: SatellitesProps) => {
  const ref: AppRef<HTMLDivElement> = useRef(null);
  const style = styles();

  useEffect(() => {
    const viewer = new Viewer(ref.current as HTMLElement);

    start(viewer, [
      // {
      //   coords: [
      //     {
      //       lat: 312,
      //       long: 334,
      //     },
      //   ],
      // },
    ]);
  }, []);

  return (
    <div className={style.base()}>
      <div ref={ref} />
    </div>
  );
};
