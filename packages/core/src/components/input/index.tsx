import { motion } from 'framer-motion';
import { FC, forwardRef } from 'react';

import { KryInputProps } from './model';
import { styles } from './styles';

export const KryInput = forwardRef<HTMLInputElement>(
  (
    {
      className,
      children,
      kryChange,
      label,
      message,
      invalid,
      value,
      ...props
    }: KryInputProps,
    ref
  ) => {
    const style = styles({ className, invalid });

    return (
      <div className={style.container()}>
        {label && <label className={style.label()}>{label}</label>}

        <motion.input
          {...props}
          ref={ref}
          value={value || ''}
          onChange={e => kryChange && kryChange(e.target.value)}
          className={style.base({ className })}
        />

        {invalid && <span className={style.message()}>{message}</span>}
      </div>
    );
  }
) as FC<KryInputProps>;
