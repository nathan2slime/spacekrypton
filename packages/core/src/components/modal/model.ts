import { HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type KryModalProps = HTMLMotionProps<'div'> &
  VariantProps<typeof styles> & {
    kryClose: () => void;
  };
