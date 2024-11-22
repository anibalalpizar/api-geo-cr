import { Canton } from '@/domain/entities';

describe('Canton Entity', () => {
  it('should create a canton instance', () => {
    const canton = Canton.create(101, 1, 'San José');

    expect(canton).toBeInstanceOf(Canton);
    expect(canton.idCanton).toBe(101);
    expect(canton.idProvincia).toBe(1);
    expect(canton.descripcion).toBe('San José');
  });
});
