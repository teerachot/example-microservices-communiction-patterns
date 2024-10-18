import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

export const createLogger = (service: string) =>
  WinstonModule.createLogger({
    level: process.env.LOG_LEVEL ?? 'info',
    format: winston.format.json(),
    defaultMeta: { service },
    transports:
      process.env.NODE_ENV === 'production'
        ? [new winston.transports.File({ filename: 'server.log' })]
        : [
            new winston.transports.File({ filename: 'server.log' }),
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike('API', {
                  colors: true,
                  prettyPrint: true,
                  processId: true,
                  appName: true,
                }),
              ),
            }),
          ],
  });
