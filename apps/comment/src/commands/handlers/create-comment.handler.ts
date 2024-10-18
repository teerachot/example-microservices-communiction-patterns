import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../impl/create-comment.command';
import { WriteCommentRepository } from '../../repositories/write-comments.repository';
import { WriteCommentEntity } from '../../entities/write-comment.entity';
import { CommentCreatedEvent } from '../../events/impl/comment-created.event';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly repository: WriteCommentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCommentCommand) {
    const entity = new WriteCommentEntity({
      productId: command.productId,
      userId: command.userId,
      content: command.content,
    });

    this.repository.create(entity);
    this.eventBus.publish(new CommentCreatedEvent(entity));
  }
}
