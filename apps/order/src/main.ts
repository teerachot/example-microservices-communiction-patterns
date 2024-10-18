import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { createLogger } from '@app/utils/create-logger';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule, {
    logger: createLogger('order'),
  });
  await app.listen(8382);
}
bootstrap();
