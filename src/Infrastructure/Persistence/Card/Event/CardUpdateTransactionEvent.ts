import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Card/Card';
import TransactionAction from '../../Shared/IndexedDB/Transaction/TransactionAction';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class CardUpdateTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard() {
    return this.card;
  }

  getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  getAction(): TransactionAction {
    return TransactionAction.UPDATE;
  }
}
