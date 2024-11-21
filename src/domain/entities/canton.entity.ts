export class Canton {
  constructor(
    public readonly idCanton: number,
    public readonly idProvincia: number,
    public readonly descripcion: string,
  ) {}

  static create(
    idCanton: number,
    idProvincia: number,
    descripcion: string,
  ): Canton {
    return new Canton(idCanton, idProvincia, descripcion);
  }
}
