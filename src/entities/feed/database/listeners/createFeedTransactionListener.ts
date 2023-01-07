import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { Card } from '../../../card/model/card';

export const createFeedTransactionListener: TransactionListener<Card> = {
  invokable(): boolean {
    return true;
  },

  storeName(): StoreName {
    return StoreName.FEED;
  },

  async invoke(transaction: IDBTransaction, card: Card): Promise<unknown> {
    const store = transaction.objectStore(StoreName.FEED);
    const request = store.add({
      card_id: card.id,
      deck_id: card.deckId,
    });

    return requestPromise(request);
  },
};
