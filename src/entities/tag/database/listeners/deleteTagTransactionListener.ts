import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Tag } from '../../model/tag';

export const deleteTagTransactionListener: TransactionListener<Tag> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.TAGS;
  },

  invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.delete(tag.id);

    return requestPromise(request);
  },
};
