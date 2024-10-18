import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Order } from './order.model';
import { OrderService } from './order.service';
import { User } from './user.model';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order], { name: 'orders' })
  getOrders() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  getOrder(@Args('id') id: number) {
    return this.orderService.findOne(id);
  }

  @ResolveField(() => User) // ถ้าข้อมูลของ user จาก order ไม่มี ให้ไปค้นหาจาก user model ตัวฉบับ
  user(@Parent() order: Order) {
    return { __typename: 'User', id: order.userId };
  }
}
