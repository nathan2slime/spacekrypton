import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'h-10 w-full rounded-md border border-solid p-2 px-3 text-sm tracking-wide outline-none bg-dark-800 text-light-500  border-dark-900 focus:border-primary-400',
  variants: {
    invalid: {
      true: 'border-danger-400 focus:border-warning-400',
    },
  },
  slots: {
    container: 'flex flex-col',
    message: 'mt-1 block text-[12px] tracking-wide text-warning-400',
    label:
      'mb-1 block text-[13px] tracking-wide text-slate-600 dark:text-primary-110',
  },
});
