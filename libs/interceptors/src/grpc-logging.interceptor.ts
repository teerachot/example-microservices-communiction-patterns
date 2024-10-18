import { Metadata } from '@grpc/grpc-js';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class GrpcLoggingInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap((data) => {
        this.logger.log({
          path: context.getArgs()?.[2]?.path,
          data,
          correlationId: context
            .switchToRpc()
            .getContext<Metadata>()
            .get('x-correlation-id'),
        });
      }),
    );
  }
}
