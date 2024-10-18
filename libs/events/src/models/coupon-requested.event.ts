import { AppEvent } from './app.event';

export class CouponRequestedEvent extends AppEvent {
  userId: number;
  transactionId: number;
  totalPrice: number;

  constructor(coupon: CouponRequestedEvent) {
    super();
    Object.assign(this, coupon);
  }
}
