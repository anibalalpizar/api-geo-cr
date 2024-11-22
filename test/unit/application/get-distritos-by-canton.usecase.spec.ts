import { GetDistritosByCantonUseCase } from '@/application/get-distritos-by-canton.usecase';
import { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoRepository } from '@/domain/repositories';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';

describe('GetDistritosByCantonUseCase', () => {
  let useCase: GetDistritosByCantonUseCase;
  let mockDistritoRepository: jest.Mocked<DistritoRepository>;

  const mockDistritos = [
    Distrito.create(10101, 101, 'Carmen'),
    Distrito.create(10102, 101, 'Merced'),
    Distrito.create(10103, 101, 'Hospital'),
  ];

  beforeEach(() => {
    mockDistritoRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCantonId: jest.fn(),
    };

    useCase = new GetDistritosByCantonUseCase(mockDistritoRepository);
  });

  it('should return paginated distritos for a canton', async () => {
    mockDistritoRepository.findByCantonId.mockResolvedValue(mockDistritos);

    const result = await useCase.execute({ page: 1, limit: 2 }, 101);

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.message).toBe(
      ResponseMessages.DISTRITOS_BY_CANTON_FETCHED_SUCCESSFULLY,
    );
    expect(result.data).toHaveLength(2);
    expect(result.meta).toEqual({
      totalItems: 3,
      itemCount: 2,
      itemsPerPage: 2,
      totalPages: 2,
      currentPage: 1,
      timestamp: expect.any(String),
    });
    expect(mockDistritoRepository.findByCantonId).toHaveBeenCalledWith(101);
  });

  it('should handle empty result for non-existent canton', async () => {
    mockDistritoRepository.findByCantonId.mockResolvedValue([]);

    const result = await useCase.execute({ page: 1, limit: 10 }, 999);

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.data).toHaveLength(0);
    expect(result.meta.totalItems).toBe(0);
    expect(mockDistritoRepository.findByCantonId).toHaveBeenCalledWith(999);
  });
});
