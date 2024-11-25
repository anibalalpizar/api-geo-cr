import { AppModule } from '@/app.module';
import { setupSwagger } from '@/config/swagger.config';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  app.use((req, res, next) => {
    res.header('X-Robots-Tag', 'index, follow');
    next();
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  if (configService.get('config.swaggerEnabled')) {
    setupSwagger(app);
  }

  const port = configService.get('config.port');
  await app.listen(port);

  console.log(`
🚀 API Geo CR is running on: http://localhost:${port}
📚 Documentation available at: http://localhost:${port}
🌍 Environment: ${configService.get('config.nodeEnv')}
  `);
}

bootstrap();
