import { tv } from 'tailwind-variants';

export const styles = tv({
  variants: {
    type: {
      signup: { wrapper: 'min-h-[670px]' },
      signin: {
        wrapper: 'min-h-[650px]',
      },
    },
  },
  slots: {
    logo: 'max-w-[90px] w-full cursor-pointer',
    footerAction: 'mb-2 mt-2 text-primary-100',
    footer: 'flex flex-col justify-center items-center',
    header: 'flex justify-center items-center gap-3',
    title: 'text-primary-500text-2xl capitalize font-bold',
    wrapper:
      'w-full p-9 py-12 flex flex-col rounded-2xl bg-dark-100 justify-between max-w-lg',
    button: 'mt-4',
    fields: 'flex flex-col gap-3',
    link: 'font-bold text-primary-100 hover:text-secondary-100 transition duration-200 cursor-pointer',
    divider: 'h-[1px] w-full my-6 bg-dark-500',
  },
});
