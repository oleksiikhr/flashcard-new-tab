import Deck from '../../../deck/model/Deck';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';

export const deleteFeedByDeckIdTransactionListener: TransactionListener<Deck> =
  {
    isNeedHandle(): boolean {
      return true;
    },

    getStoreName(): StoreName {
      return StoreName.FEED;
    },

    invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
      const store = transaction.objectStore(StoreName.FEED);
      const request = store.index('deck_id_idx').openKeyCursor(deck.getId());

      return requestKeyCursor(request, (primaryKey) => {
        store.delete(primaryKey);
      });
    },
  };
