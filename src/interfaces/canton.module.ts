import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { GetCantonByIdUseCase } from '@/application/get-canton-by-id.usecase';
import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { InMemoryCantonRepository } from '@/infrastructure/persistence/canton.in-memory.repository';
import { Module } from '@nestjs/common';
import { CantonController } from './canton.controller';

@Module({
  controllers: [CantonController],
  providers: [
    GetAllCantonesUseCase,
    GetCantonByIdUseCase,
    GetCantonesByProvinciaUseCase,
    {
      provide: 'CantonRepository',
      useClass: InMemoryCantonRepository,
    },
  ],
  exports: [GetCantonesByProvinciaUseCase],
})
export class CantonModule {}
