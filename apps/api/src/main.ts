import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from '@kry/envs';
import 'reflect-metadata';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'graphql';

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: envs.APP_URL,
    credentials: true,
    methods: ['POST'],
  });
  const port = process.env.PORT || 8080;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
