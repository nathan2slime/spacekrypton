import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';

import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission]), CommandModule],
  controllers: [],
  providers: [SeedService, SeedCommand],
})
export default class SeedsModule {}
