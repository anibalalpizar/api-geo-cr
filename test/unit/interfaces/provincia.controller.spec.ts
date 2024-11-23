import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { GetCantonesByProvinciaUseCase } from '@/application/get-cantones-by-provincia.usecase';
import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { ResponseMessages, ResponseStatus } from '@/constants';
import { Provincia } from '@/domain/entities';
import { ProvinciaController } from '@/interfaces/provincia.controller';

describe('ProvinciaController', () => {
  let controller: ProvinciaController;
  let mockGetAllProvinciasUseCase: jest.Mocked<GetAllProvinciasUseCase>;
  let mockGetProvinciaByIdUseCase: jest.Mocked<GetProvinciaByIdUseCase>;
  let mockGetCantonesByProvinciaUseCase: jest.Mocked<GetCantonesByProvinciaUseCase>;

  beforeEach(() => {
    mockGetAllProvinciasUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetProvinciaByIdUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetCantonesByProvinciaUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new ProvinciaController(
      mockGetAllProvinciasUseCase,
      mockGetProvinciaByIdUseCase,
      mockGetCantonesByProvinciaUseCase,
    );
  });

  describe('findAll', () => {
    it('should return paginated provincias', async () => {
      const mockResponse = {
        status: ResponseStatus.SUCCESS,
        statusCode: 200,
        message: ResponseMessages.PROVINCIAS_FETCHED_SUCCESSFULLY,
        data: [Provincia.create(1, 'San José')],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 7,
          totalPages: 1,
          currentPage: 1,
          timestamp: expect.any(String),
        },
      };

      mockGetAllProvinciasUseCase.execute.mockResolvedValue(mockResponse);

      const result = await controller.findAll();

      expect(result).toEqual(mockResponse);
      expect(mockGetAllProvinciasUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 7,
      });
    });
  });

  describe('findById', () => {
    it('should return a provincia when it exists', async () => {
      const mockProvincia = Provincia.create(1, 'San José');
      mockGetProvinciaByIdUseCase.execute.mockResolvedValue(mockProvincia);

      const result = await controller.findById('1');

      expect(result).toEqual(mockProvincia);
      expect(mockGetProvinciaByIdUseCase.execute).toHaveBeenCalledWith(1);
    });
  });
});
