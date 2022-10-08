import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class DeleteFeedOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.FEED;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    const deck = event.getDeck();
    const store = transaction.objectStore(StoreName.FEED);
    const request = store
      .index('deck_id_idx')
      .openKeyCursor(deck.getId().getIdentifier());

    return this.idb.requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });
  }
}
