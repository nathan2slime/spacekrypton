import { registerEnumType } from 'type-graphql';

export enum PermissionEnum {
  DELETE_USER = 'MANAGE_USER',
  EDIT_NEWS = 'EDIT_NEWS',
  DELETE_NEWS = 'DELETE_NEWS',
  ADMINISTRATOR = 'ADMINISTRATOR',
  CREATE_NEWS = 'CREATE_NEWS',
}

registerEnumType(PermissionEnum, {
  name: 'PermissionEnum',
});
