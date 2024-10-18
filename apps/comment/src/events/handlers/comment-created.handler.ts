import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommentCreatedEvent } from '../impl/comment-created.event';
import { UsersService } from '@app/protos/services/users.service';
import { OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ReadCommentRepository } from '../../repositories/read-comments.repository';
import { ReadCommentEntity } from '../../entities/read-comment.entity';

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedHandler
  implements IEventHandler<CommentCreatedEvent>, OnModuleInit
{
  private usersService: UsersService;

  constructor(
    @Inject('PROTOS_PACKAGE') private grpc: ClientGrpc,
    private readonly repository: ReadCommentRepository,
  ) {}

  onModuleInit() {
    this.usersService = this.grpc.getService<UsersService>('UsersService');
  }

  async handle(event: CommentCreatedEvent) {
    const user = await firstValueFrom(
      this.usersService.findOne({ id: event.userId }),
    );

    this.repository.create(
      new ReadCommentEntity({
        id: event.id!,
        productId: event.productId,
        user: {
          id: user.id,
          name: user.name,
        },
        content: event.content,
      }),
    );
  }
}
