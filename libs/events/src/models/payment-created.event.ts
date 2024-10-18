import { AppEvent } from './app.event';

export class PaymentCreatedEvent extends AppEvent {
  transactionId: number;
  totalPrice: number;

  constructor(payment: PaymentCreatedEvent) {
    super();
    Object.assign(this, payment);
  }
}
