import Card from '../../model/Card';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { serializeCard } from '../../model/memento';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const createCardTransactionListener: TransactionListener<Card> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.CARDS;
  },

  invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const raw = serializeCard(card);
    delete raw.id;

    const store = transaction.objectStore(StoreName.CARDS);
    const request = store.add(raw);

    return requestPromise<number>(request).then((id) => {
      card.setId(id as number);
    });
  },
};
