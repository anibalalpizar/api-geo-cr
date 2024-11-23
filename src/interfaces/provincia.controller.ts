import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { ResponseMessages, ResponseStatus } from '@/constants';
import { generateApiResponse } from '@/utils/response.util';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
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
    status: HttpStatus.OK,
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una provincia por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la provincia' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Provincia encontrada' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Provincia no encontrada',
  })
  async findById(@Param('id') id: string) {
    const provincia = await this.getProvinciaByIdUseCase.execute(Number(id));
    if (!provincia) {
      throw new NotFoundException('Provincia no encontrada');
    }
    return provincia;
  }

  @Get(':id/cantones')
  @HttpCode(HttpStatus.OK)
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
    status: HttpStatus.OK,
    description: 'Lista de cantones obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Provincia no encontrada',
  })
  async findCantonesByProvinciaId(
    @Query('page') page = 1,
    @Query('limit') limit = 7,
    @Param('id') id: string,
  ) {
    const provincia = await this.getProvinciaByIdUseCase.execute(Number(id));
    if (!provincia) {
      throw new NotFoundException('Provincia no encontrada');
    }

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
