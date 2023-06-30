import { Field, ObjectType, ID } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AuthSocialEnum } from './enums/auth_social';
import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
@Entity({
  synchronize: true,
})
export class UserSocial extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => AuthSocialEnum)
  @Column({ type: 'enum', enum: AuthSocialEnum })
  type: AuthSocialEnum;

  @Field(() => String)
  @Column()
  secret: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.social)
  user: User;
}
