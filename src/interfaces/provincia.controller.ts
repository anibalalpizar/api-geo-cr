import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { InMemoryProvinciaRepository } from '@/infrastructure/persistence/provincia.in-memory.repository';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Param, Query } from '@nestjs/common';

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
  async findAll(@Query('page') page = 1, @Query('limit') limit = 7) {
    const pagination = { page: Number(page), limit: Number(limit) };
    const result = await this.getAllProvinciasUseCase.execute(pagination);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.PROVINCIAS_FETCHED_SUCCESSFULLY,
      result.data,
      pagination.page,
      pagination.limit,
      result.meta.totalItems,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getProvinciaByIdUseCase.execute(Number(id));
  }
}
