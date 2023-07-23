import {
  PulseLoader,
  DotLoader,
  BeatLoader,
  ClockLoader,
} from 'react-spinners';

import { styles } from './styles';
import { LoadingProps } from './model';

export const Loading = ({ center, blur, screen }: LoadingProps) => {
  const style = styles({ center, blur, screen });

  const config = { color: '#6421D9' };
  const loaders = [
    <BeatLoader {...config} />,
    <PulseLoader {...config} />,
    <ClockLoader {...config} />,
    <DotLoader {...config} />,
  ];

  const index = parseInt((0 + Math.random() * 4).toString());

  console.log(index);

  return <div className={style}>{loaders[index] ?? loaders[0]}</div>;
};
