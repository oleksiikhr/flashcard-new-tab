import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import Deck from '../../model/Deck';

export const deleteDeckTransactionListener: TransactionListener<Deck> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.DECKS;
  },

  invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
    const store = transaction.objectStore(StoreName.DECKS);
    const request = store.delete(deck.getId());

    return requestPromise(request);
  },
};
