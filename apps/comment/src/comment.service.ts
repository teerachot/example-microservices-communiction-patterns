import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentCommand } from './commands/impl/create-comment.command';
import { GetCommentsQuery } from './queries/impl/get-comments.query';

@Injectable()
export class CommentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(form: CreateCommentDto) {
    return await this.commandBus.execute(
      new CreateCommentCommand(form.productId, form.userId, form.content),
    );
  }

  findAll() {
    return this.queryBus.execute(new GetCommentsQuery());
  }
}
