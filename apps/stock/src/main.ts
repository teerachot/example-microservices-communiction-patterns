import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // createMicroservice ในกรณีที่ต้องการเรียกใช้ Microservice แบบเดียว
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StockModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8385,
      },
    },
  );
  await app.listen();
}
bootstrap();
