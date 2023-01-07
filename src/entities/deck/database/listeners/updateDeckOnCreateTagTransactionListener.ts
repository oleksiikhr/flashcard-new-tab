import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { DeckSerialized } from '../../model/deck';
import { Tag } from '../../../tag/model/tag';

export const updateDeckOnCreateTagTransactionListener: TransactionListener<Tag> =
  {
    invokable(): boolean {
      return true;
    },

    storeName(): StoreName {
      return StoreName.DECKS;
    },

    async invoke(transaction: IDBTransaction, tag: Tag): Promise<unknown> {
      const store = transaction.objectStore(StoreName.DECKS);
      const request = store.get(tag.deckId);
      const raw = await requestPromise<DeckSerialized>(request);

      if (undefined === raw) {
        return Promise.resolve(undefined);
      }

      raw.metadata.tagsCount += 1;

      return requestPromise(store.put(raw));
    },
  };
