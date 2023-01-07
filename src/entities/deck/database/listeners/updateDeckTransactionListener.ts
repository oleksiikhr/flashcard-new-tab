import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { Deck, serializeDeck } from '../../model/deck';

export const updateDeckTransactionListener: TransactionListener<Deck> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.DECKS;
  },

  invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
    const raw = serializeDeck(deck);
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.put(raw);

    return requestPromise(request);
  },
};
