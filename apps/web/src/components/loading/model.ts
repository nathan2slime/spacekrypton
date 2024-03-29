import { HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type LoadingProps = HTMLMotionProps<'div'> &
  VariantProps<typeof styles>;
