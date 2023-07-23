import {
  AuthSocialDocument,
  Mutation,
  MutationAuthSocialArgs,
  Query,
  AuthDocument,
  SignUpDocument,
  MutationSignInArgs,
  MutationSignUpArgs,
  SignInDocument,
  MutationConfirmAccountArgs,
  ConfirmAccountDocument,
  SendConfirmEmailDocument,
  MutationSendAccountConfirmationEmailArgs,
} from '@kry/types';
import { AppI18nLang } from '@kry/i18n';

import graphql from '@/graphql';

export type AuthServiceData = {
  token?: string;
  lang?: AppI18nLang;
};

export class AuthServices {
  lang?: AppI18nLang;
  token?: string;

  constructor(data?: AuthServiceData) {
    this.lang = data?.lang;
    this.token = data?.token;
  }

  async social(payload: MutationAuthSocialArgs) {
    return await graphql<Mutation, MutationAuthSocialArgs>({
      query: AuthSocialDocument,
      type: 'mutation',
      lang: this.lang,
      variables: payload,
      notify: false,
    });
  }

  async login(payload: MutationSignInArgs) {
    return await graphql<Mutation, MutationSignInArgs>({
      query: SignInDocument,
      type: 'mutation',
      lang: this.lang,
      variables: payload,
    });
  }

  async confirm(payload: MutationConfirmAccountArgs) {
    return await graphql<Mutation, MutationConfirmAccountArgs>({
      query: ConfirmAccountDocument,
      type: 'mutation',
      variables: payload,
      lang: this.lang,
    });
  }

  async sendEmailCode(payload: MutationSendAccountConfirmationEmailArgs) {
    return await graphql<Mutation, MutationSendAccountConfirmationEmailArgs>({
      query: SendConfirmEmailDocument,
      type: 'mutation',
      variables: payload,
      lang: this.lang,
    });
  }

  async auth() {
    return await graphql<Query, {}>({
      query: AuthDocument,
      type: 'query',
      notify: false,
      lang: this.lang,
      token: this.token,
      variables: {},
    });
  }

  async signup(payload: MutationSignUpArgs) {
    return await graphql<Mutation, MutationSignUpArgs>({
      query: SignUpDocument,
      type: 'mutation',
      lang: this.lang,
      variables: payload,
    });
  }
}
