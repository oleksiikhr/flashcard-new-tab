import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { DeckSerialized } from '../../model/deck';
import { Card } from '../../../card/model/card';

export const updateDeckOnUpdateCardTransactionListener: TransactionListener<Card> =
  {
    invokable(card: Card): boolean {
      return card.isActive !== card.originalIsActive;
    },

    storeName(): StoreName {
      return StoreName.DECKS;
    },

    async invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
      const store = transaction.objectStore(StoreName.DECKS);
      const request = store.get(card.deckId);
      const raw = await requestPromise<DeckSerialized>(request);

      if (undefined === raw) {
        return Promise.resolve(undefined);
      }

      if (card.isActive !== card.originalIsActive) {
        raw.metadata.activeCardsCount += card.isActive ? 1 : -1;
      }

      return requestPromise(store.put(raw));
    },
  };
