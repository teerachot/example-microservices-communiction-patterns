import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  productId: number;

  @Field()
  price: number;

  @Field(() => Int)
  quantity: number;
}
