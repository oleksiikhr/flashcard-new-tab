import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';
import { Deck } from '../../../deck/model/deck';

export const deleteFeedOnDeleteDeckTransactionListener: TransactionListener<Deck> =
  {
    invokable(): boolean {
      return true;
    },

    storeName(): StoreName {
      return StoreName.FEED;
    },

    invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
      const store = transaction.objectStore(StoreName.FEED);
      const request = store.index('deck_id_idx').openKeyCursor(deck.id);

      return requestKeyCursor(request, (primaryKey) => {
        store.delete(primaryKey);
      });
    },
  };
