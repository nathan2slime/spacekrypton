import { PulseLoader } from 'react-spinners';

import { styles } from './styles';

const style = styles();

export const Loading = () => (
  <div className={style}>
    <PulseLoader color="#6421D9" />
  </div>
);
