import { PaymentRequestedEvent } from '@app/events/models/payment-requested.event';
import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './payment.model';
import { sample } from 'lodash';
import { Transaction } from './transaction.model';
import { PaymentCreatedEvent } from '@app/events/models/payment-created.event';
import { ClientKafka } from '@nestjs/microservices';
import { CouponRequestedEvent } from '@app/events/models/coupon-requested.event';
import { Event } from '@app/events/constants';
import { Correlation } from '@app/utils/correlation.model';

@Injectable()
export class PaymentService {
  payments: Payment[] = [];
  transactions: Transaction[] = [];

  constructor(@Inject('COUPON_SERVICE') private couponService: ClientKafka) {
    for (let i = 1; i <= 10; i++) {
      this.payments.push({
        id: i,
        userId: i,
        method: sample(['DEBIT', 'CREDIT']),
        type: sample(['VISA', 'MASTERCARD']),
        no: +`12345678${i}`,
      });
    }
  }

  pay(data: PaymentRequestedEvent, correlation?: Correlation) {
    const transaction = {
      id: this.transactions.length + 1,
      orderId: data.orderId,
      paymentId: this.payments.find((p) => p.userId === data.userId).id,
      amount: data.totalPrice,
    };
    this.transactions.push(transaction);
    this.couponService.emit(Event.CouponRequested, {
      key: data.userId,
      value: new CouponRequestedEvent({
        userId: data.userId,
        transactionId: transaction.id,
        totalPrice: data.totalPrice,
      }),
      headers: {
        'x-correlation-id': correlation.id,
      },
    });
    console.log('The payment process completed successfully');
    return new PaymentCreatedEvent({
      totalPrice: transaction.amount,
      transactionId: transaction.id,
    });
  }
}
