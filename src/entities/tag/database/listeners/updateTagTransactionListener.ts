import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { serializeTag, Tag } from '../../model/tag';

export const updateTagTransactionListener: TransactionListener<Tag> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.TAGS;
  },

  invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
    const raw = serializeTag(tag);
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.put(raw);

    return requestPromise(request);
  },
};
