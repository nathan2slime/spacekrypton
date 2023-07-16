import { motion } from 'framer-motion';

import { KryInputProps } from './model';
import { styles } from './styles';

export const KryInput = ({
  className,
  children,
  kryChange: onChange,
  label,
  message,
  invalid,
  value,
  ...props
}: KryInputProps) => {
  const style = styles({ className, invalid });

  return (
    <div className={style.container()}>
      {label && <label className={style.label()}>{label}</label>}

      <motion.input
        {...props}
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        className={style.base()}
      />

      {invalid && <span className={style.message()}>{message}</span>}
    </div>
  );
};
