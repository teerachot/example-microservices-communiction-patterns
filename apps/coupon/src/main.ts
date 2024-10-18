import { NestFactory } from '@nestjs/core';
import { CouponModule } from './coupon.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { createLogger } from '@app/utils/create-logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CouponModule,
    {
      transport: Transport.KAFKA,
      logger: createLogger('coupon'),
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'coupon-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
