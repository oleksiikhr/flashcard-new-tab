import { DeckRaw } from '../../model/memento';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import Tag from '../../../tag/model/Tag';

export const updateDeckOnDeleteTagTransactionListener: TransactionListener<Tag> =
  {
    isNeedHandle(): boolean {
      return true;
    },

    getStoreName(): StoreName {
      return StoreName.DECKS;
    },

    async invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
      const store = transaction.objectStore(StoreName.DECKS);
      const request = store.get(tag.getDeckId());
      const raw = await requestPromise<DeckRaw>(request);

      if (undefined === raw) {
        return Promise.resolve(undefined);
      }

      raw.tags_count -= 1;

      return requestPromise(store.put(raw));
    },
  };
