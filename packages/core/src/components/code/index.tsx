import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { KryInput } from '../input';
import { KryCodeProps } from './model';
import { styles } from './styles';

export const KryCode = ({
  value,
  className,
  size = 6,
  kryChange,
  ...props
}: KryCodeProps) => {
  const style = styles()
  const [code, setCode] = useState<string[]>(
    Array.from({ length: size }, () => '')
  );

  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value && value.length === size) setCode(value);
  }, [value, size]);

  useEffect(() => {
    const first = refs.current[0];

    first && first.focus();
  }, []);

  const onChangeSingleCode = (newValue: string, index: number) => {
    setCode(prevCode => {
      const updated = [...prevCode];
      updated[index] = newValue;

      kryChange!(updated);
      return updated;
    });

    if (newValue && index < size - 1) {
      const next = refs.current[index + 1];

      next && next.focus();
    }
  };

  const onKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const ref = refs.current[index - 1];

      ref && ref.focus();
    }
  };

  return (
    <motion.div {...props} className={style.base({ className })}>
      {Array.from({ length: size }).map((_, index) => (
        <KryInput
          ref={(el: HTMLInputElement) => (refs.current[index] = el)}
          key={index}
          className={style.field()}
          value={code[index].toUpperCase()}
          maxLength={1}
          kryChange={e => onChangeSingleCode(e, index)}
          onKeyDown={e => onKeyPress(e, index)}
        />
      ))}
    </motion.div>
  );
};
