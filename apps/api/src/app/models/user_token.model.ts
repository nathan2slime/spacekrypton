import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { BaseModel } from './base.model';
import { User } from './user.model';
import { UserTokenEnum } from './enums/user_token';

@ObjectType()
@Entity({
  synchronize: true,
})
export class UserToken extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @MaxLength(6)
  @Column()
  secret: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.secrets)
  user: User;

  @Field(() => UserTokenEnum)
  @Column()
  type: UserTokenEnum;
}
