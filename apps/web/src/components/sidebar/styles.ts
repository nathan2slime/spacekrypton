import { tv } from 'tailwind-variants';

export const styles = tv({
  base: 'dark:bg-dark-300 flex flex-shrink-0 flex-col items-start justify-between px-3 py-5 bg-light-300 w-full h-screen transition-max-width duration-300',
  variants: {
    open: {
      true: 'max-w-xs',
      false: 'max-w-[90px]',
    },
    active: {
      true: {
        item: 'bg-dark-900',
      },
      false: {
        item: 'bg-transparent',
      },
    },
  },
  slots: {
    items: 'w-full flex flex-col gap-3',
    login: 'w-full gap-3 flex flex-col',
    account:
      'bg-dark-700 rounded-lg p-4 flex items-center gap-4 w-full min-h-[60px]',
    user: 'text-sm text-light-400',
    avatar: 'w-12 h-12 rounded-full',
    item: 'w-full flex h-10 items-center text-sm gap-3 py-3 px-3 text-light-400 bg-dark-900 border rounded-md border-solid border-dark-900 hover:border-primary-600 transition duration-300',
  },
});
