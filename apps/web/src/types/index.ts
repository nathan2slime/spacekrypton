import { Session } from 'next-auth';
import { MutableRefObject, ReactNode } from 'react';

export type AppChildren = {
  children: ReactNode;
  session?: Session;
};

export type AppRef<T = HTMLElement> = MutableRefObject<T | null>;
