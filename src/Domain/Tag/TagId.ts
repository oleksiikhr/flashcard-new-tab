import Identifier from '../Shared/ValueObject/Identifier';

export default class TagId extends Identifier {
  /**
   * @throws {InvalidIdentifierError}
   */
  public static of(id: number): TagId {
    return new TagId(id);
  }
}
