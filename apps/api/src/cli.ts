import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';

import { AppModule } from './app/app.module';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'verbose'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    await app.close();
    process.exit(1);
  }
};

bootstrap();
