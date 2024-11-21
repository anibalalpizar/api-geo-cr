import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('provincias')
export class ProvinciaController {
  constructor(
    private readonly getAllProvinciasUseCase: GetAllProvinciasUseCase,
    private readonly getProvinciaByIdUseCase: GetProvinciaByIdUseCase,
    private readonly getCantonesByProvinciaUseCase: GetCantonesByProvinciaUseCase,
  ) {}

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

  @Get(':id/cantones')
  async findCantonesByProvinciaId(
    @Query('page') page = 1,
    @Query('limit') limit = 7,
    @Param('id') id: string,
  ) {
    const pagination = { page: Number(page), limit: Number(limit) };
    const result = await this.getCantonesByProvinciaUseCase.execute(
      pagination,
      Number(id),
    );

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.CANTONES_FETCHED_SUCCESSFULLY,
      result.data,
      pagination.page,
      pagination.limit,
      result.meta.totalItems,
    );
  }
}
