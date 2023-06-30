import { MaxLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType()
export class ValidateUserSecret {
  @Field() user: number;

  @MaxLength(6)
  @Field()
  secret: string;
}
