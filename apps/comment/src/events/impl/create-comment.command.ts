export class CreateCommentCommand {
  constructor(
    public readonly productId: number,
    public readonly userId: number,
    public readonly content: string,
  ) {}
}
