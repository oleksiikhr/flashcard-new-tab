import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Card } from '../../../card/model/card';

export const deleteFeedOnDeleteCardTransactionListener: TransactionListener<Card> =
  {
    invokable(): boolean {
      return true;
    },

    storeName(): StoreName {
      return StoreName.FEED;
    },

    invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
      const store = transaction.objectStore(StoreName.FEED);
      const request = store.delete(card.id);

      return requestPromise(request);
    },
  };
