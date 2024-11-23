import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CantonModule } from '@/interfaces/canton.module';
import { ProvinciaModule } from '@/interfaces/provincia.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from './config/env.config';
import { DistritoModule } from './interfaces/distrito.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    ProvinciaModule,
    CantonModule,
    DistritoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
