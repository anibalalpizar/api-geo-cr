import { GetAllProvinciasUseCase } from '@/application/get-all-provincias.usecase';
import { Provincia } from '@/domain/entities';
import { ProvinciaRepository } from '@/domain/repositories';
import { ResponseMessages, ResponseStatus } from '@/utils/response-status.enum';

describe('GetAllProvinciasUseCase', () => {
  let useCase: GetAllProvinciasUseCase;
  let mockProvinciaRepository: jest.Mocked<ProvinciaRepository>;

  const mockProvincias = [
    Provincia.create(1, 'San José'),
    Provincia.create(2, 'Alajuela'),
    Provincia.create(3, 'Cartago'),
  ];

  beforeEach(() => {
    mockProvinciaRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new GetAllProvinciasUseCase(mockProvinciaRepository);
  });

  it('should return paginated provincias', async () => {
    mockProvinciaRepository.findAll.mockResolvedValue(mockProvincias);

    const result = await useCase.execute({ page: 1, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.message).toBe(
      ResponseMessages.PROVINCIAS_FETCHED_SUCCESSFULLY,
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
    mockProvinciaRepository.findAll.mockResolvedValue(mockProvincias);

    const result = await useCase.execute({ page: 3, limit: 2 });

    expect(result.status).toBe(ResponseStatus.SUCCESS);
    expect(result.statusCode).toBe(200);
    expect(result.data).toHaveLength(0);
    expect(result.meta.currentPage).toBe(3);
    expect(result.meta.totalPages).toBe(2);
  });
});
