import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';
import TransactionAction from '../../Shared/IndexedDB/Transaction/TransactionAction';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class TagDeleteTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag() {
    return this.tag;
  }

  getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  getAction(): TransactionAction {
    return TransactionAction.DELETE;
  }
}
