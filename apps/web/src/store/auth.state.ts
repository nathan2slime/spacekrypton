import { User } from '@kry/types';
import { proxy } from 'valtio';

export type AuthState = {
  user?: User;
  loading: boolean;
};

export const authProxyState = proxy<AuthState>({
  loading: true,
});
