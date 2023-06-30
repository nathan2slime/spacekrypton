import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Paginate {
  @Field(() => Number, { nullable: true })
  totalItems?: number;

  @Field(() => Number)
  itemCount: number;

  @Field(() => Number)
  itemsPerPage: number;

  @Field(() => Number, { nullable: true })
  totalPages?: number;

  @Field(() => Number)
  currentPage: number;

  @Field(() => String, { nullable: true })
  first?: string;

  @Field(() => String, { nullable: true })
  previous?: string;

  @Field(() => String, { nullable: true })
  next?: string;

  @Field(() => String, { nullable: true })
  last?: string;
}

@ObjectType()
export class Success {
  @Field(() => Boolean)
  success: boolean;
}
