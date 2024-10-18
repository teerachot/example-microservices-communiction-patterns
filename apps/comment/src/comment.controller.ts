import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() form: CreateCommentDto) {
    return this.commentService.create(form);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }
}
