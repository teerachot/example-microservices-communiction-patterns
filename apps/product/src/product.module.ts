import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      plugins: [ApolloServerPluginInlineTrace()],
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductResolver],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
