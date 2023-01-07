import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import Tag from '../../model/Tag';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const deleteTagTransactionListener: TransactionListener<Tag> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.TAGS;
  },

  invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.delete(tag.getId());

    return requestPromise<number>(request);
  },
};
