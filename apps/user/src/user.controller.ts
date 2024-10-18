import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserById } from '@app/protos/models/user-by-id.model';
import { GrpcLoggingInterceptor } from '@app/interceptors/grpc-logging.interceptor';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @GrpcMethod('UsersService', 'FindOne')
  @UseInterceptors(GrpcLoggingInterceptor)
  findOneRpc(data: UserById) {
    return this.userService.findOne(data.id);
  }
}
