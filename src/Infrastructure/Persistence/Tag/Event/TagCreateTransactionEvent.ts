import TransactionEvent from '../../Shared/IndexedDB/Bus/TransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';
import TransactionAction from '../../Shared/IndexedDB/Bus/TransactionAction';
import StoreName from '../../Shared/IndexedDB/StoreName';

export default class TagCreateTransactionEvent implements TransactionEvent {
  constructor(private tag: Tag) {}

  public getTag() {
    return this.tag;
  }

  getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  getAction(): TransactionAction {
    return TransactionAction.CREATE;
  }
}
