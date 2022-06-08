import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Card from '../../../../Domain/Card/Card';

export default class FeedCreateTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard() {
    return this.card;
  }

  getStoreName(): StoreName {
    return StoreName.FEED;
  }
}
