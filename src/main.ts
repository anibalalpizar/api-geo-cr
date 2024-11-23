import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { setupSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  if (configService.get('config.swaggerEnabled')) {
    setupSwagger(app);
  }

  const port = configService.get('config.port');
  await app.listen(port);

  console.log(`
🚀 Geo CR API is running on: http://localhost:${port}
📚 Documentation available at: http://localhost:${port}
🌍 Environment: ${configService.get('config.nodeEnv')}
  `);
}

bootstrap();
