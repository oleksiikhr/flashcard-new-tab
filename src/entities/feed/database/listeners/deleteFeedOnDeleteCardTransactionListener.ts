import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import Card from '../../../card/model/Card';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const deleteFeedOnDeleteCardTransactionListener: TransactionListener<Card> =
  {
    isNeedHandle(): boolean {
      return true;
    },

    getStoreName(): StoreName {
      return StoreName.FEED;
    },

    invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
      const store = transaction.objectStore(StoreName.FEED);
      const request = store.delete(card.getId());

      return requestPromise(request);
    },
  };
