import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';

import {
  AuthUser,
  CreateUserInput,
  LoginInput,
  UpdateUserInput,
  User,
} from '../schemas/users.schemas';
import { UserServices } from '../../services/users.services';
import type { AppContext } from '../../auth';

@Resolver()
export class UserResolver {
  userServices: UserServices = new UserServices();

  @Query(() => User)
  async Auth(@Ctx() ctx: AppContext): Promise<User> {
    return await this.userServices.getById(ctx.user, ctx.lang);
  }

  @Mutation(() => AuthUser)
  async Login(@Arg('login') data: LoginInput, @Ctx() ctx: AppContext): Promise<AuthUser> {
    return await this.userServices.login(data, ctx.lang);
  }

  @Mutation(() => AuthUser)
  async SignUp(
    @Arg('user') data: CreateUserInput,
    @Ctx() ctx: AppContext
  ): Promise<AuthUser> {
    return await this.userServices.create(data, ctx.lang);
  }

  @Mutation(() => User)
  async UserUpdate(
    @Arg('user') data: UpdateUserInput,
    @Ctx() ctx: AppContext
  ): Promise<User> {
    return await this.userServices.update(data, ctx.user, ctx.lang);
  }

  @Query(() => User)
  async Profile(@Arg('id') data: string, @Ctx() ctx: AppContext): Promise<User> {
    return await this.userServices.getById(data, ctx.lang);
  }
}
