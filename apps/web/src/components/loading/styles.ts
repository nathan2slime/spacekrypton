import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'flex flex-col absolute bg-dark-600 p-6 h-screen',
  variants: {
    center: {
      true: 'justify-center  items-center',
      false: 'justify-end items-end',
    },
    blur: {
      true: 'bg-opacity-70 backdrop-blur-sm',
      false: 'bg-opacity-100',
    },
    screen: {
      true: 'w-screen',
      false: 'w-full'
    }
  },
  defaultVariants: {
    blur: 'false',
    screen: 'true',
    center: 'true',
  },
});
