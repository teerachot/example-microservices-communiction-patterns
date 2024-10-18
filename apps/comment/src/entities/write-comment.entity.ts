export class WriteCommentEntity {
  id?: number;
  productId: number;
  userId: number;
  content: string;

  constructor(comment: WriteCommentEntity) {
    Object.assign(this, comment);
  }
}
