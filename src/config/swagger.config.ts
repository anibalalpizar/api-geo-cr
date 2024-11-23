import { COSTA_RICA_FLAG_URL } from '@/constants';
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Geo CR')
    .setDescription('API para obtener información geográfica de Costa Rica')
    .setVersion('1.0')
    .addTag('provincias', 'Endpoints relacionados con provincias')
    .addTag('cantones', 'Endpoints relacionados con cantones')
    .addTag('distritos', 'Endpoints relacionados con distritos')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'API Geo CR',
    customfavIcon: COSTA_RICA_FLAG_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    ],
  });
};
