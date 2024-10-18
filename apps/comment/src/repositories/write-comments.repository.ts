import { Injectable } from '@nestjs/common';
import { WriteCommentEntity } from '../entities/write-comment.entity';

@Injectable()
export class WriteCommentRepository {
  id?: number;
  productId: number;
  userId: number;
  content: string;

  comments: WriteCommentEntity[] = [];

  // constructor(comment: WriteCommentRepository) {
  //   Object.assign(this, comment);
  // }

  create(comment: WriteCommentEntity) {
    this.comments.push(comment);
  }
}
