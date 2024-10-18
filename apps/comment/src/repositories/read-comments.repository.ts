import { Injectable } from '@nestjs/common';
import { ReadCommentEntity } from '../entities/read-comment.entity';

@Injectable()
export class ReadCommentRepository {
  comments: ReadCommentEntity[] = [];

  create(comment: ReadCommentEntity) {
    this.comments.push(comment);
  }

  findAll() {
    return this.comments;
  }
}
