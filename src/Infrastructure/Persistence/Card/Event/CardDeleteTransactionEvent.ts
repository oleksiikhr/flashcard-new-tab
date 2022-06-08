import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Card/Card';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class CardDeleteTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard() {
    return this.card;
  }

  getStoreName(): StoreName {
    return StoreName.CARDS;
  }
}
