import { requestKeyCursor } from '../../../../shared/database/indexedDB/idb';
import Deck from '../../../deck/model/Deck';
import { TransactionListener } from '../../../../shared/database/indexedDB/transaction';
import { StoreName } from '../../../../shared/database/indexedDB/constants';

export const deleteCardsOnDeleteDeckTransactionListener: TransactionListener<Deck> =
  {
    isNeedHandle(): boolean {
      return true;
    },

    getStoreName(): StoreName {
      return StoreName.CARDS;
    },

    invoke(transaction: IDBTransaction, deck: Deck): Promise<unknown> {
      const store = transaction.objectStore(StoreName.CARDS);
      const index = store.index('deck_id_and_is_active_idx');

      return Promise.all([
        requestKeyCursor(
          index.openKeyCursor(IDBKeyRange.only([deck.getId(), 0])),
          (primaryKey) => {
            store.delete(primaryKey);
          },
        ),
        requestKeyCursor(
          index.openKeyCursor(IDBKeyRange.only([deck.getId(), 1])),
          (primaryKey) => {
            store.delete(primaryKey);
          },
        ),
      ]);
    },
  };
