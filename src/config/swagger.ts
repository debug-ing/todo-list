import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { PORT } from './app';

export function swaggerConfig(app: INestApplication) {
  const documentConfig = new DocumentBuilder()
    .setTitle('Todo List document')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig, {
    extraModels: [],
  });
  SwaggerModule.setup('docs', app, document);
}
