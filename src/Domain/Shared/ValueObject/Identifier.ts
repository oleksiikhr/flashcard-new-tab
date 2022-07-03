import InvalidIdentifierError from '../Error/InvalidIdentifierError';

export default abstract class Identifier {
  private readonly identifier: number;

  constructor(id: number) {
    if (1 > id) {
      throw new InvalidIdentifierError();
    }

    this.identifier = id;
  }

  public getIdentifier(): number {
    return this.identifier;
  }
}
