import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import Tag from '../../model/Tag';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { serializeTag } from '../../model/memento';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const updateTagTransactionListener: TransactionListener<Tag> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.TAGS;
  },

  invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
    const raw = serializeTag(tag);

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.put(raw);

    return requestPromise<number>(request);
  },
};
