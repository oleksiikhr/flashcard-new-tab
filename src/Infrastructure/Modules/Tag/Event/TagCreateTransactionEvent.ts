import TransactionEvent from '../../../Persistence/IndexedDB/Transaction/TransactionEvent';
import Tag from '../../../../Domain/Modules/Tag/Tag';

export default class TagCreateTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag(): Tag {
    return this.tag;
  }
}
