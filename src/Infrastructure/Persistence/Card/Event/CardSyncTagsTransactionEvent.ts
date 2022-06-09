import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Card/Card';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Tag from '../../../../Domain/Tag/Tag';

export default class CardSyncTagsTransactionEvent implements TransactionEvent {
  constructor(private card: Card, private tags: Tag[]) {}

  public getCard() {
    return this.card;
  }

  public getTags() {
    return this.tags;
  }

  getStoreName(): StoreName {
    return StoreName.CARDS;
  }
}
