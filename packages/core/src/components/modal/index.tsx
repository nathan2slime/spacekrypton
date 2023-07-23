import { KryModalProps } from './model';
import { styles } from './styles';

export const KryModal = ({ hidden }: KryModalProps) => {
  const style = styles();

  return (
    <div className={style.base()}>
      <span>{hidden}</span>
    </div>
  );
};
