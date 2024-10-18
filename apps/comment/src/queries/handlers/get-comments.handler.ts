import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommentsQuery } from '../impl/get-comments.query';
import { ReadCommentRepository } from '../../repositories/read-comments.repository';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(private readonly repository: ReadCommentRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetCommentsQuery) {
    return this.repository.findAll();
  }
}
