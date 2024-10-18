import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class KafkaLoggingInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const kafkaCtx = context.switchToRpc().getContext<KafkaContext>();
    this.logger.log({
      topic: kafkaCtx.getTopic(),
      partition: kafkaCtx.getPartition(),
      correlationId: kafkaCtx.getArgByIndex(0).headers['x-correlation-id'],
    });
    return next.handle();
  }
}
