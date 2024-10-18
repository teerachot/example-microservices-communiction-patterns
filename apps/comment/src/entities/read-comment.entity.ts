export class ReadCommentEntity {
  id: number;
  productId: number;
  content: string;
  user: {
    id: number;
    name: string;
  };

  constructor(comment: ReadCommentEntity) {
    Object.assign(this, comment);
  }
}
