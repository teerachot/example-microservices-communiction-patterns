import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  sku: string;

  @Field()
  name: string;

  @Field()
  desc: string;

  @Field()
  price: number;
}
