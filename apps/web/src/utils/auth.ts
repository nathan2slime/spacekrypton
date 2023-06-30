import { signOut } from 'next-auth/react';
import { User } from '@kry/types';

import { authProxyState } from '@/store/auth.state';

import { withWindow } from './index';

const storageKeyUser = process.env.NEXT_PUBLIC_STORAGE_KEY_USER || 'user';

export const getSavedUser = () =>
  withWindow(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKeyUser) as string);
    } catch (error) {
      return;
    }
  }) as User | undefined;

export const saveUser = (data: User) =>
  withWindow(() => localStorage.setItem(storageKeyUser, JSON.stringify(data)));

export const logout = async () => {
  await signOut({ redirect: false });
  localStorage.removeItem(storageKeyUser);
  authProxyState.user = undefined;
};
