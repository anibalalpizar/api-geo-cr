import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { InMemoryProvinciaRepository } from '@/infrastructure/persistence/provincia.in-memory.repository';
import { Module } from '@nestjs/common';
import { CantonModule } from './canton.module';
import { ProvinciaController } from './provincia.controller';

@Module({
  imports: [CantonModule],
  controllers: [ProvinciaController],
  providers: [
    GetAllProvinciasUseCase,
    GetProvinciaByIdUseCase,
    {
      provide: 'ProvinciaRepository',
      useClass: InMemoryProvinciaRepository,
    },
  ],
})
export class ProvinciaModule {}

