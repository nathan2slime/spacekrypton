import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserService from './user.service';
import EmailService from '../email/email.service';
import UserSecretService from '../user_secret/user_secret.service';

import { User } from '../models/user.model';
import { UserSecret } from '../models/user_secret.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSecret])],
  providers: [UserService, EmailService, UserSecretService],
  exports: [UserService],
})
export default class UserModule {}
