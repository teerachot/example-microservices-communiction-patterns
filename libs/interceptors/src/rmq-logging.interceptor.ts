import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class RmqLoggingInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const rmqCtx = context.switchToRpc().getContext<RmqContext>();
    const firstArg = rmqCtx.getArgByIndex(0);
    this.logger.log({
      event: rmqCtx.getPattern(),
      routingKey: firstArg.fields.routingKey,
      correlationId: firstArg.properties.headers['x-correlation-id'],
    });
    return next.handle();
  }
}
