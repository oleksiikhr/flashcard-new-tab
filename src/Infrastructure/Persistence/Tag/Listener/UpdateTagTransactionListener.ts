import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagMemento from '../../../../Domain/Tag/TagMemento';
import TagUpdateTransactionEvent from '../Event/TagUpdateTransactionEvent';

export default class UpdateTagTransactionListener
  implements TransactionListener<TagUpdateTransactionEvent>
{
  constructor(private memento: TagMemento) {}

  isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagUpdateTransactionEvent,
  ): Promise<unknown> {
    const tag = event.getTag();
    const raw = this.memento.serialize(tag);

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.put(raw);

    return requestPromise<number>(request);
  }
}
