import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';
import { generateApiResponse } from '@/utils/response.util';
import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('provincias')
@Controller('provincias')
export class ProvinciaController {
  constructor(
    private readonly getAllProvinciasUseCase: GetAllProvinciasUseCase,
    private readonly getProvinciaByIdUseCase: GetProvinciaByIdUseCase,
    private readonly getCantonesByProvinciaUseCase: GetCantonesByProvinciaUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las provincias' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de items por página',
    example: 7,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de provincias obtenida exitosamente',
  })
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
  @ApiOperation({ summary: 'Obtener una provincia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la provincia' })
  @ApiResponse({ status: 200, description: 'Provincia encontrada' })
  @ApiResponse({ status: 404, description: 'Provincia no encontrada' })
  async findById(@Param('id') id: string) {
    return this.getProvinciaByIdUseCase.execute(Number(id));
  }

  @Get(':id/cantones')
  @ApiOperation({ summary: 'Obtener cantones de una provincia' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la provincia' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de items por página',
    example: 7,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de cantones obtenida exitosamente',
  })
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
