import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { CantonModule } from '@/interfaces/canton.module';
import { ProvinciaModule } from '@/interfaces/provincia.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProvinciaModule, CantonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
