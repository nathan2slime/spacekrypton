import { registerEnumType } from 'type-graphql';

export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  PENDING_PASSWORD = 'PENDING_PASSWORD',
  INACTIVE = 'INACTIVE',
}

registerEnumType(UserStatusEnum, {
  name: 'UserStatusEnum',
});
