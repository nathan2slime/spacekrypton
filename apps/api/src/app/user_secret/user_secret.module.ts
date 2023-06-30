import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSecret } from '../models/user_secret.model';
import { User } from '../models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserSecret, User])],
  controllers: [],
  providers: [],
})
export default class UserSecretModule {}
