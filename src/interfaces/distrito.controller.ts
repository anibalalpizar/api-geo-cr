import { GetAllDistritosUseCase } from '@/application/get-all-distritos.usecase';
import { GetDistritoByIdUseCase } from '@/application/get-distrito-by-id.usecase';
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

@ApiTags('distritos')
@Controller('distritos')
export class DistritoController {
  constructor(
    private readonly getAllDistritosUseCase: GetAllDistritosUseCase,
    private readonly getDistritoByIdUseCase: GetDistritoByIdUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los distritos' })
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
    description: 'Lista de distritos obtenida exitosamente',
  })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 7) {
    const pagination = { page: Number(page), limit: Number(limit) };
    const result = await this.getAllDistritosUseCase.execute(pagination);

    return generateApiResponse(
      ResponseStatus.SUCCESS,
      ResponseMessages.DISTRITOS_FETCHED_SUCCESSFULLY,
      result.data,
      pagination.page,
      pagination.limit,
      result.meta.totalItems,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un distrito por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del distrito' })
  @ApiResponse({ status: 200, description: 'Distrito encontrado' })
  @ApiResponse({ status: 404, description: 'Distrito no encontrado' })
  async findById(@Param('id') id: string) {
    return this.getDistritoByIdUseCase.execute(Number(id));
  }
}
