import { GetAllCantonesUseCase } from '@/application/get-all-cantones.usecase';
import { GetCantonByIdUseCase } from '@/application/get-canton-by-id.usecase';
import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { InMemoryCantonRepository } from '@/infrastructure/persistence/canton.in-memory.repository';
import { Module } from '@nestjs/common';
import { CantonController } from './canton.controller';
import { DistritoModule } from './distrito.module';

@Module({
  imports: [DistritoModule],
  controllers: [CantonController],
  providers: [
    GetAllCantonesUseCase,
    GetCantonByIdUseCase,
    GetDistritosByCantonUseCase,
    {
      provide: 'CantonRepository',
      useClass: InMemoryCantonRepository,
    },
  ],
  exports: [GetDistritosByCantonUseCase, 'CantonRepository'],
})
export class CantonModule {}
