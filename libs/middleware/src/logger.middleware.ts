import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, headers } = request;
    const { statusCode } = response;
    const correlationId = headers['x-correlation-id'];

    this.logger.log({
      method,
      correlationId,
      originalUrl,
      statusCode,
    });

    next();
  }
}
