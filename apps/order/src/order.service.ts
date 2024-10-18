import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Order } from './order.model';
import {
  ClientGrpc,
  ClientKafka,
  ClientProxy,
  RmqRecordBuilder,
} from '@nestjs/microservices';
import { UsersService } from '@app/protos/services/users.service';
import { CreateOrderDto } from './create-order.dto';
import { firstValueFrom } from 'rxjs';
import { PaymentRequestedEvent } from '@app/events/models/payment-requested.event';
import { Event } from '@app/events/constants';
import * as grpc from '@grpc/grpc-js';
import { Correlation } from '@app/utils/correlation.model';

@Injectable()
export class OrderService implements OnModuleInit {
  private usersService: UsersService;
  private orders: Order[] = [
    {
      id: 1,
      userId: 1,
      items: [
        {
          productId: 1,
          price: 2_000,
          quantity: 10,
        },
        {
          productId: 2,
          price: 5_000,
          quantity: 20,
        },
      ],
      status: 'REQUESTED',
    },
    {
      id: 2,
      userId: 2,
      items: [
        {
          productId: 1,
          price: 2_000,
          quantity: 50,
        },
        {
          productId: 3,
          price: 500,
          quantity: 30,
        },
      ],
      status: 'REQUESTED',
    },
  ];

  constructor(
    @Inject('PROTOS_PACKAGE') private grpc: ClientGrpc,
    @Inject('STOCK_SERVICE') private stockService: ClientProxy,
    @Inject('EMAIL_SERVICE') private emailService: ClientProxy,
    @Inject('PAYMENT_SERVICE') private paymentService: ClientKafka,
  ) {}

  onModuleInit() {
    this.usersService = this.grpc.getService<UsersService>('UsersService');
    this.paymentService.subscribeToResponseOf('payment_requested');
  }

  findAll() {
    return this.orders;
  }

  async findOne(id: number, correlation?: Correlation) {
    const order = this.orders.find((o) => o.id === id);
    const user = await this.findUserById(order.userId, correlation);

    return { ...order, user };
  }

  async create(form: CreateOrderDto, correlation?: Correlation) {
    const result = await firstValueFrom(
      this.stockService.send('order.created', form.items),
    );

    if (!result) {
      throw new BadRequestException('There are not enough products in stock');
    }

    const order = {
      id: this.orders.length + 1,
      status: 'REQUESTED' as const,
      ...form,
    };
    this.orders.push(order);

    this.paymentService
      .send(Event.PaymentRequested, {
        key: order.userId,
        value: new PaymentRequestedEvent({
          orderId: order.id,
          userId: order.userId,
          totalPrice: order.items.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0,
          ),
        }),
        headers: {
          'x-correlation-id': correlation.id,
        },
      })
      .subscribe((payment) => {
        console.log('payment', payment);
        this.orders.find((o) => o.id === order.id).status = 'COMPLETED';
      });
  }

  async sendConfirmOrderEmail(form: CreateOrderDto, correlation?: Correlation) {
    const user = await this.findUserById(form.userId);
    const record = new RmqRecordBuilder({
      to: user.email,
      subject: 'Order Confirmation',
      body: 'Your order has been placed',
    })
      .setOptions({
        headers: {
          'x-correlation-id': correlation.id,
        },
      })
      .build();
    return firstValueFrom(this.emailService.emit('email_requested', record));
  }

  private findUserById(id: number, correlation?: Correlation) {
    const metadata = new grpc.Metadata();
    if (correlation) {
      metadata.add('x-correlation-id', correlation.id);
    }
    return firstValueFrom(this.usersService.findOne({ id }, metadata));
  }
}
