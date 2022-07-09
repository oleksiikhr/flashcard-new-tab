import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';

export default class DeleteTagTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: TagDeleteTransactionEvent,
  ): Promise<unknown> {
    const tag = event.getTag();
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.delete(tag.getId().getIdentifier());

    return this.idb.requestPromise<number>(request);
  }
}
