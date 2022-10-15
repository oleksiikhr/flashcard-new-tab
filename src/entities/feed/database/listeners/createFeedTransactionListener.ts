import Card from '../../../card/model/Card';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';

export const createFeedTransactionListener: TransactionListener<Card> = {
  isNeedHandle(): boolean {
    return true;
  },

  getStoreName(): StoreName {
    return StoreName.FEED;
  },

  async invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.FEED);
    const request = store.add({
      card_id: card.getId(),
      deck_id: card.getDeckId(),
    });

    return requestPromise(request);
  },
};
