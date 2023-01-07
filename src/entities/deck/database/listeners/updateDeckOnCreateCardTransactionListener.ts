import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { DeckSerialized } from '../../model/deck';
import { Card } from '../../../card/model/card';

export const updateDeckOnCreateCardTransactionListener: TransactionListener<Card> =
  {
    invokable(): boolean {
      return true;
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

      raw.metadata.cardsCount += 1;

      if (card.isActive) {
        raw.metadata.activeCardsCount += 1;
      }

      return requestPromise(store.put(raw));
    },
  };
