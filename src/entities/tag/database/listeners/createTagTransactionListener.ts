import Tag from '../../model/Tag';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { serializeTag } from '../../model/memento';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const createTagTransactionListener: TransactionListener<Tag> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.TAGS;
  },

  invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
    const raw = serializeTag(tag);
    delete raw.id;

    const store = transaction.objectStore(StoreName.TAGS);
    const request = store.add(raw);

    return requestPromise<number>(request).then((id) => {
      tag.setId(id as number);
    });
  },
};
