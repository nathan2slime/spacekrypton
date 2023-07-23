import { tv } from 'tailwind-variants';

export const styles = tv({
  variants: {
    open: {
      true: 'opacity-100 pointer-events-auto',
      false: 'opacity-0 pointer-events-none',
    },
  },
  slots: {
    base: 'w-screen h-screen overflow-y-auto overflow-hidden',
  },
});
