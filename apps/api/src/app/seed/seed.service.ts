import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { PermissionEnum } from '../models/enums/permission';
import { Permission } from '../models/permission.model';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async permission() {
    try {
      const permissions = [
        PermissionEnum.ADMINISTRATOR,
        PermissionEnum.CREATE_NEWS,
        PermissionEnum.DELETE_NEWS,
        PermissionEnum.DELETE_USER,
        PermissionEnum.EDIT_NEWS,
      ];

      return await Promise.all(
        permissions.map(async name => {
          const permission = await this.permissionRepository.findOneBy({
            name,
          });

          if (!permission) {
            const newPermission = this.permissionRepository.create({
              name: name,
            });

            await this.permissionRepository.save(newPermission);

            return newPermission;
          }

          return permission;
        })
      );
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  async admin() {
    try {
      const permissions = await this.permission();

      const role = this.roleRepository.create({
        name: 'admin',
        permissions,
      });

      const password = process.env.ADMIN_PASSWORD || faker.internet.password();
      const username = process.env.ADMIN_USERNAME || faker.internet.userName();
      const email = process.env.ADMIN_EMAIL || faker.internet.email();

      const payload = {
        email,
        username,
        password,
        roles: [role],
      };

      const user = this.userRepository.create(payload);

      await this.roleRepository.save(role);
      await this.userRepository.save(user);

      this.logger.verbose(payload);
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }
}
