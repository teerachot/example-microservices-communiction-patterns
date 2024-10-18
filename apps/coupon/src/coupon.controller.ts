import { Controller, UseInterceptors } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CouponRequestedEvent } from '@app/events/models/coupon-requested.event';
import { Event } from '@app/events/constants';
import { KafkaLoggingInterceptor } from '@app/interceptors/kafka-logging.interceptor';

@Controller()
export class CouponController {
  constructor(private readonly couponService: CouponService) {}
  // event pattern
  @EventPattern(Event.CouponRequested)
  @UseInterceptors(KafkaLoggingInterceptor)
  create(@Payload() data: CouponRequestedEvent) {
    return this.couponService.create(data);
  }
}
