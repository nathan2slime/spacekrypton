import { IsEmail, Length, MaxLength } from 'class-validator';
import { ObjectType, Field, InputType } from 'type-graphql';

import { AuthSocialEnum } from '../models/enums/auth_social';

@ObjectType()
@InputType('SignInInput')
export class SignInInput {
  @Field(() => String)
  @MaxLength(15)
  email: string;

  @Field(() => String)
  @Length(6, 255)
  password: string;
}

@ObjectType()
@InputType('SignUpInput')
export class SignUpInput {
  @Field(() => String)
  @MaxLength(15)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  @Length(6, 255)
  password: string;
}

@ObjectType()
@InputType('SocialSignInInput')
export class SocialSignInInput {
  @Field(() => AuthSocialEnum)
  type: AuthSocialEnum;

  @Field(() => String)
  secret: string;

  @Field(() => String, { nullable: true })
  @MaxLength(15)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  avatar: string;
}

@ObjectType()
@InputType()
export class ConfirmAccountInput {
  @Field() user: number;

  @MaxLength(6)
  @Field()
  secret: string;
}

@ObjectType()
@InputType()
export class SendAccountConfirmationEmailInput {
  @Field() user: number;
}
