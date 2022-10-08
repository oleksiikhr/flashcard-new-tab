import TransactionListener from '../../../Persistence/IndexedDB/Transaction/TransactionListener';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckDeleteTransactionEvent from '../../Deck/Event/DeckDeleteTransactionEvent';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';

export default class DeleteTagsOnDeleteDeckTransactionListener
  implements TransactionListener<DeckDeleteTransactionEvent>
{
  constructor(private idb: IndexedDB) {}

  public isNeedHandle(): boolean {
    return true;
  }

  public getStoreName(): StoreName {
    return StoreName.TAGS;
  }

  public invoke(
    transaction: IDBTransaction,
    event: DeckDeleteTransactionEvent,
  ): Promise<unknown> {
    const store = transaction.objectStore(StoreName.TAGS);
    const request = store
      .index('deck_id_idx')
      .openKeyCursor(event.getDeck().getId().getIdentifier());

    return this.idb.requestKeyCursor(request, (primaryKey) => {
      store.delete(primaryKey);
    });
  }
}
