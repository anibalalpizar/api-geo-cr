import { GetCantonByIdUseCase } from '@/application/get-canton-by-id.usecase';
import { Canton } from '@/domain/entities';
import { CantonRepository } from '@/domain/repositories';

describe('GetCantonByIdUseCase', () => {
  let useCase: GetCantonByIdUseCase;
  let mockCantonRepository: jest.Mocked<CantonRepository>;

  beforeEach(() => {
    mockCantonRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByProvinciaId: jest.fn(),
    };

    useCase = new GetCantonByIdUseCase(mockCantonRepository);
  });

  it('should return canton when it exists', async () => {
    const mockCanton = Canton.create(101, 1, 'San José');
    mockCantonRepository.findById.mockResolvedValue(mockCanton);

    const result = await useCase.execute(101);

    expect(result).toBeDefined();
    expect(result?.idCanton).toBe(101);
    expect(result?.idProvincia).toBe(1);
    expect(result?.descripcion).toBe('San José');
    expect(mockCantonRepository.findById).toHaveBeenCalledWith(101);
  });

  it('should return null when canton does not exist', async () => {
    mockCantonRepository.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(result).toBeNull();
    expect(mockCantonRepository.findById).toHaveBeenCalledWith(999);
  });
});
