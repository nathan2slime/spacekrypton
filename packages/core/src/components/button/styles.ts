import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'h-10 w-full cursor-pointer duration-300 rounded-md outline-none border-transparent flex items-center justify-center border text-sm font-semibold tracking-wide',
  variants: {
    color: {
      primary:
        'bg-primary-500 hover:bg-primary-500 text-light-400 dark:text-dark-400',
      secondary:
        'bg-secondary-600 hover:bg-secondary-110 text-dark-200 dark:text-dark-200',
    },
    variant: {
      solid: 'border-transparent',
      outline:
        'bg-transparent border-primary-100 border border-solid hover:bg-transparent',
    },
    block: {
      true: 'w-full',
      false: 'w-fit',
    },
    disabled: {
      true: 'pointer-events-none bg-gray-400 text-gray-700 dark:text-gray-400 dark:bg-dark-700',
      false: '',
    },
    rounded: {
      true: 'w-full max-w-[40px] rounded-full',
    },
  },
  defaultVariants: {
    color: 'primary',
    variant: 'solid',
  },
  compoundVariants: [
    {
      color: 'primary',
      variant: 'outline',
      class: 'text-primary-100 dark:text-primary-100 hover:text-primary-200',
    },
    {
      color: 'secondary',
      variant: 'outline',
      class:
        'text-secondary-400 border-secondary-400 dark:text-secondary-400 hover:text-secondary-400',
    },
    {
      variant: 'outline',
      color: 'primary',
      disabled: true,
      class: 'dark:bg-transparent',
    },
  ] as object[],
});
