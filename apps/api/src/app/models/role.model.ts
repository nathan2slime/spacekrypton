import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { Permission } from './permission.model';
import { BaseModel } from './base.model';

@ObjectType()
@Entity({
  synchronize: true,
})
export class Role extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @MaxLength(15)
  @Column()
  name: string;

  @Field(() => [Permission], { defaultValue: [], nullable: true })
  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
