import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentModule);
  await app.listen(8386);
}
bootstrap();
