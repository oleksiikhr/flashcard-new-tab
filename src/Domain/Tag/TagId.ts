import Identifier from '../Shared/ValueObject/Identifier';

export default class TagId extends Identifier {
  public static of(id: number): TagId {
    return new TagId(id);
  }
}