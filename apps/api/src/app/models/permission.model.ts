import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';

import { BaseModel } from './base.model';
import { PermissionEnum } from './enums/permission';

@ObjectType()
@InputType()
@Entity({
  synchronize: true,
})
export class Permission extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => PermissionEnum)
  @Column('enum', {
    enum: PermissionEnum,
    unique: true,
  })
  name: PermissionEnum;
}
