import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends') // สืบทอด จาก user model
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  @Directive('@external')
  id: number;
}
