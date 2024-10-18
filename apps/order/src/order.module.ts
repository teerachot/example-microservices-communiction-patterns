import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './user.model';
import { OrderResolver } from './order.resolver';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ClientKafka,
  ClientProxy,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      plugins: [ApolloServerPluginInlineTrace()],
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    ClientsModule.register([
      {
        name: 'PROTOS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'protos',
          protoPath: join(__dirname, 'models/user.proto'),
          url: 'localhost:8391',
        },
      },
      {
        name: 'STOCK_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8385,
        },
      },
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pass@localhost:8481'],
          queue: 'email_queue',
          noAck: true,
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule implements OnApplicationBootstrap, NestModule {
  constructor(
    @Inject('STOCK_SERVICE') private stockService: ClientProxy,
    @Inject('EMAIL_SERVICE') private emailService: ClientProxy,
    @Inject('PAYMENT_SERVICE') private paymentService: ClientKafka,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async onApplicationBootstrap() {
    await this.stockService.connect();
    await this.emailService.connect();
    await this.paymentService.connect();
  }
}
