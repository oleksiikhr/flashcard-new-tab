import { DeckRaw } from '../../model/memento';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import Card from '../../../card/model/Card';

export const updateDeckOnDeleteCardTransactionListener: TransactionListener<Card> =
  {
    isNeedHandle(): boolean {
      return true;
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

      raw.cards_count -= 1;

      if (card.getIsActive()) {
        raw.active_cards_count -= 1;
      }

      return requestPromise(store.put(raw));
    },
  };
