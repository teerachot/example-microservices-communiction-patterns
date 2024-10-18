import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return this.orderService.findOne(id, {
      id: req.headers['x-correlation-id'],
    });
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() form: CreateOrderDto, @Req() req: Request) {
    const correlation = {
      id: req.headers['x-correlation-id'],
    };
    await this.orderService.create(form, correlation);
    await this.orderService.sendConfirmOrderEmail(form, correlation);
  }
}
