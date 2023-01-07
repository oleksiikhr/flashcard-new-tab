import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import Card from '../../model/Card';
import { serializeCard } from '../../model/memento';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const updateCardTransactionListener: TransactionListener<Card> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.put(serializeCard(card));

    return requestPromise(request);
  },
};
