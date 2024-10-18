// export interface Order {
//   id: number;
//   userId: number;
//   items: {
//     productId: number;
//     price: number;
//     quantity: number;
//   }[];
//   status: 'REQUESTED' | 'COMPLETED';
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderItem } from './order-item.model';
import { User } from './user.model';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user?: User;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field()
  status: 'REQUESTED' | 'COMPLETED';
}
