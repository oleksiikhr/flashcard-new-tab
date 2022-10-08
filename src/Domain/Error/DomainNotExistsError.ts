import Identifier from '../ValueObject/Identifier';

export default class DomainNotExistsError extends Error {
  constructor(private identifier: Identifier) {
    super();
  }

  public getIdentifier(): Identifier {
    return this.identifier;
  }
}