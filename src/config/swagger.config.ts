import { COSTA_RICA_FLAG_URL } from '@/constants';
import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('API Geo CR - Costa Rica Geographic Data')
    .setDescription(
      `
      🇨🇷 API oficial de datos geográficos de Costa Rica | Official Costa Rica Geographic Data API

      Accede a información actualizada y detallada sobre:
      - Provincias de Costa Rica
      - Cantones por provincia
      - Distritos por cantón
      
      Ideal para:
      ✅ Aplicaciones que necesiten datos geográficos de Costa Rica
      ✅ Sistemas de comercio electrónico
      ✅ Aplicaciones de entrega y logística
      ✅ Integración con sistemas gubernamentales
      
      Features:
      - Datos oficiales y actualizados
      - Documentación completa
      - Paginación integrada
      - Respuestas rápidas
      - Arquitectura hexagonal
      
      Keywords: Costa Rica, API, provincias, cantones, distritos, geografía, datos geográficos, 
      API REST, desarrollo, software, ubicaciones, direcciones, Costa Rica locations, 
      geographic data, provinces, counties, districts
    `,
    )
    .setVersion('1.0')
    .setContact('Aníbal Alpízar', 'https://github.com/anibalalpizar', '')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('https://api-geo-cr.vercel.app', 'Production Server')
    .addServer('http://localhost:3000', 'Development Server')
    .addTag(
      'provincias',
      'Endpoints para obtener información de provincias de Costa Rica',
    )
    .addTag(
      'cantones',
      'Endpoints para obtener información de cantones por provincia',
    )
    .addTag(
      'distritos',
      'Endpoints para obtener información de distritos por cantón',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'API Geo CR | Costa Rica Geographic Data API',
    customfavIcon: COSTA_RICA_FLAG_URL,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
    ],
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
  });
};
