import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

let cachedApp;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Geo CR')
    .setDescription('API para obtener información geográfica de Costa Rica')
    .setVersion('1.0')
    .addTag('provincias', 'Endpoints relacionados con provincias')
    .addTag('cantones', 'Endpoints relacionados con cantones')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.enableCors();
  await app.init();

  return app;
}

export default async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  const httpAdapter = cachedApp.getHttpAdapter();
  httpAdapter.getInstance()(req, res);
}
