import TransactionListener from '../../Shared/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import { requestKeyCursor } from '../../Shared/IndexedDB/Util/idb';

export default class DeleteCardsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown>[] {
    const store = transaction.objectStore(StoreName.CARDS);
    const id = event.getDeck().getId().getIdentifier();
    const index = store.index('deck_id_and_is_active_idx');

    return [
      requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([id, 0])),
        (primaryKey) => {
          store.delete(primaryKey);
        },
      ),
      requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([id, 1])),
        (primaryKey) => {
          store.delete(primaryKey);
        },
      ),
    ];
  }
}