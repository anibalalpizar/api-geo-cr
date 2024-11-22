import { distritosData } from '@/infrastructure/persistence/data/distrito.data';
import { InMemoryDistritoRepository } from '@/infrastructure/persistence/distrito.in-memory.repository';

describe('InMemoryDistritoRepository', () => {
  let repository: InMemoryDistritoRepository;

  beforeEach(() => {
    repository = new InMemoryDistritoRepository();
  });

  describe('findAll', () => {
    it('should return all distritos', async () => {
      const distritos = await repository.findAll();

      expect(distritos).toHaveLength(distritosData.length);
      expect(distritos).toEqual(distritosData);
    });
  });

  describe('findById', () => {
    it('should return a distrito when it exists', async () => {
      const distrito = await repository.findById(10101);

      expect(distrito).toBeDefined();
      expect(distrito?.idDistrito).toBe(10101);
      expect(distrito?.idCanton).toBe(101);
      expect(distrito?.descripcion).toBe('Carmen');
    });

    it('should return null when distrito does not exist', async () => {
      const distrito = await repository.findById(99999);

      expect(distrito).toBeNull();
    });
  });

  describe('findByCantonId', () => {
    it('should return distritos for a specific canton', async () => {
      const distritos = await repository.findByCantonId(101);

      expect(distritos.length).toBeGreaterThan(0);
      expect(distritos.every((distrito) => distrito.idCanton === 101)).toBe(
        true,
      );
    });

    it('should return empty array when canton has no distritos', async () => {
      const distritos = await repository.findByCantonId(999);

      expect(distritos).toHaveLength(0);
    });
  });
});
