import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Card } from '../../model/card';

export const deleteCardTransactionListener: TransactionListener<Card> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.delete(card.id);

    return requestPromise(request);
  },
};
