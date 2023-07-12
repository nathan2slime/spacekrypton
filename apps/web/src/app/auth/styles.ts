import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    base: 'w-screen justify-center h-screen flex sm:justify-start items-center bg-dark-300 bg-[url(/assets/imgs/space.png)]',
    thumb: 'w-full h-full',
  },
});
