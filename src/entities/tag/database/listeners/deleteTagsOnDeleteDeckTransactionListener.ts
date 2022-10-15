import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import Deck from '../../../deck/model/Deck';
import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';

export const deleteTagsOnDeleteDeckTransactionListener: TransactionListener<Deck> =
  {
    isNeedHandle(): boolean {
      return true;
    },

    getStoreName(): StoreName {
      return StoreName.TAGS;
    },

    invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
      const store = transaction.objectStore(StoreName.TAGS);
      const request = store.index('deck_id_idx').openKeyCursor(deck.getId());

      return requestKeyCursor(request, (primaryKey) => {
        store.delete(primaryKey);
      });
    },
  };
