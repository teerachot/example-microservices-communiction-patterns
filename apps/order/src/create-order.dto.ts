import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  userId: number;
  items: CreateOrderItemDto[];
}
