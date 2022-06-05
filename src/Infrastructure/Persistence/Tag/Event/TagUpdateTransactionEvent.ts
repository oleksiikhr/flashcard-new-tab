import TransactionEvent from '../../Shared/IndexedDB/Bus/TransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TransactionAction from '../../Shared/IndexedDB/Bus/TransactionAction';

export default class TagUpdateTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag() {
    return this.tag;
  }

  getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  getAction(): TransactionAction {
    return TransactionAction.UPDATE;
  }
}
