import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Card, serializeCard } from '../../model/card';

export const createCardTransactionListener: TransactionListener<Card> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const raw = serializeCard(card);
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(raw);

    return requestPromise(request);
  },
};
