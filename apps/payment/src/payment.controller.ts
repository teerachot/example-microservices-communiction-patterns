import { Controller, UseInterceptors } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { Event } from '@app/events/constants';
import { KafkaLoggingInterceptor } from '@app/interceptors/kafka-logging.interceptor';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(Event.PaymentRequested)
  @UseInterceptors(KafkaLoggingInterceptor)
  pay(@Payload() data: any, @Ctx() context: KafkaContext) {
    return this.paymentService.pay(data, {
      id: context.getArgByIndex(0).headers['x-correlation-id'],
    });
  }
}
