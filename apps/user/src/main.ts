import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { createLogger } from '@app/utils/create-logger';

async function bootstrap() {
  const app = await NestFactory.create(UserModule, {
    logger: createLogger('user'),
  });
  // createMicroservice ในกรณีที่ต้องการเรียกใช้ Microservice แบบหลายหัว เช่น graphql, grpc, http
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'protos',
      protoPath: join(__dirname, 'models/user.proto'),
      url: '0.0.0.0:8391',
    },
  });

  await app.startAllMicroservices();
  await app.listen(8383);
}
bootstrap();
