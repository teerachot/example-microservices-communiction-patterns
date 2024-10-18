import { Injectable } from '@nestjs/common';
import { Coupon } from './coupon.model';
import { CouponRequestedEvent } from '@app/events/models/coupon-requested.event';

@Injectable()
export class CouponService {
  coupons: Coupon[] = [];

  create(data: CouponRequestedEvent) {
    const coupon = {
      id: this.coupons.length + 1,
      transactionId: data.transactionId,
      userId: data.userId,
      amount: data.totalPrice * 0.1,
    };
    this.coupons.push(coupon);
    console.log('Coupon:', coupon);
  }
}
