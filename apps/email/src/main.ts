import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { createLogger } from '@app/utils/create-logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule,
    {
      transport: Transport.RMQ,
      logger: createLogger('email'),
      options: {
        urls: ['amqp://user:pass@localhost:8481'],
        queue: 'email_queue',
        noAck: false,
        persistent: true,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
