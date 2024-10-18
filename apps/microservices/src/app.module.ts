import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: false,
        context: () => {
          return { correlationId: crypto.randomUUID() };
        },
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'products', url: 'http://localhost:8381/graphql' },
            { name: 'users', url: 'http://localhost:8383/graphql' },
            { name: 'orders', url: 'http://localhost:8382/graphql' },
          ],
        }),
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource<{ correlationId: string }>({
            url,
            willSendRequest: ({ request, context }) => {
              request.http.headers.set(
                'x-correlation-id',
                context.correlationId,
              );
            },
          }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
