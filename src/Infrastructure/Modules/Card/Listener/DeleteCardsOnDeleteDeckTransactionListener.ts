import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class DeleteCardsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.CARDS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    const store = transaction.objectStore(StoreName.CARDS);
    const index = store.index('deck_id_and_is_active_idx');
    const deckId = event.getDeck().getId().getIdentifier();

    return Promise.all([
      this.idb.requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([deckId, 0])),
        (primaryKey) => {
          store.delete(primaryKey);
        },
      ),
      this.idb.requestKeyCursor(
        index.openKeyCursor(IDBKeyRange.only([deckId, 1])),
        (primaryKey) => {
          store.delete(primaryKey);
        },
      ),
    ]);
  }
}
