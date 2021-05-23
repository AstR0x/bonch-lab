import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(join(process.cwd(), '../client')));
  }

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Bonch Lab API')
    .setDescription('Документация API сервиса Bonch Lab')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();

  await app.listen(5000);
}
bootstrap();
