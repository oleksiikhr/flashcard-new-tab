import TransactionEvent from '../../Shared/IndexedDB/Bus/TransactionEvent';
import Card from '../../../../Domain/Card/Card';
import TransactionAction from '../../Shared/IndexedDB/Bus/TransactionAction';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class CardDeleteTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard() {
    return this.card;
  }

  getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  getAction(): TransactionAction {
    return TransactionAction.DELETE;
  }
}
