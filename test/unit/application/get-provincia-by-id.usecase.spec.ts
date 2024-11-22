import { GetProvinciaByIdUseCase } from '@/application/get-provincia-by-id.usecase';
import { Provincia } from '@/domain/entities';
import { ProvinciaRepository } from '@/domain/repositories';

describe('GetProvinciaByIdUseCase', () => {
  let useCase: GetProvinciaByIdUseCase;
  let mockProvinciaRepository: jest.Mocked<ProvinciaRepository>;

  beforeEach(() => {
    mockProvinciaRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new GetProvinciaByIdUseCase(mockProvinciaRepository);
  });

  it('should return provincia when it exists', async () => {
    const mockProvincia = Provincia.create(1, 'San José');
    mockProvinciaRepository.findById.mockResolvedValue(mockProvincia);

    const result = await useCase.execute(1);

    expect(result).toBeDefined();
    expect(result?.idProvincia).toBe(1);
    expect(result?.descripcion).toBe('San José');
    expect(mockProvinciaRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should return null when provincia does not exist', async () => {
    mockProvinciaRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(result).toBeNull();
    expect(mockProvinciaRepository.findById).toHaveBeenCalledWith(999);
  });
});
