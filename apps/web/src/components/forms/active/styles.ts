import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    logo: 'max-w-[90px] w-full cursor-pointer',
    header: 'flex flex-col justify-center items-center gap-3',
    wrapper:
      'w-full p-9 py-12 flex flex-col h-full bg-dark-100 justify-between max-w-md',
    title: 'text-primary-500 text-2xl font-bold',
    subtitle: 'text-sm text-center text-light-400',
    email: 'text-secondary-150 font-bold text-base',
    footer: 'flex flex-col gap-4 w-full',
    divider: 'h-[1px] w-full my-4 bg-dark-800',
  },
});
