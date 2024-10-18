import { Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COUPON_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'coupon',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'coupon-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, Logger],
})
export class PaymentModule implements OnApplicationBootstrap {
  constructor(@Inject('COUPON_SERVICE') private couponService: ClientKafka) {}

  async onApplicationBootstrap() {
    await this.couponService.connect();
  }
}
