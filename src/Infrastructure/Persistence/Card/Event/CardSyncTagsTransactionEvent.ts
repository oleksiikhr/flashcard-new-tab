import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Card/Card';
import Tag from '../../../../Domain/Tag/Tag';

export default class CardSyncTagsTransactionEvent implements TransactionEvent {
  constructor(private card: Card, private tags: Tag[]) {}

  public getCard(): Card {
    return this.card;
  }

  public getTags(): Tag[] {
    return this.tags;
  }
}
