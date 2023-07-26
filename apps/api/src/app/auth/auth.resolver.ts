import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';

import { User } from '../models/user.model';
import {
  SocialSignInInput,
  SignInInput,
  SignUpInput,
  ConfirmAccountInput,
  SendAccountConfirmationEmailInput,
  RequestPasswordChangeInput,
  ChangePasswordInput,
} from './auth.types';
import { ContextDataType } from '../../auth/types';

import AuthService from '../auth/auth.service';
import { Success } from '../app.types';

@Injectable()
@Resolver()
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'Auth' })
  async authorization(@Ctx() ctx: ContextDataType) {
    return await this.authService.auth(ctx.token, ctx.lang);
  }

  @Mutation(() => User, { name: 'SignUp' })
  async signup(@Ctx() ctx: ContextDataType, @Arg('data') data: SignUpInput) {
    return await this.authService.signup(data, ctx.lang);
  }

  @Mutation(() => User, { name: 'SignIn' })
  async login(@Ctx() ctx: ContextDataType, @Arg('data') data: SignInInput) {
    return await this.authService.login(data, ctx.lang);
  }

  @Mutation(() => User, { name: 'AuthSocial' })
  async social(
    @Ctx() ctx: ContextDataType,
    @Arg('data') data: SocialSignInInput
  ) {
    return await this.authService.social(data, ctx.lang);
  }

  @Mutation(() => User, { name: 'ConfirmAccount' })
  async confirmAccount(
    @Ctx() ctx: ContextDataType,
    @Arg('data') data: ConfirmAccountInput
  ) {
    return await this.authService.confirmAccount(data, ctx.lang);
  }

  @Mutation(() => User, { name: 'ChangePassword' })
  async changePassword(
    @Ctx() ctx: ContextDataType,
    @Arg('data') data: ChangePasswordInput
  ) {
    return await this.authService.changePassword(data, ctx.token, ctx.lang);
  }

  @Mutation(() => Success, { name: 'RequestPasswordChange' })
  async requestPasswordChange(
    @Ctx() ctx: ContextDataType,
    @Arg('data') { email }: RequestPasswordChangeInput
  ) {
    return await this.authService.requestPasswordChange(email, ctx.lang);
  }

  @Mutation(() => Success, { name: 'SendAccountConfirmationEmail' })
  async sendAccountConfirmationEmail(
    @Ctx() ctx: ContextDataType,
    @Arg('data') data: SendAccountConfirmationEmailInput
  ) {
    return await this.authService.sendAccountConfirmationEmail(
      data.user,
      ctx.lang
    );
  }
}
