import Identifier from '../Shared/ValueObject/Identifier';

export default class CardId extends Identifier {
  public static of(id: number): CardId {
    return new CardId(id);
  }
}
