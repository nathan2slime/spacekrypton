import { HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type KryInputProps = HTMLMotionProps<'input'> &
  VariantProps<typeof styles> & {
    invalid?: boolean;
    message?: string;
    label?: string;
    onChange?: (value: string) => void;
  };
