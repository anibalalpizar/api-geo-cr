import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';

@Module({
  controllers: [ProvinciaController],
})
export class ProvinciaModule {}
