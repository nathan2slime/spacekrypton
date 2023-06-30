import { HTMLMotionProps } from 'framer-motion';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './styles';

export type SidebarProps = HTMLMotionProps<'div'> &
  VariantProps<typeof styles> & {
    onToggle: (open: boolean) => void;
  };
