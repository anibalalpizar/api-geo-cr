import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { InMemoryProvinciaRepository } from '@/infrastructure/persistence/provincia.in-memory.repository';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('provincias')
export class ProvinciaController {
  private readonly provinciaRepository = new InMemoryProvinciaRepository();
  private readonly getAllProvinciasUseCase = new GetAllProvinciasUseCase(
    this.provinciaRepository,
  );
  private readonly getProvinciaByIdUseCase = new GetProvinciaByIdUseCase(
    this.provinciaRepository,
  );

  @Get()
  async findAll() {
    return this.getAllProvinciasUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getProvinciaByIdUseCase.execute(Number(id));
  }
}
