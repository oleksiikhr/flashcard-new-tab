import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Card/Card';

export default class CardCreateTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard(): Card {
    return this.card;
  }
}
