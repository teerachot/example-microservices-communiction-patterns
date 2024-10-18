import { WriteCommentEntity } from '../../entities/write-comment.entity';

export class CommentCreatedEvent {
  id?: number;
  productId: number;
  userId: number;
  content: string;

  constructor(comment: WriteCommentEntity) {
    Object.assign(this, comment);
  }
}
