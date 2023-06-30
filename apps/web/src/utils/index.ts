export const withWindow = (callback: () => void) =>
  typeof window != 'undefined' && callback();
