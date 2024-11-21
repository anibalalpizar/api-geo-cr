import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CantonModule } from '@/interfaces/canton.module';
import { ProvinciaModule } from '@/interfaces/provincia.module';
import { Module } from '@nestjs/common';
import { DistritoModule } from './interfaces/distrito.module';

@Module({
  imports: [ProvinciaModule, CantonModule, DistritoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
