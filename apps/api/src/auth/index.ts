import { AuthChecker } from 'type-graphql';
import { AppI18nLang, i18n } from '@kry/i18n';

import { ContextDataType, ContextPayloadType } from './types';
import AuthService from '../app/auth/auth.service';

export const getAuthContext = (
  ctx: ContextPayloadType,
  authService: AuthService
): ContextDataType => {
  const lang = ctx.req.headers['accept-language'] as AppI18nLang;
  const isValidLang = Object.keys(i18n).includes(lang);

  return {
    token: ctx.req.headers.authorization,
    lang: isValidLang ? lang : 'en',
    authService,
  };
};

export const customAuthChecker: AuthChecker<ContextDataType> = async (
  { context: { token, authService, lang } },
  roles
) => {
  const user = await authService.auth(token, lang);

  if (roles.length == 0) return true;
  if (!user || !user.roles || user.roles.length == 0) return false;

  const permissions = roles.map(
    role =>
      !!user.roles.filter(
        ({ permissions }) =>
          !!permissions.find(permission => permission.name == role)
      )
  );

  return !permissions.filter(el => el == false);
};
