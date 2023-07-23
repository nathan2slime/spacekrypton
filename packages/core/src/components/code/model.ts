import { HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type KryCodeProps = HTMLMotionProps<'div'> &
  VariantProps<typeof styles> & {
    size?: number;
    value?: string[];
    kryChange?: (value: string[]) => void;
  };
