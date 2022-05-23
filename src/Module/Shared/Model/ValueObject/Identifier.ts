import InvalidIdentifierError from '../Error/InvalidIdentifierError';

export default abstract class Identifier {
  private readonly id: number;

  constructor(id: number) {
    if (1 > id) {
      throw new InvalidIdentifierError();
    }

    this.id = id;
  }
}
