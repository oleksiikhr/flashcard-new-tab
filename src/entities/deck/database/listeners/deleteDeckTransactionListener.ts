import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { Deck } from '../../model/deck';

export const deleteDeckTransactionListener: TransactionListener<Deck> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.DECKS;
  },

  invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.delete(deck.id);

    return requestPromise(request);
  },
};
