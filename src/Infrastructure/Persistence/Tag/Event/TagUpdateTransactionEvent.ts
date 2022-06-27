import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';

export default class TagUpdateTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag(): Tag {
    return this.tag;
  }
}
