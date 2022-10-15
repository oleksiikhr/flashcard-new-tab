import { DeckRaw } from '../../model/memento';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import Card from '../../../card/model/Card';

export const updateDeckOnUpdateCardTransactionListener: TransactionListener<Card> =
  {
    isNeedHandle(card: Card): boolean {
      return card.isActiveChanged();
    },

    getStoreName(): StoreName {
      return StoreName.DECKS;
    },

    async invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
      const store = transaction.objectStore(StoreName.DECKS);
      const request = store.get(card.getDeckId());
      const raw = await requestPromise<DeckRaw>(request);

      if (undefined === raw) {
        return Promise.resolve(undefined);
      }

      if (card.isActiveChanged()) {
        raw.active_cards_count += card.getIsActive() ? 1 : -1;
      }

      return requestPromise(store.put(raw));
    },
  };
