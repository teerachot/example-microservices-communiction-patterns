import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { createLogger } from '@app/utils/create-logger';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule, {
    logger: createLogger('product'),
  });
  await app.listen(8381);
}
bootstrap();
