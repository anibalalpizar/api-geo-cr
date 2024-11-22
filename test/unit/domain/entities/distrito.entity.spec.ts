import { Distrito } from '@/domain/entities/distrito.entity';

describe('Distrito Entity', () => {
  it('should create a distrito instance', () => {
    const distrito = Distrito.create(10101, 101, 'Carmen');

    expect(distrito).toBeInstanceOf(Distrito);
    expect(distrito.idDistrito).toBe(10101);
    expect(distrito.idCanton).toBe(101);
    expect(distrito.descripcion).toBe('Carmen');
  });
});
