import { NestFactory } from '@nestjs/core';
import { envs } from '@kry/envs';
import { logger } from '@kry/logger';

import 'reflect-metadata';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { logger: false });
  const globalPrefix = 'graphql';

  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: envs.NODE_ENV == 'production' ? envs.APP_URL : true,
  });

  const port = process.env.PORT || 8080;

  await app.listen(port);
  logger.log(
    'success',
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap();
