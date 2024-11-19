import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinciaModule } from './interfaces/provincia.module';

@Module({
  imports: [ProvinciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
