import Identifier from '../Shared/ValueObject/Identifier';

export default class DeckId extends Identifier {
  public static of(id: number): DeckId {
    return new DeckId(id);
  }
}