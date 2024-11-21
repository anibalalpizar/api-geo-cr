import { GetAllDistritosUseCase } from '@/application/get-all-distritos.usecase';
import { GetDistritoByIdUseCase } from '@/application/get-distrito-by-id.usecase';
import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { InMemoryDistritoRepository } from '@/infrastructure/persistence/distrito.in-memory.repository';
import { Module } from '@nestjs/common';
import { DistritoController } from './distrito.controller';

@Module({
  controllers: [DistritoController],
  providers: [
    GetAllDistritosUseCase,
    GetDistritoByIdUseCase,
    GetDistritosByCantonUseCase,
    {
      provide: 'DistritoRepository',
      useClass: InMemoryDistritoRepository,
    },
  ],
  exports: [GetDistritosByCantonUseCase, 'DistritoRepository'],
})
export class DistritoModule {}
