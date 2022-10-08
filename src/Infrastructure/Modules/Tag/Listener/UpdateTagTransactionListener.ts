import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import TagMemento from '../../../../Domain/Modules/Tag/Service/TagMemento';
import TagUpdateTransactionEvent from '../Event/TagUpdateTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class UpdateTagTransactionListener
  implements TransactionListener<TagUpdateTransactionEvent>
{
  constructor(private idb: IndexedDB, private memento: TagMemento) {}

  public isNeedHandle(): boolean {
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

    return this.idb.requestPromise<number>(request);
  }
}
