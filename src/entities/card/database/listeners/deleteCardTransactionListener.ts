import Card from '../../model/Card';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const deleteCardTransactionListener: TransactionListener<Card> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(card.getId());

    return requestPromise(request);
  },
};
