import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';

export default class TagCreateTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag(): Tag {
    return this.tag;
  }
}
