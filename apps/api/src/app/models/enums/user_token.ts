import { registerEnumType } from 'type-graphql';

export enum UserTokenEnum {
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  AUTHORIZATION = 'AUTHORIZATION',
}

registerEnumType(UserTokenEnum, {
  name: 'UserTokenEnum',
});
