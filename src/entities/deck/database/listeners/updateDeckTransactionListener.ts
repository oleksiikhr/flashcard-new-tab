import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { serializeDeck } from '../../model/memento';
import Deck from '../../model/Deck';

export const updateDeckTransactionListener: TransactionListener<Deck> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.DECKS;
  },

  invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
    const raw = serializeDeck(deck);

    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.put(raw);

    return requestPromise<number>(request);
  },
};
