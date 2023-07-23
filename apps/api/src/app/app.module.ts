import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { envs } from '@kry/envs';

import UserModule from './user/user.module';
import SeedModule from './seed/seed.module';

import { config } from '../database';

import { customAuthChecker, getAuthContext } from '../auth';
import { ContextPayloadType } from '../auth/types';

import AuthService from './auth/auth.service';
import AuthModule from './auth/auth.module';
import EmailModule from './email/email.module';
import UserSecretModule from './user_secret/user_secret.module';
import SatelliteModule from './satellite/satellite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeGraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [AuthService],
      imports: [
        UserModule,
        AuthModule,
        SatelliteModule,
        EmailModule,
        UserSecretModule,
      ],
      useFactory: async (authService: AuthService) => {
        const isDev = envs.NODE_ENV == 'development';

        return {
          context: (ctx: ContextPayloadType) =>
            getAuthContext(ctx, authService),
          validate: false,
          debug: isDev,
          playground: isDev,
          credentials: false,
          authChecker: customAuthChecker,
          emitSchemaFile: {
            path: './schema.gql',
          },
          authMode: 'error',
        };
      },
    }),
    UserModule,
    SeedModule,
  ],
})
export class AppModule {}
