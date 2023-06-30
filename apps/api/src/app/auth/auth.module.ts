import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../models/user.model';
import { UserSocial } from '../models/user_social.model';
import { UserSecret } from '../models/user_secret.model';

import AuthResolver from '../auth/auth.resolver';

import TokenService from './token/token.service';
import AuthService from './auth.service';
import UserService from '../user/user.service';
import EmailService from '../email/email.service';
import UserSecretService from '../user_secret/user_secret.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSocial, UserSecret])],
  providers: [
    AuthResolver,
    AuthService,
    EmailService,
    UserService,
    TokenService,
    UserSecretService,
    EmailService,
  ],
  exports: [AuthService],
})
export default class AuthModule {}
