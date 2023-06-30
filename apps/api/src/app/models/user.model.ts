import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail, Length, MaxLength } from 'class-validator';
import { hash } from 'bcryptjs';

import { Role } from './role.model';
import { BaseModel } from './base.model';
import { UserStatusEnum } from './enums/user_status';
import { UserSocial } from './user_social.model';
import { UserSecret } from './user_secret.model';

@ObjectType()
@Entity({
  synchronize: true,
})
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @MaxLength(15)
  @Column()
  username: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @Column({ nullable: true, default: false })
  confirmed: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  token: string;

  @Field(() => UserStatusEnum, { defaultValue: UserStatusEnum.ACTIVE })
  @Column({
    enum: UserStatusEnum,
    type: 'enum',
  })
  status: UserStatusEnum;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Length(6, 255)
  @Column({ nullable: true })
  password: string;

  @Field(() => [Role], { defaultValue: [], nullable: true })
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Field(() => [UserSocial], { nullable: true, defaultValue: [] })
  @OneToMany(() => UserSocial, photo => photo.user)
  @JoinTable()
  social: UserSocial[];

  @Field(() => [UserSecret], { nullable: true, defaultValue: [] })
  @OneToMany(() => UserSecret, secrets => secrets.user)
  @JoinTable()
  secrets: UserSecret[];

  @BeforeInsert()
  async encryptPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
