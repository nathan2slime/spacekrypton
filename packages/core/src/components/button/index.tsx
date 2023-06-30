import { motion } from 'framer-motion';

import { KryButtonProps } from './model';
import { styles } from './styles';

export const KryButton = ({
  className,
  children,
  rounded,
  disabled,
  color,
  variant,
  ...props
}: KryButtonProps) => (
  <motion.button
    {...props}
    className={styles({ className, variant, color, disabled, rounded })}
  >
    {children}
  </motion.button>
);
