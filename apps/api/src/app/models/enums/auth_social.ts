import { registerEnumType } from 'type-graphql';

export enum AuthSocialEnum {
  DISCORD = 'DISCORD',
}

registerEnumType(AuthSocialEnum, {
  name: 'AuthSocialEnum',
});
