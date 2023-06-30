import { AppI18nLang } from '@kry/i18n';
import { proxy } from 'valtio';

export type AppSidebarState = {
  open: boolean;
};

export type AppState = {
  lang: AppI18nLang;
  sidebar: AppSidebarState;
};

export const appProxyState = proxy<AppState>({
  lang: 'en',
  sidebar: {
    open: true,
  },
});
