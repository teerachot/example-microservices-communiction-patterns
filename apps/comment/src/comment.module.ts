import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CreateCommentHandler } from './commands/handlers/create-comment.handler';
import { GetCommentsHandler } from './queries/handlers/get-comments.handler';
import { ReadCommentRepository } from './repositories/read-comments.repository';
import { WriteCommentRepository } from './repositories/write-comments.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentCreatedHandler } from './events/handlers/comment-created.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'PROTOS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'protos',
          protoPath: join(__dirname, 'models/user.proto'),
          url: 'localhost:8391',
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CreateCommentHandler,
    CommentCreatedHandler,
    GetCommentsHandler,
    ReadCommentRepository,
    WriteCommentRepository,
  ],
})
export class CommentModule {}
