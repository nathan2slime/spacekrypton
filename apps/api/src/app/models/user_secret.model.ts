import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
@Entity({
  synchronize: true,
})
export class UserSecret extends BaseModel {
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

  @Field(() => Date)
  @Column()
  expiresIn: Date;
}
