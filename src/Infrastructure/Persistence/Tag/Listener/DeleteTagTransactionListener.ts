import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import { requestPromise } from '../../Shared/IndexedDB/Util/idb';
import StoreName from '../../Shared/IndexedDB/StoreName';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';

export default class DeleteTagTransactionListener
  implements TransactionListener<TagDeleteTransactionEvent>
{
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

    return requestPromise<number>(request);
  }
}
