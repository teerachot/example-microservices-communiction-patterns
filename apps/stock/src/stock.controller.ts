import { Controller } from '@nestjs/common';
import { StockService } from './stock.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StockReservationDto } from './stock-reservation.dto';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @MessagePattern('order.created')
  reserveInventory(@Payload() data: StockReservationDto[]) {
    return this.stockService.reserveInventory(data);
  }
}
