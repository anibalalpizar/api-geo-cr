import { GetAllDistritosUseCase } from '@/application/get-all-distritos.usecase';
import { ResponseMessages, ResponseStatus } from '@/constants';
import { Distrito } from '@/domain/entities/distrito.entity';
import { DistritoRepository } from '@/domain/repositories';

describe('GetAllDistritosUseCase', () => {
  let useCase: GetAllDistritosUseCase;
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

    useCase = new GetAllDistritosUseCase(mockDistritoRepository);
  });

  it('should return paginated distritos', async () => {
    mockDistritoRepository.findAll.mockResolvedValue(mockDistritos);

    const result = await useCase.execute({ page: 1, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.message).toBe(
      ResponseMessages.DISTRITOS_FETCHED_SUCCESSFULLY,
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
  });

  it('should handle empty page', async () => {
    mockDistritoRepository.findAll.mockResolvedValue(mockDistritos);

    const result = await useCase.execute({ page: 3, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.data).toHaveLength(0);
    expect(result.meta.currentPage).toBe(3);
    expect(result.meta.totalPages).toBe(2);
  });
});
