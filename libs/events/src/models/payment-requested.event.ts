import { AppEvent } from './app.event';

export class PaymentRequestedEvent extends AppEvent {
  orderId: number;
  userId: number;
  totalPrice: number;

  constructor(payment: PaymentRequestedEvent) {
    // มีการสืบทอกจาก AppEvent ซึ่งเป็น  Super class
    super();
    Object.assign(this, payment);
  }
}
